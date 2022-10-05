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

use \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\PersistentColumn;
use \MvcCore\Ext\Controllers\DataGrids\AgGrids\Iterators\PersistentColumns;
use \MvcCore\Ext\Controllers\DataGrids\Configs\JsonSerialize;

/**
 * @mixin \MvcCore\Ext\Controllers\DataGrids\AgGrid
 */
trait ActionMethods {
	
	/**
	 * Internal default action for datagrid content rendering.
	 * @template
	 * @return void
	 */
	public function ActionDefault () {
		if (!$this->writeChangedColumnsConfigs) return;
		$persistentColumns = [];
		foreach ($this->GetConfigColumns(FALSE) as $configColumn) {
			$propName = $configColumn->GetPropName();
			$persistentColumns[$propName] = new PersistentColumn(
				$propName,
				$configColumn->GetColumnIndexUser() ?: $configColumn->GetColumnIndex(),
				$configColumn->GetWidth(),
				$configColumn->GetDisabled()
			);
		}
		$this->gridPersistentColumnsWrite($persistentColumns);
	}

	/**
	 * 
	 * @return array
	 */
	public function GetClientServerConfig () {
		$gridId = $this->GetId();
		return [
			'version'				=> static::VERSION,
			'contElementSelector'	=> '#' . $gridId,
			'renderConfig'			=> JsonSerialize::Serialize($this->GetConfigRendering()),
			'columns'				=> $this->GetConfigColumns(FALSE),
			'locales'				=> JsonSerialize::Serialize($this->GetConfigLocales()),
			'urlSegments'			=> JsonSerialize::Serialize($this->GetConfigUrlSegments()),
			'filterOperatorPrefixes'=> $this->GetFilterOperatorPrefixes(),
			'ajaxParamsNames'		=> $this->GetAjaxParamsNames(),
			'id'					=> $gridId,
			'clientPageMode'		=> $this->GetClientPageMode(),
			'urlData'				=> $this->GetUrlData(),
			'urlColumnsChanges'		=> $this->GetUrlColumnsChanges(),
			'gridUrlParamName'		=> static::URL_PARAM_GRID,
			'gridActionParamName'	=> static::URL_PARAM_ACTION,
			'gridActionColumnStates'=> static::GRID_ACTION_COLUMNS_STATES,
			'ignoreDisabledColumns'	=> $this->GetIgnoreDisabledColumns(),
			'dataRequestMethod'		=> $this->GetDataRequestMethod(),
			'rowSelection'			=> $this->GetRowSelection(),
			'itemsPerPage'			=> $this->GetItemsPerPage(),
			'page'					=> $this->GetPage(),
			'count'					=> $this->GetCount(),
			'sortingMode'			=> $this->GetSortingMode(),
			'filteringMode'			=> $this->GetFilteringMode(),
			'controlsTexts'			=> $this->GetControlsTexts(),
			'timeZoneOffset'		=> $this->GetTimeZoneOffsetSeconds(),
			'clientChangeHistory'	=> $this->GetClientChangeHistory(),
			'clientTitleTemplate'	=> $this->GetClientTitleTemplate(),
			'clientRequestBlockSize'=> $this->GetClientRequestBlockSize(),
			'clientRowBuffer'		=> $this->GetClientRowBuffer(),
			'clientMaxRowsInCache'	=> $this->GetClientMaxRowsInCache(),
			'clientRowBufferMax'	=> static::CLIENT_JS_BUFFER_MAX_SIZE,
		];
	}

	/**
	 * 
	 * @return array
	 */
	public function GetClientInitData () {
		return [
			'totalCount'		=> $this->GetTotalCount(),
			'offset'			=> $this->GetOffset(),
			'limit'				=> $this->GetLimit(),
			'sorting'			=> $this->GetAjaxSorting(),
			'filtering'			=> $this->GetAjaxFiltering(),
			'url'				=> $this->GetRequest()->GetFullUrl(),
			'path'				=> $this->GetGridRequest()->GetPath(),
			'page'				=> $this->GetPage(),
			'count'				=> $this->GetCount(),
			'dataCount'			=> count($this->GetPageData()),
			'data'				=> $this->GetPageData()
		];
	}

	/**
	 * 
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
			'page'			=> $this->page,
			'count'			=> $this->count,
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
			$this->reinitGridRequestAndUrlParams($gridPath);
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

	/**
	 * Write current user columns configurations.
	 * @return void
	 */
	public function WriteColumnsConfigs () {
		$persistentColumns = [];
		foreach ($this->GetConfigColumns(FALSE) as $configColumn) {
			$disabled = $configColumn->GetDisabled();
			if ($this->ignoreDisabledColumns) {
				$dbColumnName = $configColumn->GetDbColumnName();
				if (isset($this->filtering[$dbColumnName]) || isset($this->sorting[$dbColumnName]))
					$disabled = FALSE;
			}
			$propName = $configColumn->GetPropName();
			$persistentColumns[$propName] = new PersistentColumn(
				$propName,
				$configColumn->GetColumnIndex(),
				$configColumn->GetWidth(),
				$disabled
			);
		}
		$this->gridPersistentColumnsWrite($persistentColumns);
	}

	/**
	 * 
	 * @return void
	 */
	public function ActionColumnsStates () {
		$columnsUrlNamesRaw = $this->request->GetParams(FALSE, [], \MvcCore\IRequest::PARAM_TYPE_INPUT);
		
		$persistentColumns = $this->actionColumnsStatesAssemble($columnsUrlNamesRaw);
		$this->gridPersistentColumnsWrite($persistentColumns);

		$gridParam = rtrim($this->gridRequest->GetPath(), '/');
		$controllerClass = get_parent_class(get_parent_class(__CLASS__));
		$redirectUrl = $controllerClass::Url($this->appRouteName, [
			static::URL_PARAM_GRID		=> $gridParam,
			static::URL_PARAM_ACTION	=> NULL,
		]);
		self::Redirect($redirectUrl, \MvcCore\IResponse::SEE_OTHER);
	}

	/**
	 * Complete persisten columns collection from raw post params.
	 * @param  array $postParams 
	 * @return array<string, PersistentColumn>
	 */
	protected function actionColumnsStatesAssemble (array $postParams) {
		$persistentColumns = [];
		foreach ($this->GetConfigColumns(FALSE) as $urlName => $configColumn) {
			$disabled = !isset($postParams[$urlName]);
			if ($this->ignoreDisabledColumns) {
				$dbColumnName = $configColumn->GetDbColumnName();
				if (isset($this->filtering[$dbColumnName]) || isset($this->sorting[$dbColumnName]))
					$disabled = FALSE;
			}
			$propName = $configColumn->GetPropName();
			$persistentColumns[$propName] = new PersistentColumn(
				$propName,
				$configColumn->GetColumnIndex(),
				$configColumn->GetWidth(),
				$disabled
			);
		}
		return $persistentColumns;
	}

	/**
	 * 
	 * @return void
	 */
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
						$configColumn->SetColumnIndexUser($columnChange->index);
					if (isset($columnChange->width))
						$configColumn->SetWidth($columnChange->width);
				}
				$propName = $configColumn->GetPropName();
				$persistentColumns[$propName] = new PersistentColumn(
					$propName,
					$configColumn->GetColumnIndexUser() ?: $configColumn->GetColumnIndex(),
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
	 * Reinitialize grid request object by grid path completed from ajax params
	 * to properly render count scales template and paging template.
	 * @param  string $gridPath 
	 * @return void
	 */
	protected function reinitGridRequestAndUrlParams ($gridPath) {
		$this->gridRequest = \MvcCore\Request::CreateInstance()
			->SetBasePath('')
			->SetPath($gridPath);
		$matches = $this->route->Matches($this->gridRequest);
		if ($matches === NULL) {
			$this->urlParams = [];
		} else {
			if (isset($matches[static::URL_PARAM_PAGE])) 
				$matches[static::URL_PARAM_PAGE] = intval($matches[static::URL_PARAM_PAGE]);
			if (isset($matches[static::URL_PARAM_COUNT])) 
				$matches[static::URL_PARAM_COUNT] = intval($matches[static::URL_PARAM_COUNT]);
			$this->urlParams = $matches;
		}
	}

	/**
	 * Write persistent columns info into db or into session.
	 * @param  array $persistentColumns 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	protected function gridPersistentColumnsWrite (array $persistentColumns) {
		if ($this->handlerColumnsWrite !== NULL) {
			// db
			try {
				$user = $this->GetUser();
				$idUser = $user !== NULL ? $user->GetId() : NULL;
				call_user_func(
					$this->handlerColumnsWrite, 
					$this->id,
					$idUser,
					new PersistentColumns($persistentColumns)
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
	 * @return array<string, PersistentColumn>
	 */
	protected function gridPersistentColumnsRead () {
		$persistentColumns = NULL;
		if ($this->handlerColumnsRead !== NULL) {
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
		} else if ($persistentColumns instanceof PersistentColumns) {
			$persistentColumns = $persistentColumns->getArray();
		}
		return $persistentColumns;
	}

	/**
	 * 
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