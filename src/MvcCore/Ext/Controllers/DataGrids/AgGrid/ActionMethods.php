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
		if ($this->clientPageMode === IConstants::CLIENT_PAGE_MODE_MULTI) {	
			$renderConf = $this->GetConfigRendering();
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

	
	// TODO: move to internal getters trait:

	/**
	 * 
	 * @return string
	 */
	public function GetAjaxGridPathAndUrl () {
		// page and count
		$page = $this->page;
		$count = $this->count;
		if ($count === $this->itemsPerPage) {
			$count = NULL;
			if ($page === 1)
				$page = NULL;
		}
		$gridParams = [
			static::URL_PARAM_PAGE	=> $page,
			static::URL_PARAM_COUNT	=> $count,
		];
		// sorting ad filtering
		$configUrlSegments = $this->configUrlSegments;
		$urlDirAsc = $configUrlSegments->GetUrlSuffixSortAsc();
		$urlDirDesc = $configUrlSegments->GetUrlSuffixSortDesc();
		$subjValueDelim = $configUrlSegments->GetUrlDelimiterSubjectValue();
		$subjsDelim = $configUrlSegments->GetUrlDelimiterSubjects();
		$valuesDelim = $configUrlSegments->GetUrlDelimiterValues();
		$urlFilterOperators = $configUrlSegments->GetUrlFilterOperators();
		$urlDirections = [
			'ASC'	=> $urlDirAsc,
			'DESC'	=> $urlDirDesc,
		];
		$sortParams = [];
		foreach ($this->sorting as $columnDbName => $sortDirection) {
			$columnUrlDir = $urlDirections[$sortDirection];
			$columnConfig = $this->configColumns->GetByDbColumnName($columnDbName);
			$columnUrlName = $columnConfig->GetUrlName();
			$sortParams[] = "{$columnUrlName}{$subjValueDelim}{$columnUrlDir}";
		}
		$gridParams[static::URL_PARAM_SORT] = count($sortParams) > 0 
			? implode($subjsDelim, $sortParams) 
			: NULL;
		// filtering
		$filterParams = [];
		foreach ($this->filtering as $columnDbName => $filterOperatorsAndValues) {
			$columnConfig = $this->configColumns->GetByDbColumnName($columnDbName);
			$columnUrlName = $columnConfig->GetUrlName();
			foreach ($filterOperatorsAndValues as $operator => $filterValues) {
				$filterUrlValues = implode($valuesDelim, $filterValues);
				$operatorUrlValue = $urlFilterOperators[$operator];
				$filterParams[] = "{$columnUrlName}{$subjValueDelim}{$operatorUrlValue}{$subjValueDelim}{$filterUrlValues}";
			}
		}
		$gridParams[static::URL_PARAM_FILTER] = count($filterParams) > 0
			? implode($subjsDelim, $filterParams)
			: NULL;
		// complete grid param path
		list ($gridParam) = $this->route->Url(
			$this->gridRequest,
			$gridParams,
			$this->urlParams,
			$this->queryStringParamsSepatator,
			FALSE
		);
		$gridParam = rtrim(rawurldecode($gridParam), '/');
		$urlParams = [static::URL_PARAM_GRID => $gridParam];
		if (array_key_exists(static::URL_PARAM_ACTION, $gridParams) && $gridParams[static::URL_PARAM_ACTION] === NULL)
			$urlParams[static::URL_PARAM_ACTION] = NULL;
		/** @var \MvcCore\Controller $parentOfParentClass */
		$parentOfParentClass = get_parent_class(get_parent_class(__CLASS__));
		$url = $parentOfParentClass::Url($this->appRouteName, $urlParams);
		return [$gridParam, $url];
	}

	/**
	 * @return [string, int][]
	 */
	public function GetAjaxSorting () {
		$sorting = [];
		$sqlDirections = ['ASC' => 1, 'DESC' => 0];
		$configColumns = $this->GetConfigColumns(FALSE);
		foreach ($this->sorting as $dbColumnName => $sqlDirection) {
			$columnUrlName = $configColumns->GetByDbColumnName($dbColumnName)->GetUrlName();
			$sorting[] = [$columnUrlName, $sqlDirections[$sqlDirection]];
		}
		return $sorting;
	}

	/**
	 * @return array<string, array<string, \string[]>>
	 */
	public function GetAjaxFiltering () {
		$filtering = [];
		$configColumns = $this->GetConfigColumns(FALSE);
		//$urlFilterOperators = $this->configUrlSegments->GetUrlFilterOperators();
		foreach ($this->filtering as $dbColumnName => $operatorsAndValues) {
			$columnUrlName = $configColumns->GetByDbColumnName($dbColumnName)->GetUrlName();
			$filtering[$columnUrlName] = $operatorsAndValues;
		}
		return $filtering;
	}
}