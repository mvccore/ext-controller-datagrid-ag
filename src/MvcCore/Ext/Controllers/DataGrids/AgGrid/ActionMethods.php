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

use \MvcCore\Ext\Controllers\DataGrids\AgGrids;
use \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\PersistentColumn;
use \MvcCore\Ext\Controllers\DataGrids\AgGrids\Iterators\PersistentColumns;
use \MvcCore\Ext\Controllers\DataGrids\Configs\JsonSerialize;

/**
 * @mixin \MvcCore\Ext\Controllers\DataGrids\AgGrid
 */
trait ActionMethods {
	
	/**
	 * @inheritDoc
	 * @template
	 * @return void
	 */
	public function DefaultInit () {
		$this->writeChangedColumnsConfigsExecute();
	}

	/**
	 * Write changed columns configs if necessary.
	 * @return void
	 */
	protected function writeChangedColumnsConfigsExecute () {
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
	 * @inheritDoc
	 * @return array
	 */
	public function GetClientServerConfig () {
		if ($this->clientServerConfig === NULL) {
			$gridId = $this->GetId();
			$this->clientServerConfig = [
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
				'urlColumnsStates'		=> $this->GetUrlColumnsStates(),
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
		return $this->clientServerConfig;
	}

	/**
	 * @inheritDoc
	 * @return string
	 */
	public function GetClientHelpersJson () {
		$viewHelpers = [];
		$configColumns = $this->GetConfigColumns(FALSE);
		$toolClass = $this->application->GetToolClass();
		$phpClassNameRegExp = "#^[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*$#";
		foreach ($configColumns as $configColumn) {
			$viewHelperName = $configColumn->GetViewHelper();
			if ($viewHelperName === NULL || isset($viewHelpers[$viewHelperName])) continue;
			// @see https://www.php.net/manual/en/language.oop5.basic.php#language.oop5.basic.class
			if (!preg_match($phpClassNameRegExp, $viewHelperName)) continue;
			if ($this->view === NULL)
				$this->view = $this->createView(TRUE);
			$viewHelper = $this->view->GetHelper($viewHelperName, FALSE);
			if (!($viewHelper instanceof AgGrids\Views\IReverseHelper)) continue;
			$viewHelperNameJson = $toolClass::JsonEncode($viewHelperName);
			/** @var AgGrids\Views\IReverseHelper $viewHelper */
			$viewHelpers[$viewHelperName] = $viewHelperNameJson . ':' . $viewHelper->GetJsFormatter();
		}
		return '{'.implode(',', array_values($viewHelpers)).'}';
	}

	/**
	 * @inheritDoc
	 * @return array<string,mixed>
	 */
	public function GetClientInitData () {
		if ($this->clientInitData === NULL) {
			$pageData = $this->GetPageData();
			$this->clientInitData = [
				'totalCount'		=> $this->GetTotalCount(),
				'offset'			=> $this->GetOffset(),
				'limit'				=> $this->GetLimit(),
				'sorting'			=> $this->GetAjaxSorting(),
				'filtering'			=> $this->GetAjaxFiltering(),
				'url'				=> $this->GetRequest()->GetFullUrl(),
				'path'				=> $this->GetGridRequest()->GetPath(),
				'page'				=> $this->GetPage(),
				'count'				=> $this->GetCount(),
				'dataCount'			=> count($pageData),
				'data'				=> $pageData,
			];
		}
		return $this->clientInitData;
	}

	/**
	 * @inheritDoc
	 * @return void
	 */
	public function DataInit () {
	}

	/**
	 * @inheritDoc
	 * @return void
	 */
	public function DataAction () {
		if (!$this->DispatchStateCheck(\MvcCore\IController::DISPATCH_STATE_ACTION_EXECUTED))
			return;
		list($gridPath, $gridUrl) = $this->GetAjaxGridPathAndUrl();
		$response = $this->dataActionGetResponse($gridPath, $gridUrl);
		$this->dispatchMoveState(static::DISPATCH_STATE_ACTION_EXECUTED);
		$this->dataActionSendResponse($response);
	}

	/**
	 * Return base response data `\stdClass`.
	 * @return \stdClass
	 */
	protected function dataActionGetResponse ($gridPath, $gridUrl) {
		$pageData = $this->GetPageData();
		return (object) [
			'totalCount'	=> $this->totalCount,
			'offset'		=> $this->offset,
			'limit'			=> $this->limit,
			'sorting'		=> $this->GetAjaxSorting(),
			'filtering'		=> $this->GetAjaxFiltering(),
			'url'			=> $gridUrl,
			'path'			=> $gridPath,
			'page'			=> $this->page,
			'count'			=> $this->count,
			'dataCount'		=> count($pageData),
			'controls'		=> $this->dataActionGetControls($gridPath),
			'data'			=> $pageData,
		];
	}
	
	/**
	 * Complete response data controls.
	 * @param  string $gridPath 
	 * @return \stdClass|NULL
	 */
	protected function dataActionGetControls ($gridPath) {
		$controls = NULL;
		$renderConf = $this->GetConfigRendering();
		$renderBottomControls = (
			$renderConf->GetRenderControlCountScales() ||
			$renderConf->GetRenderControlStatus() ||
			$renderConf->GetRenderControlPaging()
		);
		if ($renderBottomControls) {
			$controls = (object) [
				'countScales'	=> NULL,
				'status'		=> NULL,
				'paging'		=> NULL,
			];
			$this->reinitGridRequestAndUrlParams($gridPath);
			if ($renderConf->GetRenderControlCountScales())
				$controls->countScales	= $this->view->RenderGridControlCountScales();
			if ($renderConf->GetRenderControlStatus())
				$controls->status		= $this->view->RenderGridControlStatus();
			if ($renderConf->GetRenderControlPaging())
				$controls->paging		= $this->view->RenderGridControlPaging();
		}
		return $controls;
	}
	
	/**
	 * Serialize response data to core response object to send it later.
	 * @param  \stdClass $response 
	 * @return void
	 */
	protected function dataActionSendResponse ($response) {
		if ($this->request->HasParam(static::URL_PARAM_DEBUG)) {
			$toolsClass = $this->application->GetToolClass();
			$this->HtmlResponse('<pre>'.$toolsClass::JsonEncode($response, JSON_PRETTY_PRINT).'<pre>');
		} else {
			$callbackParamName = $this->ajaxParamsNames[self::AJAX_PARAM_CALLBACK];
			if ($this->request->HasParam($callbackParamName)) {
				$this->JsonpResponse($response);
			} else {
				$this->JsonResponse($response);
			}
		}
	}

	/**
	 * @inheritDoc
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
	 * @inheritDoc
	 * @return void
	 */
	public function ColumnsStatesInit () {
		$columnsUrlNamesRaw = $this->request->GetParams(FALSE, [], \MvcCore\IRequest::PARAM_TYPE_INPUT);
		
		$persistentColumns = $this->columnsStatesActionAssemble($columnsUrlNamesRaw);
		$this->gridPersistentColumnsWrite($persistentColumns);
		
		if ($this->IsAjax()) {
			$this->JsonResponse([
				'success'	=> TRUE
			]);
		} else {
			$gridParam = rtrim($this->gridRequest->GetPath(), '/');
			$controllerClass = get_parent_class(get_parent_class(__CLASS__));
			$redirectUrl = $controllerClass::Url($this->appRouteName, [
				static::URL_PARAM_GRID		=> $gridParam,
				static::URL_PARAM_ACTION	=> NULL,
			]);
			self::Redirect(
				$redirectUrl, 
				\MvcCore\IResponse::SEE_OTHER,
				'AgGrid column states processed.'
			);
		}
	}

	/**
	 * Complete persisten columns collection from raw post params.
	 * @param  array $postParams 
	 * @return array<string, PersistentColumn>
	 */
	protected function columnsStatesActionAssemble (array $postParams) {
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
	 * @inheritDoc
	 * @return void
	 */
	public function ColumnsChangesInit () {
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

		if ($this->IsAjax()) {
			$this->JsonResponse([
				'success'	=> $parseSuccess
			]);
		} else {
			$gridParam = rtrim($this->gridRequest->GetPath(), '/');
			$controllerClass = get_parent_class(get_parent_class(__CLASS__));
			$redirectUrl = $controllerClass::Url($this->appRouteName, [
				static::URL_PARAM_GRID		=> $gridParam,
				static::URL_PARAM_ACTION	=> NULL,
			]);
			self::Redirect(
				$redirectUrl, 
				\MvcCore\IResponse::SEE_OTHER, 
				'AgGrid column changes processed.'
			);
		}
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
			} catch (\Throwable $e) {
				if ($this->environment->IsDevelopment())
					throw $e;
			}
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
				if ($this->environment->IsDevelopment())
					throw $e;
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
	 * Get grid columns pestore if persisten store 
	 * is not configured with database.
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