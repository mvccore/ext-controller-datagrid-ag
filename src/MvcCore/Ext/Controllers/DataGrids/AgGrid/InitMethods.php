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

use \MvcCore\Ext\Controllers\DataGrid\IConstants as GridConsts,
	\MvcCore\Ext\Controllers\DataGrids\AgGrid\IConstants as AgGridConsts,
	\MvcCore\Ext\Controllers\DataGrids\Configs\Column as ConfigColumn,
	\MvcCore\Ext\Controllers\DataGrids\Configs\IColumn as IConfigColumn,
	\MvcCore\Ext\Controllers\DataGrids\Views\IReverseHelper;

/**
 * @phpstan-type Filtering array<string, array<string, array<mixed>>>
 * @phpstan-type OperatorAndValues array<string, array<string>>
 * @phpstan-type AllowedOperators array<string, object{"operator":string,"multiple":boolean,"regex":?string}>
 * 
 * @mixin \MvcCore\Ext\Controllers\DataGrids\AgGrid
 */
trait InitMethods {

	/**
	 * @inheritDoc
	 * @return void
	 */
	public function Init () {
		if ($this->dispatchState >= static::DISPATCH_STATE_INITIALIZED) 
			return;
		
		$this->GetConfigRendering();
		
		$this->initConfigRenderingByClientPageMode();
		
		// \MvcCore\Controller::Init();
		$baseCtrlInit = new \ReflectionMethod('\MvcCore\Controller', 'Init');
		$baseCtrlInit->invokeArgs($this, []);
		
		$this->initModelClasses();
		$this->GetConfigUrlSegments();
		$this->initTranslations();
		$this->GetConfigColumns(FALSE);

		$this->initPersistentColumnsData();

		$this->initGridActions();
		
		$this->GetRoute();
		$this->GetUrlParams();
		
		$this->initCountScales();

		if ($this->ajaxDataRequest) {
			$this->initAjaxParams();
			$this->initRequestBlockSize();
			$this->initClientRowBuffer();
		} else {
			if (!$this->initUrlParams()) return; // redirect inside
			$this->initClientPageMode();
			$this->initRequestBlockSize();
			$this->initClientRowBuffer();
			$this->initClientCache();
			$this->initOffsetLimit();
		}

		if (!$this->initUrlBuilding()) return; // redirect inside
		$this->initOperators();
		
		$this->initSorting();
		if (!$this->initFiltering()) return; // redirect inside

		$this->GetTimeZoneOffset();
		
		if ($this->gridInitAction !== NULL)
			call_user_func([$this, $this->gridInitAction]);
	}
	
	/**
	 * @inheritDoc
	 * @throws \InvalidArgumentException
	 * @return void
	 */
	protected function initModelClasses () {
		parent::initModelClasses();
		/** @var \MvcCore\Tool $toolClass */
		$toolClass = $this->application->GetToolClass();
		$this->rowClassIsActiveColumnsModel = $toolClass::CheckClassInterface(
			$this->rowClass, self::$rowModelActiveColumnsInterface, TRUE, FALSE
		);
	}
	
	/**
	 * @return void
	 */
	protected function initConfigRenderingByClientPageMode () {
		if ($this->clientPageMode === AgGridConsts::CLIENT_PAGE_MODE_SINGLE) {
			$this->configRendering
				->SetRenderControlSorting(GridConsts::CONTROL_DISPLAY_NEVER)
				->SetRenderControlCountScales(GridConsts::CONTROL_DISPLAY_NEVER)
				->SetRenderControlPaging(GridConsts::CONTROL_DISPLAY_NEVER)
				->SetRenderControlPagingPrevAndNext(FALSE)
				->SetRenderControlPagingFirstAndLast(FALSE);
		}
	}
	
	/**
	 * @return void
	 */
	protected function initPersistentColumnsData () {
		/** @var array<string, \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\PersistentColumn> $persistentColumns */
		$persistentColumns = $this->gridPersistentColumnsRead();
		if (count($persistentColumns) === 0) return;
		$enabledColumnsCnt = 0;
		$allConfigColumns = $this->GetConfigColumns(FALSE);
		foreach ($allConfigColumns as $configColumn) {
			$propName = $configColumn->GetPropName();
			if (isset($persistentColumns[$propName])) {
				$persistentColumn = $persistentColumns[$propName];
				$configColumn->SetColumnIndexUser($persistentColumn->GetColumnIndex());
				$configColumn->SetWidth($persistentColumn->GetWidth());
				$configColumn->SetDisabled($disabled = $persistentColumn->GetDisabled());
				if (!$disabled) $enabledColumnsCnt += 1;
			}
		}
		if ($enabledColumnsCnt === 0 && count($allConfigColumns) > 0) {
			foreach ($allConfigColumns as $configColumn) {
				if ($configColumn->GetPropName() === $configColumn->GetHeadingName()) continue;
				$configColumn->SetDisabled(FALSE);
				break;
			}
		}
	}

	/**
	 * Complete internal action method name.
	 * @return void
	 */
	protected function initGridActions () {
		$gridActionParam = $this->request->GetParam(static::URL_PARAM_ACTION, '-_a-zA-Z', static::$gridInitActionDefaultKey, 'string');
		if ($this->gridInitAction === NULL) {
			$gridActionParamKey = $gridActionParam;
			if (!isset(static::$gridInitActions[$gridActionParamKey])) 
				$gridActionParamKey = static::$gridInitActionDefaultKey;
			$this->gridInitAction = static::$gridInitActions[$gridActionParamKey];

		}
		if ($this->ajaxDataRequest === NULL) {
			$this->initDataUrlAndAjaxDataRequest($gridActionParam);
		}
	}

	/**
	 * Determinate ajax data request by requested url.
	 * @param  string $gridActionParam 
	 * @return void
	 */
	protected function initDataUrlAndAjaxDataRequest ($gridActionParam) {
		// absolutize data url if any:
		if ($this->urlData === NULL) {
			$this->ajaxDataRequest = $gridActionParam === static::GRID_ACTION_DATA;
		} else {
			if (!(mb_strpos($this->urlData, 'http://') === 0 || mb_strpos($this->urlData, 'https://') === 0))
				$this->urlData = $this->request->GetDomainUrl() . $this->urlData;
			$toolClass = $this->application->GetToolClass();
			$dataUrlParsed = (object) $toolClass::ParseUrl($this->urlData);
			$this->ajaxDataRequest = (
				$dataUrlParsed->scheme . ':' === $this->request->GetScheme() &&
				$dataUrlParsed->host === $this->request->GetHostName() &&
				$dataUrlParsed->path === $this->request->GetBasePath() . $this->request->GetPath()
			);
			if ($this->ajaxDataRequest && isset($dataUrlParsed->query)) {
				// complete and sort dataurl params:
				parse_str($dataUrlParsed->query, $dataUrlParsedParams);
				$dataUrlParsedParamsCount = count($dataUrlParsedParams);
				if (!is_array($dataUrlParsedParams) || $dataUrlParsedParamsCount === 0) {
					$this->ajaxDataRequest = FALSE;
				} else {
					static::sortRecursive($dataUrlParsedParams);
					// complete and sort only rewrite and get request params:
					$reqParams = $this->request->GetParams(
						FALSE, [], 
						\MvcCore\Request\IConstants::PARAM_TYPE_URL_REWRITE | 
						\MvcCore\Request\IConstants::PARAM_TYPE_QUERY_STRING
					);
					unset(
						$reqParams['path'],
						$reqParams[$this->ajaxParamsNames[self::AJAX_PARAM_OFFSET]],
						$reqParams[$this->ajaxParamsNames[self::AJAX_PARAM_LIMIT]],
						$reqParams[$this->ajaxParamsNames[self::AJAX_PARAM_SORTING]],
						$reqParams[$this->ajaxParamsNames[self::AJAX_PARAM_FILTERING]],
						$reqParams[$this->ajaxParamsNames[self::AJAX_PARAM_CACHE_BUSTER]]
					);
					if ($this->router instanceof \MvcCore\Ext\Routers\IExtended) {
						$router = $this->router;
						unset($reqParams[$router::URL_PARAM_ADMIN_REQUEST]);
						unset($dataUrlParsedParams[$router::URL_PARAM_ADMIN_REQUEST]);
						$dataUrlParsedParamsCount = count($dataUrlParsedParams);
					}
					if (($this->dataRequestMethod & static::AJAX_DATA_REQUEST_METHOD_JSONP) != 0)
						unset($reqParams[$this->ajaxParamsNames[self::AJAX_PARAM_CALLBACK]]);
					if (count($reqParams) > 0) {
						static::sortRecursive($reqParams);
						$reqParamsCount = 0;
						// check if all data url params are contained and with the same values as in current request:
						$serializeFn = function_exists('igbinary_serialize') ? 'igbinary_serialize' : 'serialize';
						foreach ($dataUrlParsedParams as $dataUrlParsedParamName => $dataUrlParsedParamValues) {
							if (
								isset($reqParams[$dataUrlParsedParamName]) &&
								call_user_func($serializeFn, $reqParams[$dataUrlParsedParamName]) === call_user_func($serializeFn, $dataUrlParsedParamValues)
							) $reqParamsCount++;
						}
						$this->ajaxDataRequest = $dataUrlParsedParamsCount === $reqParamsCount;
					}
				}
			}
		}
	}


	/**
	 * Initialize client row model if not specified.
	 * @return void
	 */
	protected function initClientPageMode () {
		if ($this->clientPageMode !== NULL) return;
		if (
			$this->count === 0 || 
			$this->count > AgGridConsts::CLIENT_PAGE_MODE_MULTI_MAX_ROWS || 
			$this->itemsPerPage > AgGridConsts::CLIENT_PAGE_MODE_MULTI_MAX_ROWS
		) {
			$this->clientPageMode = AgGridConsts::CLIENT_PAGE_MODE_SINGLE;
		} else {
			$this->clientPageMode = AgGridConsts::CLIENT_PAGE_MODE_MULTI;
		}
	}
	
	/**
	 * @return void
	 */
	protected function initRequestBlockSize () {
		if ($this->clientRequestBlockSize !== NULL) return;
		$this->clientRequestBlockSize = $this->clientPageMode === AgGridConsts::CLIENT_PAGE_MODE_MULTI
			? $this->itemsPerPage
			: AgGridConsts::CLIENT_JS_REQUEST_BLOCK_SIZE;
	}
	
	/**
	 * @return void
	 */
	protected function initClientRowBuffer () {
		if ($this->clientRowBuffer !== NULL) return;
		$this->clientRowBuffer = $this->clientPageMode === AgGridConsts::CLIENT_PAGE_MODE_MULTI
			? AgGridConsts::CLIENT_JS_BUFFER_PAGE_MODE_MULTI
			: AgGridConsts::CLIENT_JS_BUFFER_PAGE_MODE_SINGLE;
	}

	/**
	 * @return void
	 */
	protected function initClientCache () {
		if ($this->clientCache && $this->clientMaxRowsInCache === NULL)
			$this->clientMaxRowsInCache = AgGridConsts::CLIENT_JS_MAX_ROWS_IN_CACHE;
	}

	/**
	 * Check valid values from URL for page and items par page.
	 * If some value is invalid, redirect to default value.
	 * @return bool
	 */
	protected function initUrlParams () {
		if ($this->clientPageMode === AgGridConsts::CLIENT_PAGE_MODE_SINGLE) {
			if (!$this->initUrlParamPage())		return FALSE;
			if (!$this->initUrlParamCount())	return FALSE;
			return TRUE;
		} else {
			return parent::initUrlParams();
		}
	}
	
	protected function initUrlParamPageByCount () {
		return TRUE;
	}

	/**
	 * 
	 * @return bool
	 */
	protected function initUrlParamCount () {
		if ($this->clientPageMode === AgGridConsts::CLIENT_PAGE_MODE_SINGLE) {
			if (!isset($this->urlParams[static::URL_PARAM_COUNT])) {
				// if there is no count param in url - use items per page as default count
				$this->count = $this->GetItemsPerPage();
			} else {
				// verify if count is not too high, if it is - redirect to highest count in count scales:
				$this->count = intval($this->urlParams[static::URL_PARAM_COUNT]);
				$itemsPerPage = $this->GetItemsPerPage();
				if ($this->count !== $itemsPerPage) {
					$redirectUrl = $this->GridCountUrl($itemsPerPage);
					/** @var \MvcCore\Controller $this */
					$this::Redirect(
						$redirectUrl, 
						\MvcCore\Response\IConstants::SEE_OTHER, 
						'Grid count is not the same as items per page.'
					);
					return FALSE;
				}
			}
			return TRUE;
		} else {
			return parent::initUrlParamCount();
		}
	}

	/**
	 * @return void
	 */
	protected function initAjaxParams () {
		$this->clientPageMode = $this->GetParam(
			$this->ajaxParamsNames[self::AJAX_PARAM_MODE], 
			implode('-', [AgGridConsts::CLIENT_PAGE_MODE_MULTI, AgGridConsts::CLIENT_PAGE_MODE_SINGLE]), 
			AgGridConsts::CLIENT_PAGE_MODE_MULTI, 
			'int'
		);
		$this->offset = $this->GetParam($this->ajaxParamsNames[self::AJAX_PARAM_OFFSET], '0-9', 0, 'int');
		$this->limit = $this->GetParam($this->ajaxParamsNames[self::AJAX_PARAM_LIMIT], '0-9', NULL, 'int');
		$allCountScaleMatched = array_search(0, $this->countScales, TRUE) !== FALSE;
		$lastCountsScale = max($this->countScales);
		if (!$allCountScaleMatched && ($this->limit === 0 || $this->limit > $lastCountsScale)) {
			$this->limit = $lastCountsScale;
		}
		$this->count = $this->limit;
		$this->page = $this->count > 0
			? $this->intdiv($this->offset, $this->count) + 1
			: 1;
	}
	
	/**
	 * If client row model is single page and request is ajax:
	 *    Get request param for offset and limit.
	 * If client row model is for multiple pages:
	 *    Set up offset and limit properties for datagrid model instance.
	 *    Offset is always presented, limit could be `NULL` or integer.
	 * @return void
	 */
	protected function initOffsetLimit() {
		if ($this->clientPageMode === AgGridConsts::CLIENT_PAGE_MODE_SINGLE) {
			$this->offset = 0;
			$this->limit = $this->clientRowBuffer * 2;
		} else {
			parent::initOffsetLimit();
		}
	}

	/**
	 * Process canonical redirect if necessary and remove default 
	 * values from route to be able to build grid urls.
	 * @return bool
	 */
	protected function initUrlBuilding () {
		/** @var \MvcCore\Controller $this */
		$processCanonicalRedirect = FALSE;
		if (!$this->ajaxDataRequest) {
			$defaultAction = $this->gridInitAction === static::$gridInitActions[static::$gridInitActionDefaultKey];
			$processCanonicalRedirect = $defaultAction && $this->router->GetAutoCanonizeRequests();
		}

		if ($processCanonicalRedirect && !$this->initUrlBuildingCanonicalRedirect()) 
			return FALSE;

		// remove all default values from route to build urls with `$this->urlParams` only:
		$this->route->SetDefaults([]);
		
		return TRUE;
	}

	/**
	 * If client row model is single page and request is ajax:
	 *    Verify and complete sorting from AJAX params as array of databse
	 *    column names as keys and sorting directions `ASC | DESC` as values.
	 * If client row model is for multiple pages:
	 *    Parse, verify and complete sorting from URL as array of databse
	 *    column names as keys and sorting directions `ASC | DESC` as values.
	 * @return void
	 */
	/*protected function initSortingOld () {
		if ($this->ajaxDataRequest) {
			if (!$this->sortingMode) return;
			$rawSortingItemsStr = $this->GetParam($this->ajaxParamsNames[self::AJAX_PARAM_SORTING], FALSE);
			if ($rawSortingItemsStr === NULL) return;
			$rawSortingItems = [];
			if (is_array($rawSortingItemsStr)) {
				foreach ($rawSortingItemsStr as $rawSortingItemStr) {
					try {
						$rawSortingItem = \MvcCore\Tool::JsonDecode($rawSortingItemStr, JSON_OBJECT_AS_ARRAY);
					} catch (\Throwable $e) {
						$rawSortingItem = NULL;
					}
					if ($rawSortingItem !== NULL)
						$rawSortingItems[] = $rawSortingItem;
				}
			} else {
				try {
					$rawSortingItems = \MvcCore\Tool::JsonDecode($rawSortingItemsStr, JSON_OBJECT_AS_ARRAY);
				} catch (\Throwable $e) {
					$rawSortingItems = NULL;
				}
			}
			if (!is_array($rawSortingItems)) return;
			$sortValues = [0 => 'DESC', 1 => 'ASC'];
			$multiSorting = ($this->sortingMode & static::SORT_MULTIPLE_COLUMNS) != 0;
			$sorting = [];
			foreach ($rawSortingItems as $rawColumnUrlNameAndDirection) {
				if (
					!is_array($rawColumnUrlNameAndDirection) || (
						is_array($rawColumnUrlNameAndDirection) && 
						count($rawColumnUrlNameAndDirection) != 2
					)
				) continue;
				list($rawColumnUrlName, $rawDirection) = $rawColumnUrlNameAndDirection;
				$direction = isset($sortValues[$rawDirection]) 
					? $sortValues[$rawDirection]
					: 'ASC';
				$rawColumnUrlName = $this->removeUnknownChars($rawColumnUrlName);
				if ($rawColumnUrlName === NULL || !isset($this->configColumns[$rawColumnUrlName])) continue;
				$configColumn = $this->configColumns[$rawColumnUrlName];
				if ($configColumn->GetDisabled()) {
					if ($this->ignoreDisabledColumns) {
						$this->enableColumn($configColumn);
					} else {
						continue;
					}
				}
				$columnSortCfg = $configColumn->GetSort();
				if ($columnSortCfg === FALSE || $columnSortCfg === NULL) continue;
				$sorting[$configColumn->GetDbColumnName()] = $direction;
				if (!$multiSorting) break;
			}
			if (count($sorting) === 0) {
				foreach ($this->configColumns as $configColumn) {
					$configColumnSort = $configColumn->GetSort();
					if (is_string($configColumnSort)) {
						$dbColumnName = $configColumn->GetDbColumnName();
						$sorting[$dbColumnName] = $configColumnSort;
						if (!$multiSorting) break;
					}
				}
			}
			$this->sorting = $sorting;
		} else {
			parent::initSorting();
		}
	}*/
	
	/**
	 * If client row model is single page and request is ajax:
	 *    Verify and complete sorting from AJAX params as array of databse
	 *    column names as keys and sorting directions `ASC | DESC` as values.
	 * If client row model is for multiple pages:
	 *    Parse, verify and complete sorting from URL as array of databse
	 *    column names as keys and sorting directions `ASC | DESC` as values.
	 * @return void
	 */
	protected function initSorting () {
		if (!$this->ajaxDataRequest) {
			parent::initSorting();
		} else {
			if (!$this->sortingMode) return;
			$rawSortingStr = $this->GetParam($this->ajaxParamsNames[self::AJAX_PARAM_SORTING], FALSE);
			if ($rawSortingStr === NULL) return;
			$rawSorting = [];
			if (is_array($rawSortingStr)) {
				foreach ($rawSortingStr as $rawSortingItem) {
					try {
						$rawSortingItem = \MvcCore\Tool::JsonDecode($rawSortingItem, JSON_OBJECT_AS_ARRAY);
					} catch (\Throwable $e) {
						$rawSortingItem = NULL;
					}
					if ($rawSortingItem !== NULL)
						$rawSorting[] = $rawSortingItem;
				}
			} else {
				try {
					$rawSorting = \MvcCore\Tool::JsonDecode($rawSortingStr, JSON_OBJECT_AS_ARRAY);
				} catch (\Throwable $e) {
					$rawSorting = NULL;
				}
			}
			if (!is_array($rawSorting)) return;
			$invalidValueFound = FALSE;
			$currentClassType = new \ReflectionClass(__CLASS__);
			$currentParseSorting = $currentClassType->getMethod('ParseSorting');
			$this->sorting = $currentParseSorting->invokeArgs($this, [$rawSorting, & $invalidValueFound]);
			//$this->sorting = $this->ParseSorting($rawSorting, $invalidValueFound);
		}
	}

	/**
	 * Parse, check and filter all sorting columns and directions.
	 * Remove what is not allowed and normalize values.
	 * @param  array<array{"0":string,"1":int}> $rawSorting 
	 * @param  bool                             $invalidValueFound 
	 * @return array<string,bool|string|null>
	 */
	public function ParseSorting ($rawSorting, &$invalidValueFound = FALSE) {
		$sorting = [];
		/** @var array<int,string> $sortValues */
		$sortValues = [0 => 'DESC', 1 => 'ASC'];
		$multiSorting = ($this->sortingMode & static::SORT_MULTIPLE_COLUMNS) != 0;

		foreach ($rawSorting as $rawColumnUrlNameAndDirection) {
			if (
				!is_array($rawColumnUrlNameAndDirection) || (
					is_array($rawColumnUrlNameAndDirection) &&
					count($rawColumnUrlNameAndDirection) != 2
				)
			) {
				$invalidValueFound = TRUE;
				continue;
			}
			list($rawColumnUrlName, $rawDirection) = $rawColumnUrlNameAndDirection;
			$direction = isset($sortValues[$rawDirection]) 
				? $sortValues[$rawDirection]
				: 'ASC';
			$rawColumnUrlName = $this->removeUnknownChars($rawColumnUrlName);
			if ($rawColumnUrlName === NULL || !isset($this->configColumns[$rawColumnUrlName])) {
				$invalidValueFound = TRUE;
				continue;
			}
			/** @var IConfigColumn $configColumn */
			$configColumn = $this->configColumns[$rawColumnUrlName];
			if ($configColumn->GetDisabled()) {
				if ($this->ignoreDisabledColumns) {
					$this->enableColumn($configColumn);
				} else {
					$invalidValueFound = TRUE;
					continue;
				}
			}
			$columnSortCfg = $configColumn->GetSort();
			if ($columnSortCfg === FALSE || $columnSortCfg === NULL) {
				$invalidValueFound = TRUE;
				continue;
			}
			$sorting[$configColumn->GetDbColumnName()] = $direction;
			if (!$multiSorting) break;
		}

		// if there is no sorting, complete default sorting from columns configuration
		if (count($sorting) === 0) {
			foreach ($this->configColumns as $configColumn) {
				/** @var IConfigColumn $configColumn */
				$configColumnSort = $configColumn->GetSort();
				if (is_string($configColumnSort)) {
					$dbColumnName = $configColumn->GetDbColumnName();
					$sorting[$dbColumnName] = $configColumnSort;
					if (!$multiSorting) break;
				}
			}
		}

		return $sorting;
	}

	/**
	 * Parse filtering from URL as array of databse column names as keys 
	 * and values as array of raw filtering values.
	 * @return bool
	 */
	/*protected function initFilteringOld () {
		if (!$this->ajaxDataRequest) {
			return parent::initFiltering();
		} else {
			if (!$this->filteringMode) return TRUE;
			$rawFilteringItemsStr = $this->GetParam($this->ajaxParamsNames[self::AJAX_PARAM_FILTERING], FALSE);
			if ($rawFilteringItemsStr === NULL) return TRUE;
			try {
				$rawFilteringItems = \MvcCore\Tool::JsonDecode($rawFilteringItemsStr, JSON_OBJECT_AS_ARRAY);
			} catch (\Throwable $e) {
				$rawFilteringItems = NULL;
			}
			if (!is_array($rawFilteringItems)) return TRUE;
			$filteringColumns = $this->getFilteringColumns();
			$multiFiltering = ($this->filteringMode & static::FILTER_MULTIPLE_COLUMNS) != 0;
			$urlFilterOperators = $this->configUrlSegments->GetUrlFilterOperators();
			$filtering = [];
			foreach ($rawFilteringItems as $rawColumnUrlName => $rawOperatorAndValues) {
				$rawColumnUrlName = $this->removeUnknownChars($rawColumnUrlName);
				if ($rawColumnUrlName === NULL || !isset($this->configColumns[$rawColumnUrlName])) continue;
				// check if column exists
				$configColumn = $this->configColumns[$rawColumnUrlName];
				$columnPropName = $configColumn->GetPropName();
				$columnTypes = $configColumn->GetTypes();
				// check if column support filtering
				if (!isset($filteringColumns[$columnPropName])) {
					if ($this->ignoreDisabledColumns) {
						if ($configColumn->GetDisabled())
							$this->enableColumn($configColumn);
					} else {
						continue;
					}
				} else {
					if ($configColumn->GetDisabled())
						$this->enableColumn($configColumn);
				}
				$columnDbName = $configColumn->GetDbColumnName();
				$columnFilterCfg = $configColumn->GetFilter();
				// check if column has allowed parsed operator
				$allowedOperators = is_integer($columnFilterCfg)
					? $this->columnsAllowedOperators[$columnPropName]
					: $this->defaultAllowedOperators;
				$columnFilter = $configColumn->GetFilter();
				$columnAllowNullFilter = (
					is_int($columnFilter) && ($columnFilter & self::FILTER_ALLOW_NULL) != 0
				);
				$viewHelperName = $configColumn->GetViewHelper();
				list ($useViewHelper, $viewHelper) = $this->getFilteringViewHelper($viewHelperName);
				foreach ($rawOperatorAndValues as $rawOperator => $rawValues) {
					if (!isset($urlFilterOperators[$rawOperator])) continue;
					$urlOperator = $urlFilterOperators[$rawOperator];
					if (!isset($allowedOperators[$urlOperator])) continue;
					$operatorCfg = $allowedOperators[$urlOperator];
					$operator = $operatorCfg->operator;
					$multiple = $operatorCfg->multiple;
					$regex = $operatorCfg->regex;
					if (!$multiple && count($rawValues) > 1)
						$rawValues = [$rawValues[0]];
					$operatorValues = [];
					foreach ($rawValues as $rawValue) {
						$rawValue = $this->removeUnknownChars($rawValue);
						if ($rawValue === NULL) continue;
						$rawValue = ltrim($rawValue, '!<=>');
						if ($rawValue === '') continue;
						if ($useViewHelper) {
							x($configColumn);
							$rawValue = call_user_func_array(
								[$viewHelper, 'Unformat'],
								array_merge([$rawValue], $configColumn->GetFormatArgs() ?: [])
							);
							if ($rawValue === NULL) continue;
						}
						$rawValueToCheckType = $rawValue;
						// complete possible operator prefixes from submitted value
						$containsPercentage = $this->CheckFilterValueForSpecialLikeChar($rawValue, '%');
						$containsUnderScore = $this->CheckFilterValueForSpecialLikeChar($rawValue, '_');
						if (($containsPercentage & 1) !== 0) 
							$rawValueToCheckType = str_replace('%', '', $rawValueToCheckType);
						if (($containsUnderScore & 1) !== 0) 
							$rawValueToCheckType = str_replace('_', '', $rawValueToCheckType);
						//  check if operator configuration allowes submitted value form
						if ($regex !== NULL && !preg_match($regex, $rawValue)) continue;
						// check value by configured types
						if (strtolower($rawValue) === static::NULL_STRING_VALUE) {
							if ($columnAllowNullFilter)
								$operatorValues[] = static::NULL_STRING_VALUE;
						} else if (is_array($columnTypes) && count($columnTypes) > 0) {
							$typeValidationSuccess = FALSE;
							foreach ($columnTypes as $columnType) {
								$typeValidationSuccessLocal = $this->validateRawFilterValueByType(
									$rawValueToCheckType, $columnType
								);
								if ($typeValidationSuccessLocal) {
									$typeValidationSuccess = TRUE;
									break;
								}
							}
							if (!$typeValidationSuccess) continue;
							$operatorValues[] = $rawValue;
						} else {
							$operatorValues[] = $rawValue;
						}

					}
					if (count($operatorValues) === 0) continue;
					// set up filtering value
					if (!isset($filtering[$columnDbName]))
						$filtering[$columnDbName] = [];
					$filtering[$columnDbName][$operator] = $operatorValues;
					if (!$multiFiltering) break;

				}
				if (!$multiFiltering) break;
			}
			// set up new initial filtering:
			$this->filtering = $filtering;
			return TRUE;
		}
	}*/
	
	/**
	 * Parse filtering from URL as array of databse column names as keys 
	 * and values as array of raw filtering values.
	 * @return bool
	 */
	protected function initFiltering () {
		if (!$this->ajaxDataRequest) return parent::initFiltering();
		if (!$this->filteringMode) return TRUE;

		$rawFilteringStr = $this->GetParam($this->ajaxParamsNames[self::AJAX_PARAM_FILTERING], FALSE);
		if ($rawFilteringStr === NULL) return TRUE;

		try {
			$rawFiltering = \MvcCore\Tool::JsonDecode($rawFilteringStr, JSON_OBJECT_AS_ARRAY);
		} catch (\Throwable $e) {
			$rawFiltering = NULL;
		}
		if (!is_array($rawFiltering)) return TRUE; // if it is not an array - ignore all filtering

		// set up new initial filtering:
		$invalidValueFound = FALSE;
		$currentClassType = new \ReflectionClass(__CLASS__);
		$currentParseFiltering = $currentClassType->getMethod('ParseFiltering');
		$this->filtering = $currentParseFiltering->invokeArgs($this, [$rawFiltering, & $invalidValueFound]);
		//$this->filtering = $this->ParseFiltering($rawFilteringItems, $invalidFilterValue);
		// if (!$invalidValueFound) return FALSE; // do not redirect ajax requests, just unset invalid filter values and continue

		return TRUE;
	}

	/**
	 * Check and filter all filtering columns, operators and values.
	 * Remove what is not allowed, unformat values back to system values.
	 * @param  Filtering $rawFiltering 
	 * @param  bool      $invalidValueFound
	 * @return Filtering
	 */
	public function ParseFiltering ($rawFiltering, & $invalidValueFound = FALSE) {
		$filtering = [];

		$filteringColumns = $this->getFilteringColumns();
		$multiFiltering = ($this->filteringMode & static::FILTER_MULTIPLE_COLUMNS) != 0;
		$urlFilterOperators = $this->configUrlSegments->GetUrlFilterOperators();

		foreach ($rawFiltering as $rawColumnUrlName => $rawOperatorAndValues) {
			$rawColumnUrlName = $this->removeUnknownChars($rawColumnUrlName);
			if ($rawColumnUrlName === NULL || !isset($this->configColumns[$rawColumnUrlName])) continue;

			// check if column exists
			/** @var ConfigColumn $configColumn */
			$configColumn = $this->configColumns[$rawColumnUrlName];
			$columnPropName = $configColumn->GetPropName();

			// check if column support filtering
			if (!isset($filteringColumns[$columnPropName])) {
				if ($this->ignoreDisabledColumns) {
					if ($configColumn->GetDisabled())
						$this->enableColumn($configColumn);
				} else {
					continue;
				}
			} else {
				if ($configColumn->GetDisabled())
					$this->enableColumn($configColumn);
			}

			$this->parseFilteringOperatorsAndValues(
				$filtering, $invalidValueFound, $configColumn, 
				$rawOperatorAndValues, $urlFilterOperators, $multiFiltering
			);

			if (!$multiFiltering) break;
		}

		return $filtering;
	}

	/**
	 * Check and filter all filtering column operators and values.
	 * Remove what is not allowed, unformat values back to system values.
	 * @param  Filtering             $filtering
	 * @param  bool                  $invalidValueFound
	 * @param  ConfigColumn          $configColumn 
	 * @param  OperatorAndValues     $rawOperatorAndValues 
	 * @param  array<string, string> $urlFilterOperators
	 * @param  bool                  $multiFiltering 
	 * @return void
	 */
	protected function parseFilteringOperatorsAndValues(
		array &$filtering,
		&$invalidValueFound,
		IConfigColumn $configColumn,
		array $rawOperatorAndValues,
		array $urlFilterOperators,
		$multiFiltering
	): void {
		$viewHelperName = $configColumn->GetViewHelper();
		/** @var ?\MvcCore\Ext\Controllers\DataGrids\Views\IReverseHelper $viewHelper */
		list($useViewHelper, $viewHelper) = $this->getFilteringViewHelper($viewHelperName);
		
		$columnPropName = $configColumn->GetPropName();
		$columnDbName = $configColumn->GetDbColumnName();
		$columnFilter = $configColumn->GetFilter();
		
		// check if column has allowed parsed operator
		$allowedOperators = is_integer($columnFilter)
			? $this->columnsAllowedOperators[$columnPropName]
			: $this->defaultAllowedOperators;

		$columnAllowNullFilter = (
			is_int($columnFilter) && ($columnFilter & self::FILTER_ALLOW_NULL) != 0
		);

		foreach ($rawOperatorAndValues as $rawOperator => $rawValues) {
			if (!isset($urlFilterOperators[$rawOperator])) continue;

			$urlOperator = $urlFilterOperators[$rawOperator];
			if (!isset($allowedOperators[$urlOperator])) continue;

			$operatorCfg = $allowedOperators[$urlOperator];
			$operator = $operatorCfg->operator;
			$multiple = $operatorCfg->multiple;
			$regex = $operatorCfg->regex;

			if (!$multiple && count($rawValues) > 1)
				$rawValues = [$rawValues[0]];

			$operatorValues = $this->parseFilteringValues(
				$rawValues, $invalidValueFound, $configColumn, $useViewHelper, 
				$viewHelper, $regex, $columnAllowNullFilter
			);

			if (count($operatorValues) === 0) continue;

			// set up filtering value
			if (!isset($filtering[$columnDbName]))
				$filtering[$columnDbName] = [];
			$filtering[$columnDbName][$operator] = $operatorValues;

			if (!$multiFiltering) break;
		}
	}

	/**
	 * Parse filtering values under operator.
	 * Remove what is not allowed, unformat values back to system values.
	 * @param  array<mixed>    $rawValues 
	 * @param  bool            $invalidValueFound
	 * @param  ConfigColumn    $configColumn 
	 * @param  bool            $useViewHelper 
	 * @param  ?IReverseHelper $viewHelper 
	 * @param  ?string         $regex 
	 * @param  bool            $columnAllowNullFilter 
	 * @return array<mixed>
	 */
	protected function parseFilteringValues(
		array $rawValues, 
		&$invalidValueFound, 
		IConfigColumn $configColumn, 
		$useViewHelper, 
		$viewHelper, 
		$regex, 
		$columnAllowNullFilter
	) {
		$operatorValues = [];
		foreach ($rawValues as $rawValue) {
			$rawValue = $this->removeUnknownChars($rawValue);
			if ($rawValue === NULL) continue;

			$rawValue = ltrim($rawValue, '!<=>');
			if ($rawValue === '') continue;

			if ($useViewHelper) {
				$rawValue = call_user_func_array(
					[$viewHelper, 'Unformat'],
					array_merge([$rawValue], $configColumn->GetFormatArgs() ?: [])
				);
				if ($rawValue === NULL) continue;
			}

			$rawValueToCheckType = $rawValue;

			// complete possible operator prefixes from submitted value
			$containsPercentage = $this->CheckFilterValueForSpecialLikeChar($rawValue, '%');
			$containsUnderScore = $this->CheckFilterValueForSpecialLikeChar($rawValue, '_');
			if (($containsPercentage & 1) !== 0)
				$rawValueToCheckType = str_replace('%', '', $rawValueToCheckType);
			if (($containsUnderScore & 1) !== 0)
				$rawValueToCheckType = str_replace('_', '', $rawValueToCheckType);
			
			//  check if operator configuration allowes submitted value form
			if ($regex !== NULL && !preg_match($regex, $rawValue)) continue;
			
			// check value by configured types
			$columnTypes = $configColumn->GetTypes();
			if (strtolower($rawValue) === static::NULL_STRING_VALUE) {
				if ($columnAllowNullFilter) {
					$operatorValues[] = static::NULL_STRING_VALUE;
				} else {
					$invalidValueFound = TRUE;
				}
			} else if (is_array($columnTypes) && count($columnTypes) > 0) {
				$typeValidationSuccess = FALSE;
				foreach ($columnTypes as $columnType) {
					if ($this->validateRawFilterValueByType($rawValueToCheckType, $columnType)) {
						$typeValidationSuccess = TRUE;
						break;
					}
				}
				if (!$typeValidationSuccess) {
					$invalidValueFound = TRUE;
					continue;
				}
				$operatorValues[] = $rawValue;
			} else {
				$operatorValues[] = $rawValue;
			}
		}
		return $operatorValues;
	}

	/**
	 * 
	 * @param  array  $array 
	 * @param  string $sortFn 
	 * @return array
	 */
	protected static function sortRecursive (& $array, $sortFn = 'asort') {
		foreach ($array as & $value)
			if (is_array($value)) 
				static::sortRecursive($value, $sortFn);
		return call_user_func_array($sortFn, [& $array]);
	}
}