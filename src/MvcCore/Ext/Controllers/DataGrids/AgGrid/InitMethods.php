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

use \MvcCore\Ext\Controllers\DataGrids\AgGrid\IConstants;

/**
 * @mixin \MvcCore\Ext\Controllers\DataGrids\AgGrid
 */
trait InitMethods {

	/**
	 * Create `\MvcCore\Ext\Controllers\DataGrids\AgGrid` instance.
	 * @param  \MvcCore\Controller|NULL $controller
	 * @param  string|int|NULL          $childControllerIndex Automatic name for this instance used in view.
	 * @return void
	 */
	public function __construct ($controller = NULL, $childControllerIndex = NULL) {
		/** @var \MvcCore\Controller $controller */
		if (is_string($this->countScales)) 
			$this->countScales = array_map('intval', explode(',', (string) $this->countScales));
		if ($controller === NULL) {
			$controller = \MvcCore\Ext\Form::GetCallerControllerInstance();
			if ($controller === NULL) 
				$controller = \MvcCore\Application::GetInstance()->GetController();
			if ($controller === NULL) throw new \InvalidArgumentException(
				'['.get_class($this).'] There was not possible to determinate caller controller, '
				.'where is datagrid instance created. Provide `$controller` instance explicitly '
				.'by first `\MvcCore\Ext\Controllers\DataGrid::__construct($controller);` argument.'
			);
		}
		$backtraceItems = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 2);
		if (count($backtraceItems) === 2) {
			$creationPlace = array_merge(['controller' => get_class($controller)], $backtraceItems[1]);
			$creationPlaceStr = function_exists('igbinary_serialize')
				? igbinary_serialize($creationPlace)
				: serialize($creationPlace);
			$this->creationPlaceImprint = hash('crc32b', $creationPlaceStr);
		}
		$controller->AddChildController($this, $childControllerIndex);
	}

	/**
	 * @inheritDoc
	 * @return void
	 */
	public function Init () {
		if ($this->dispatchState >= self::DISPATCH_STATE_INITIALIZED) return;

		$this->GetConfigRendering();
		
		$this->initConfigRenderingByClientPageMode();
		
		\MvcCore\Controller::Init();
		
		$this->initModelClasses();
		$this->GetConfigUrlSegments();
		$this->initTranslations();
		$this->GetConfigColumns(FALSE);

		$this->initPersistentColumnsData();

		$this->initGridAction();
		
		$this->GetRoute();
		$this->GetUrlParams();
		
		$this->initQsParamsSeparator();
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
		
		call_user_func([$this, $this->gridAction]);
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
		if ($this->clientPageMode === IConstants::CLIENT_PAGE_MODE_SINGLE) {
			$this->configRendering
				->SetRenderControlSorting(IConstants::CONTROL_DISPLAY_NEVER)
				->SetRenderControlCountScales(IConstants::CONTROL_DISPLAY_NEVER)
				->SetRenderControlPaging(IConstants::CONTROL_DISPLAY_NEVER)
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
	protected function initGridAction () {
		$gridActionParam = $this->request->GetParam(static::URL_PARAM_ACTION, '-_a-zA-Z', static::$gridActionDefaultKey, 'string');
		if (!isset(static::$gridActions[$gridActionParam])) 
			$gridActionParam = static::$gridActionDefaultKey;
		$this->gridAction = static::$gridActions[$gridActionParam];
		$this->initDataUrlAndAjaxDataRequest($gridActionParam);
	}

	/**
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
			$dataUrlParsed = (object) \MvcCore\Tool::ParseUrl($this->urlData);
			$this->ajaxDataRequest = (
				$dataUrlParsed->path === $this->request->GetPath() &&
				$dataUrlParsed->scheme . ':' === $this->request->GetScheme() &&
				$dataUrlParsed->host === $this->request->GetHostName()
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
						\MvcCore\IRequest::PARAM_TYPE_URL_REWRITE | \MvcCore\IRequest::PARAM_TYPE_QUERY_STRING
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
			$this->count > IConstants::CLIENT_PAGE_MODE_MULTI_MAX_ROWS || 
			$this->itemsPerPage > IConstants::CLIENT_PAGE_MODE_MULTI_MAX_ROWS
		) {
			$this->clientPageMode = IConstants::CLIENT_PAGE_MODE_SINGLE;
		} else {
			$this->clientPageMode = IConstants::CLIENT_PAGE_MODE_MULTI;
		}
	}
	
	/**
	 * @return void
	 */
	protected function initRequestBlockSize () {
		if ($this->clientRequestBlockSize !== NULL) return;
		$this->clientRequestBlockSize = $this->clientPageMode === IConstants::CLIENT_PAGE_MODE_MULTI
			? $this->itemsPerPage
			: IConstants::CLIENT_JS_REQUEST_BLOCK_SIZE;
	}
	
	/**
	 * @return void
	 */
	protected function initClientRowBuffer () {
		if ($this->clientRowBuffer !== NULL) return;
		$this->clientRowBuffer = $this->clientPageMode === IConstants::CLIENT_PAGE_MODE_MULTI
			? IConstants::CLIENT_JS_BUFFER_PAGE_MODE_MULTI
			: IConstants::CLIENT_JS_BUFFER_PAGE_MODE_SINGLE;
	}

	/**
	 * @return void
	 */
	protected function initClientCache () {
		if ($this->clientCache) {
			if ($this->clientMaxRowsInCache === NULL)
				$this->clientMaxRowsInCache = IConstants::CLIENT_JS_MAX_ROWS_IN_CACHE;
		} else {
			$this->clientMaxRowsInCache = 0;
		}
	}

	/**
	 * Initialize internal property `$this->queryStringParamsSepatator`
	 * to be able to build internal grid URL strings.
	 * Check valid values from URL for page and items par page.
	 * If some value is invalid, redirect to default value.
	 * @return bool
	 */
	protected function initUrlParams () {
		if ($this->clientPageMode === IConstants::CLIENT_PAGE_MODE_SINGLE) {
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
		if ($this->clientPageMode === IConstants::CLIENT_PAGE_MODE_SINGLE) {
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
						\MvcCore\IResponse::SEE_OTHER, 
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
			implode('-', [IConstants::CLIENT_PAGE_MODE_MULTI, IConstants::CLIENT_PAGE_MODE_SINGLE]), 
			IConstants::CLIENT_PAGE_MODE_MULTI, 
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
		if ($this->clientPageMode === IConstants::CLIENT_PAGE_MODE_SINGLE) {
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
			$defaultAction = $this->gridAction === static::$gridActions[static::$gridActionDefaultKey];
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
	protected function initSorting () {
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
	}
	
	/**
	 * Parse filtering from URL as array of databse column names as keys 
	 * and values as array of raw filtering values.
	 * @return bool
	 */
	protected function initFiltering () {
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