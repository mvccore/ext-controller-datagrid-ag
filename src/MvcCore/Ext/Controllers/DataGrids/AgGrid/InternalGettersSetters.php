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
trait InternalGettersSetters {
	
	/**
	 * @inheritDocs
	 * @return \MvcCore\Request
	 */
	public function GetGridRequest () {
		if ($this->gridRequest === NULL) {
			$gridParam = $this->ajaxDataRequest
				// get `gridPath` param from application AJAX request object
				? $this->GetParam(static::AJAX_PARAM_PATH, FALSE)
				// get `grid` param from application GET request object
				: $this->GetParam(static::URL_PARAM_GRID, FALSE);
			$gridParam = $gridParam !== NULL
				? '/' . ltrim($gridParam, '/')
				: '';
			$this->gridRequest = \MvcCore\Request::CreateInstance()
				->SetBasePath('')
				->SetPath($gridParam);
		}
		return $this->gridRequest;
	}

	/**
	 * @inheritDocs
	 * @return int
	 */
	public function GetTimeZoneOffsetSeconds () {
		$tzOffset = $this->GetTimeZoneOffset();
		$hoursSeconds = intval($tzOffset->format('%h')) * 3600;
		$minutesSeconds = intval($tzOffset->format('%i')) * 60;
		$seconds = intval($tzOffset->format('%s'));
		$totalSeconds = $hoursSeconds + $minutesSeconds + $seconds;
		if ($tzOffset->invert) $totalSeconds *= -1;
		return $totalSeconds;
	}

	/**
	 * @inheritDocs
	 * @return string
	 */
	public function GetAjaxGridPathAndUrl () {
		// page and count
		$page = $this->page;
		$count = $this->count;
		$defaultCount = $this->clientPageMode === IConstants::CLIENT_PAGE_MODE_SINGLE
			? $this->clientRequestBlockSize
			: $this->itemsPerPage;
		if ($count === $defaultCount) {
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
	 * @inheritDocs
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
	 * @inheritDocs
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

	/**
	 * @inheritDocs
	 * @return array|[string, \string[]]
	 */
	public function GetGridCacheKeyAndTags () {
		$localization = $this->GetConfigLocales()->GetLocale(TRUE);
		$cacheKey = "grid_{$this->id}_{$this->creationPlaceImprint}_{$localization}";
		$cacheTags = ['grid', "grid-{$this->id}"];
		return [$cacheKey, $cacheTags];
	}
}