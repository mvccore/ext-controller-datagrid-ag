<?php

/**
 * MvcCore
 *
 * This source file is subject to the BSD 3 License
 * For the full copyright and license information, please view
 * the LICENSE.md file that are distributed with this source code.
 *
 * @copyright	Copyright (c) 2016 Tom Flidr (https://github.com/mvccore)
 * @license		https://mvccore.github.io/docs/mvccore/5.0.0/LICENSE.md
 */

namespace MvcCore\Ext\Controllers\DataGrids\AgGrid;

/**
 * @mixin \MvcCore\Ext\Controllers\DataGrids\AgGrid
 */
trait ActionMethods {
	
	/**
	 * @return void
	 */
	public function ActionData () {
		if (!$this->ajaxDataRequest) return;
		if ($this->dispatchState < \MvcCore\IController::DISPATCH_STATE_INITIALIZED) 
			$this->Init();
		if ($this->dispatchState < \MvcCore\IController::DISPATCH_STATE_PRE_DISPATCHED) 
			$this->PreDispatch();
		if ($this->dispatchState > \MvcCore\IController::DISPATCH_STATE_PRE_DISPATCHED) return;
		list($gridPath, $gridUrl) = $this->GetAjaxGridPathAndUrl();
		$response = (object) [
			'totalCount'	=> $this->totalCount,
			'offset'		=> $this->offset,
			'limit'			=> $this->limit,
			'sorting'		=> $this->GetAjaxSorting(),
			'filtering'		=> $this->GetAjaxFiltering(),
			'url'			=> $gridUrl,
			'path'			=> $gridPath,
			'dataCount'		=> count($this->pageData),
			'controls'		=> NULL,
			'data'			=> $this->pageData,
		];
		$renderConf = $this->GetConfigRendering();
		$renderBottomControls = (
			$renderConf->GetRenderControlCountScales() ||
			$renderConf->GetRenderControlStatus() ||
			$renderConf->GetRenderControlPaging()
		);
		if ($renderBottomControls) {
			$response->controls = (object) [
				'countScales'	=> NULL,
				'status'		=> NULL,
				'paging'		=> NULL,
			];
			if ($renderConf->GetRenderControlCountScales())
				$response->controls->countScales	= $this->view->RenderGridControlCountScales();
			if ($renderConf->GetRenderControlStatus())
				$response->controls->status			= $this->view->RenderGridControlStatus();
			if ($renderConf->GetRenderControlPaging())
				$response->controls->paging			= $this->view->RenderGridControlPaging();
		}
		$callbackParamName = $this->ajaxParamsNames[self::AJAX_PARAM_CALLBACK];
		if ($this->request->HasParam($callbackParamName)) {
			$this->JsonpResponse($response);
		} else {
			$this->JsonResponse($response);
		}
	}

	public function ActionColumnsStates () {
		$columnsUrlNamesRaw = $this->request->GetParams(FALSE, [], \MvcCore\IRequest::PARAM_TYPE_INPUT);

		$persistentColumns = [];
		foreach ($this->GetConfigColumns(FALSE) as $urlName => $configColumn) {
			$disabled = !isset($columnsUrlNamesRaw[$urlName]);
			if ($this->ignoreDisabledColumns) {
				$dbColumnName = $configColumn->GetDbColumnName();
				if (isset($this->filtering[$dbColumnName]) || isset($this->sorting[$dbColumnName]))
					$disabled = FALSE;
			}
			$propName = $configColumn->GetPropName();
			$persistentColumns[$propName] = new \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\PersistentColumn(
				$propName,
				$configColumn->GetColumnIndex(),
				$configColumn->GetWidth(),
				$disabled
			);
		}

		$this->gridPersistentColumnsWrite($persistentColumns);

		$gridParam = rtrim(rawurldecode($this->gridRequest->GetPath()), '/');
		$controllerClass = get_parent_class(get_parent_class(__CLASS__));
		$redirectUrl = $controllerClass::Url($this->appRouteName, [
			static::URL_PARAM_GRID		=> $gridParam,
			static::URL_PARAM_ACTION	=> NULL,
		]);
		self::Redirect($redirectUrl, \MvcCore\IResponse::SEE_OTHER);
	}

	public function ActionColumnsChanges () {
		$changesJson = $this->request->GetParam(self::AJAX_PARAM_COLUMNS_CHANGES, FALSE);
		$toolClass = $this->application->GetToolClass();
		try {
			$changesRaw = (array) $toolClass::JsonDecode($changesJson);
		} catch (\Throwable $e) {
			$changesRaw = [];
		}
		
		$parseSuccess = count($changesRaw) > 0;
		if ($parseSuccess) {
			$persistentColumns = [];
			foreach ($this->GetConfigColumns(FALSE) as $urlName => $configColumn) {
				if (isset($changesRaw[$urlName])) {
					/** @var \stdClass $columnChange */
					$columnChange = $changesRaw[$urlName];
					if (isset($columnChange->index))
						$configColumn->SetColumnIndex($columnChange->index);
					if (isset($columnChange->width))
						$configColumn->SetWidth($columnChange->width);
				}
				$propName = $configColumn->GetPropName();
				$persistentColumns[$propName] = new \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\PersistentColumn(
					$propName,
					$configColumn->GetColumnIndex(),
					$configColumn->GetWidth(),
					$configColumn->GetDisabled()
				);
			}
			$this->gridPersistentColumnsWrite($persistentColumns);
		}
		
		$this->JsonResponse([
			'success'	=> $parseSuccess
		]);
	}

	/**
	 * Write persistent columns info into db or into session.
	 * @param  array $persistentColumns 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	protected function gridPersistentColumnsWrite (array $persistentColumns) {
		if ($this->handlerColumnsWrite != NULL) {
			// db
			try {
				$user = $this->GetUser();
				$idUser = $user !== NULL ? $user->GetId() : NULL;
				call_user_func(
					$this->handlerColumnsWrite, 
					$this->id,
					$idUser,
					new \MvcCore\Ext\Controllers\DataGrids\AgGrids\Iterators\PersistentColumns($persistentColumns)
				);
			} catch (\Throwable $e) {}
		} else {
			// session
			$sessionNamespace = $this->getGridSessionNamespace();
			$sessionNamespace->columns = $persistentColumns;
		}
		return $this;
	}
	
	/**
	 * Write persistent columns info into db or into session.
	 * @return array<string, \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\PersistentColumn>
	 */
	protected function gridPersistentColumnsRead () {
		$persistentColumns = NULL;
		if ($this->handlerColumnsRead != NULL) {
			// db
			try {
				$user = $this->GetUser();
				$idUser = $user !== NULL ? $user->GetId() : NULL;
				$persistentColumns = call_user_func(
					$this->handlerColumnsRead, 
					$this->id,
					$idUser
				);
			} catch (\Throwable $e) {
			}
		} else {
			// session
			$sessionNamespace = $this->getGridSessionNamespace();
			$persistentColumns = $sessionNamespace->columns;
		}
		if ($persistentColumns === NULL) {
			$persistentColumns = [];
		} else if ($persistentColumns instanceof \MvcCore\Ext\Controllers\DataGrids\AgGrids\Iterators\PersistentColumns) {
			$persistentColumns = $persistentColumns->getArray();
		}
		return $persistentColumns;
	}

	/**
	 * @return \MvcCore\Session
	 */
	protected function getGridSessionNamespace () {
		$toolClass = $this->application->GetToolClass();
		$sessionNamespaceName = implode('\\', ['', __CLASS__, $toolClass::GetPascalCaseFromDashed($this->id)]);
		$sessionNamespace = $this->GetSessionNamespace($sessionNamespaceName);
		$sessionNamespace->SetExpirationSeconds(0);
		return $sessionNamespace;
	}
}