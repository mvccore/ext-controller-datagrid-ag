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
		static::$gridActions = array_merge(static::$gridActions, [
			static::GRID_ACTION_DATA	=> 'ActionData',
		]);
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
		$controller->AddChildController($this, $childControllerIndex);
	}

	/**
	 * @inheritDocs
	 * @return void
	 */
	public function Init () {
		if ($this->dispatchState > \MvcCore\IController::DISPATCH_STATE_CREATED) return;
		
		$this->initClientPageMode();

		$this->GetConfigRendering();
		
		/** @var \MvcCore\Controller $parentOfParentClass */
		$parentOfParentClass = get_parent_class(get_parent_class(__CLASS__));
		$parentOfParentClass::Init();
		
		$this->GetConfigUrlSegments();
		$this->initTranslations();
		$this->GetConfigColumns(FALSE);
		$this->GetRoute();
		$this->GetUrlParams();
		
		$this->initGridAction();
		if (!$this->initUrlParams()) return; // redirect inside

		$this->initOffsetLimit();
		
		$this->initItemsPerPageByRoute();
		if (!$this->initUrlBuilding()) return; // redirect inside
		$this->initOperators();
		
		$this->initSorting();
		if (!$this->initFiltering()) return; // redirect inside
		
		call_user_func([$this, $this->gridAction]);
	}

	/**
	 * Initialize client row model if not specified.
	 * @return void
	 */
	protected function initClientPageMode () {
		if ($this->clientPageMode !== NULL) return;
		$this->clientPageMode = $this->itemsPerPage === 0
			? IConstants::CLIENT_PAGE_MODE_SINGLE
			: IConstants::CLIENT_PAGE_MODE_MULTI;
	}
	
	/**
	 * Complete internal action method name.
	 * @return void
	 */
	protected function initGridAction () {
		$gridActionParam = $this->request->GetParam(static::URL_PARAM_ACTION, '-_a-zA-Z', static::$gridActionDefaultKey, 'string');
		if (!isset(static::$gridActions[$gridActionParam])) $gridActionParam = static::$gridActionDefaultKey;
		$this->gridAction = static::$gridActions[$gridActionParam];
		$this->initDataUrlAndAjaxDataRequest($gridActionParam);
	}

	/**
	 * @param  string $gridActionParam 
	 * @return void
	 */
	protected function initDataUrlAndAjaxDataRequest ($gridActionParam) {
		if ($this->clientPageMode !== IConstants::CLIENT_PAGE_MODE_SINGLE) return;
		// absolutize data url if any:
		if ($this->dataUrl === NULL) {
			$this->ajaxDataRequest = $gridActionParam === static::GRID_ACTION_DATA;
		} else {
			if (!(mb_strpos($this->dataUrl, 'http://') === 0 || mb_strpos($this->dataUrl, 'https://') === 0))
				$this->dataUrl = $this->request->GetDomainUrl() . $this->dataUrl;
			$dataUrlParsed = (object) \MvcCore\Tool::ParseUrl($this->dataUrl);
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
						$reqParams[$this->ajaxParamsNames[self::AJAX_PARAM_FILTERING]]
					);
					if (($this->dataRequestMethod & static::AJAX_DATA_REQUEST_METHOD_POST) != 0)
						unset($reqParams[$this->ajaxParamsNames[self::AJAX_PARAM_CALLBACK]]);
					if (count($reqParams) > 0) {
						static::sortRecursive($reqParams);
						$reqParamsCount = 0;
						// check if all data url params are contained and with the same values as in current request:
						foreach ($dataUrlParsedParams as $dataUrlParsedParamName => $dataUrlParsedParamValues) {
							if (
								isset($reqParams[$dataUrlParsedParamName]) &&
								serialize($reqParams[$dataUrlParsedParamName]) === serialize($dataUrlParsedParamValues)
							) $reqParamsCount++;
						}
						$this->ajaxDataRequest = $dataUrlParsedParamsCount === $reqParamsCount;
					}
				}
			}
		}
	}

	/**
	 * If client row model is single page:
	 *    check if page is 1 or redirect.
	 * If client row model is multiple pages:
	 *    set up default page if `NULL` 
	 *    or redirect if page is zero.
	 * @return bool
	 */
	/*protected function initUrlParamsPage () {
		if ($this->clientPageMode === IConstants::CLIENT_PAGE_MODE_SINGLE) {
			if (
				isset($this->urlParams[static::URL_PARAM_PAGE]) &&
				$this->urlParams[static::URL_PARAM_PAGE] !== 1
			) {
				// redirect to proper page number:
				$redirectUrl = $this->GridUrl([
					static::URL_PARAM_PAGE	=> 1,
				]);
				// ** @var \MvcCore\Controller $this * /
				$this::Redirect(
					$redirectUrl, 
					\MvcCore\IResponse::SEE_OTHER, 
					'Grid page is not 1.'
				);
				return FALSE;
			}
			$this->urlParams[static::URL_PARAM_PAGE] = 1;
			return TRUE;
		} else {
			return parent::initUrlParamsPage();
		}
	}*/
	
	/**
	 * If client row model is single page:
	 *    clear count scales array to `[0]` or thrown 
	 *    an exception if count scales has been customized.
	 * If client row model is for multiple pages:
	 *    set up items per page configured from script 
	 *    into count scales if it is not there.
	 * @return void
	 */
	protected function initUrlParamsCountScales () {
		if ($this->clientPageMode === IConstants::CLIENT_PAGE_MODE_SINGLE) {
			if (
				!$this->countScalesCustomized || (
					$this->countScalesCustomized &&
					count($this->countScales) === 1 && 
					$this->countScales[0] === 0
				)
			) {
				$this->countScales = [0];
			} else {
				throw new \Exception(
					"[".get_class($this)."] Datagrid with client row model for "
					."single page data loading needs count scales configuration with `[0]` value.", 
				);
			}
		} else {
			parent::initUrlParamsCountScales();
		}
	}

	/**
	 * If client row model is single page:
	 *    set up zero count if null or 
	 *    check if count has zero.
	 * If client row model is for multiple pages:
	 *    set up default count if `NULL` or 
	 *    redirect if count has not allowed size.
	 * @return bool
	 */
	protected function initUrlParamsCount () {
		if ($this->clientPageMode === IConstants::CLIENT_PAGE_MODE_SINGLE) {
			if ($this->ajaxDataRequest)
				return TRUE;
			if (
				isset($this->urlParams[static::URL_PARAM_COUNT]) &&
				$this->urlParams[static::URL_PARAM_COUNT] !== 0
			) {
				// redirect to allowed max count:
				$redirectUrl = $this->GridUrl([
					static::URL_PARAM_PAGE	=> $this->urlParams[static::URL_PARAM_PAGE],
					static::URL_PARAM_COUNT	=> 0,
				]);
				/** @var \MvcCore\Controller $this */
				$this::Redirect(
					$redirectUrl, 
					\MvcCore\IResponse::SEE_OTHER, 
					'Grid count is not all rows.'
				);
				return FALSE;
			}
			$this->urlParams[static::URL_PARAM_COUNT] = 0;
			return TRUE;
		} else {
			return parent::initUrlParamsCount();
		}
	}

	/**
	 * If client row model is single page:
	 *    set up items per page to zero or thrown 
	 *    an exception if items per page has been customized.
	 * If client row model is for multiple pages:
	 *    check if count scale from url is allowed or
	 *    redirect to allowed count scale if necessary.
	 * @return bool
	 */
	protected function initUrlParamsItemsPerPage () {
		if ($this->clientPageMode === IConstants::CLIENT_PAGE_MODE_SINGLE) {
			if ($this->ajaxDataRequest)
				return TRUE;
			if (
				!$this->itemsPerPageCustomized || (
					$this->itemsPerPageCustomized &&
					$this->itemsPerPage === 0
				)
			) {
				$this->itemsPerPage = 0;
			} else {
				throw new \Exception(
					"[".get_class($this)."] Datagrid with client row model for "
					."single page data loading needs items per page configuration with `0` value.", 
				);
			}
			return TRUE;
		} else {
			return parent::initUrlParamsItemsPerPage();
		}
	}

	/**
	 * If client row model is single page:
	 *    Do nothing, problem is handled by method `$this->initUrlParamsPage();`
	 * If client row model is for multiple pages:
	 *    check if page is not larger than 1 if count is unlimited.
	 * @return bool
	 */
	protected function initUrlParamsPageAndCount () {
		if ($this->clientPageMode === IConstants::CLIENT_PAGE_MODE_SINGLE) {
			$this->page = $this->urlParams[static::URL_PARAM_PAGE];
			return TRUE;
		} else {
			return parent::initUrlParamsPageAndCount();
		}
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
			if ($this->ajaxDataRequest) {
				$this->offset = $this->GetParam($this->ajaxParamsNames[self::AJAX_PARAM_OFFSET], '0-9', 0, 'int');
				$this->limit = $this->GetParam($this->ajaxParamsNames[self::AJAX_PARAM_LIMIT], '0-9', NULL, 'int');
			} else {
				$this->offset = 0;
				$this->limit = $this->clientRowBuffer * 2;
			}
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
			try {
				$rawSortingItems = \MvcCore\Tool::JsonDecode($rawSortingItemsStr, JSON_OBJECT_AS_ARRAY);
			} catch (\Throwable $e) {
				$rawSortingItems = NULL;
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
				if (!$this->ignoreDisabledColumns && $configColumn->GetDisabled()) continue;
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
		if ($this->ajaxDataRequest) {
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
				if (!isset($filteringColumns[$columnPropName])) continue;
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
						if ($useViewHelper) {
							$rawValue = call_user_func_array(
								[$viewHelper, 'Unformat'],
								array_merge([$rawValue], $configColumn->GetFormat() ?: [])
							);
							if ($rawValue === NULL) continue;
						}
						$rawValueToCheckType = $rawValue;
						// complete possible operator prefixes from submitted value
						$containsPercentage = $this->checkFilterFormValueForSpecialLikeChar($rawValue, '%');
						$containsUnderScore = $this->checkFilterFormValueForSpecialLikeChar($rawValue, '_');
						if (($containsPercentage & 1) !== 0) 
							$rawValueToCheckType = str_replace('%', '', $rawValueToCheckType);
						if (($containsUnderScore & 1) !== 0) 
							$rawValueToCheckType = str_replace('_', '', $rawValueToCheckType);
						//  check if operator configuration allowes submitted value form
						if ($regex !== NULL && !preg_match($regex, $rawValue)) continue;
						// check value by configured types
						if (strtolower($rawValue) === 'null') {
							if ($columnAllowNullFilter)
								$operatorValues[] = 'null';
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
		} else {
			return parent::initFiltering();
		}
	}


	/**
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