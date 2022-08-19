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
		if ($this->dispatchState <= \MvcCore\IController::DISPATCH_STATE_INITIALIZED) 
			$this->Init();
		if ($this->dispatchState >= \MvcCore\IController::DISPATCH_STATE_PRE_DISPATCHED) return;
		if (!$this->ajaxDataRequest) return;
		$this->LoadModel();
		$this->pageData = $this->model->GetPageData();
		$response = [
			'totalCount'	=> $this->totalCount,
			'offset'		=> $this->offset,
			'limit'			=> $this->limit,
			'sorting'		=> $this->GetAjaxSorting(),
			'filtering'		=> $this->GetAjaxFiltering(),
			'dataCount'		=> count($this->pageData),
			'data'			=> $this->pageData,
		];
		$callbackParamName = $this->ajaxParamsNames[self::AJAX_PARAM_CALLBACK];
		if ($this->request->HasParam($callbackParamName)) {
			$this->JsonpResponse($response, );
		} else {
			$this->JsonResponse($response);
		}
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
		$urlFilterOperators = $this->configUrlSegments->GetUrlFilterOperators();
		foreach ($this->filtering as $dbColumnName => $operatorsAndValues) {
			$columnUrlName = $configColumns->GetByDbColumnName($dbColumnName)->GetUrlName();
			$filtering[$columnUrlName] = $operatorsAndValues;
		}
		return $filtering;
	}
}