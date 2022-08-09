<?php

namespace MvcCore\Ext\Controllers\DataGrids;

use \MvcCore\Ext\Controllers\IDataGrid,
	\MvcCore\Ext\Controllers\DataGrids;

class AgGrid extends \MvcCore\Ext\Controllers\DataGrid {
	
	const GRID_ACTION_SAVE_COLUMNS_WIDTHS = 'save-columns-widths';
	const GRID_ACTION_SAVE_COLUMNS_STATES = 'save-columns-states';
	
	const GRID_TRANS_CONTROL_TEXT			= 'Grid control text: ';
	const GRID_TRANS_PREFIX_COLUMN			= 'Grid column name: ';
	const GRID_TRANS_PREFIX_TITLE			= 'Grid column title: ';
	const GRID_TRANS_PREFIX_URL_COLUMN		= 'Grid column url: ';
	const GRID_TRANS_PREFIX_URL_SECTION		= 'Grid url section: ';
	const GRID_TRANS_PREFIX_URL_OPERATOR	= 'Grid url operator: ';

	protected static ?DataGrids\Configs\UrlSegments $localizedUrlSegmentsCfg = NULL;

	protected string $localization;

	protected ?string $id = NULL;

	protected bool $configDataInDatabase = FALSE;

	protected ?\App\Forms\Common\GridColumns $columnsForm = NULL;

	protected ?array $allConfigColumns = NULL;

	protected $ignoreDisabledColumns = TRUE;

	/** @var \App\Controllers\Admin|\MvcCore\Controller|NULL */
	protected $parentController = NULL;

	public function SetId (?string $id): static {
		$this->id = $id;
		return $this;
	}

	public function GetId (): ?string {
		return $this->id;
	}

	public function GetLocalization (): string {
		return $this->localization;
	}

	public function GetColumnsForm (): \App\Forms\Common\GridColumns {
		if ($this->columnsForm === NULL) $this->initColumnsForm();
		return $this->columnsForm;
	}

	public function GetAllConfigColumns (): array {
		if ($this->allConfigColumns === NULL) 
			$this->allConfigColumns = $this->GetConfigColumns(FALSE)->GetArray();
		return $this->allConfigColumns;
	}

	/**
	 * Create `\MvcCore\Ext\Controllers\DataGrid` instance.
	 * @param  \MvcCore\Controller|NULL $controller
	 * @param  string|int|NULL          $childControllerIndex Automatic name for this instance used in view.
	 * @return void
	 */
	public function __construct (\App\Controllers\Base $controller = NULL, $childControllerIndex = NULL) {
		parent::__construct($controller, $childControllerIndex);

		$this->localization = implode('-', [$this->request->GetLang(), $this->request->GetLocale()]);

		$this->translator = $controller->GetTranslator();
		$this->translate = TRUE;
		
		// add next grid action
		static::$gridActions = array_merge(static::$gridActions, [
			static::GRID_ACTION_SAVE_COLUMNS_WIDTHS	=> 'actionSaveColumnsWidths',
			static::GRID_ACTION_SAVE_COLUMNS_STATES	=> 'actionSaveColumnsStates',
		]);

		// setup localized url segments
		$this->SetConfigUrlSegments(self::getLocalizedUrlSegments($this->translator));
		
		// customize grid
		$this
			->SetSortingMode(
				//IDataGrid::SORT_DISABLED
				IDataGrid::SORT_MULTIPLE_COLUMNS
			)
			->SetFilteringMode(
				//IDataGrid::FILTER_DISABLED
				IDataGrid::FILTER_MULTIPLE_COLUMNS |
				IDataGrid::FILTER_ALLOW_RANGES |
				IDataGrid::FILTER_ALLOW_LIKE_ANYWHERE
			)
			->SetItemsPerPage(100)
			->SetCountScales([100,1000,0])
			->SetAllowedCustomUrlCountScale(TRUE);

		// customize layout
		$this->SetConfigRendering(
			(new DataGrids\Configs\Rendering)
				->SetType(IDataGrid::TYPE_TABLE)
				->SetRenderTableHeadFiltering(TRUE)
				->SetTemplateContent('admins/common/grid')
				->SetTemplateTableBody('admins/common/grids/table-body')
				->SetTemplateControlPaging('admins/common/grids/paging')
				->SetTemplateControlCountScales('admins/common/grids/count-scales')
				->AddCssClassesControlsWrapper('grid-controls-panel')
				->AddCssClassesControlCountScales('theme')
				->AddCssClassesControlPaging('theme')
				->SetRenderControlCountScales(IDataGrid::CONTROL_DISPLAY_ALWAYS)
				->SetRenderControlPaging(IDataGrid::CONTROL_DISPLAY_IF_NECESSARY)
				->SetRenderControlPagingFirstAndLast(TRUE)
		);
	}
	
	protected static function getLocalizedUrlSegments (\MvcCore\Ext\ITranslator $translator): DataGrids\Configs\UrlSegments {
		if (self::$localizedUrlSegmentsCfg === NULL) {
			$prefixUrlOper = static::GRID_TRANS_PREFIX_URL_OPERATOR;
			$prefixUrlSect = static::GRID_TRANS_PREFIX_URL_SECTION;
			$operators = [
				'=',	'!=',
				'LIKE',	'NOT LIKE',
				'<',	'>',
				'<=',	'>=',
			];
			$operatorsTranslated = [];
			foreach ($operators as $operator) 
				$operatorsTranslated[$operator] = $translator->Translate(
					$prefixUrlOper . $operator
				);
			self::$localizedUrlSegmentsCfg = (new DataGrids\Configs\UrlSegments)
				->SetUrlPrefixFilter($translator->Translate($prefixUrlSect . 'filter'))
				->SetUrlPrefixSort($translator->Translate($prefixUrlSect . 'order'))
				->SetUrlSuffixSortAsc('a')
				->SetUrlSuffixSortDesc('z')
				->SetUrlFilterOperators($operatorsTranslated);
		}
		return self::$localizedUrlSegmentsCfg;
	}

	public function Init (): void {
		if ($this->dispatchState > \MvcCore\IController::DISPATCH_STATE_CREATED) return;

		if ($this->GetUser() === NULL) return;
		
		$this->GetConfigUrlSegments();
		$this->GetConfigColumns(FALSE);
		
		// merge PHP code columns configuration with possible database columns configuration and unset all disabled
		$dbColumnsConfiguration = $this->loadColumnsConfiguration($this->id, $this->GetUser()->GetId());
		foreach ($this->configColumns as $configColumn) {
			$propName = $configColumn->GetPropName();
			if (isset($dbColumnsConfiguration[$propName])) {
				if (!$dbColumnsConfiguration[$propName]->Disabled) {
					$configColumn->SetDisabled(FALSE);
				} else {
					$configColumn->SetDisabled(TRUE);
				}
				if (isset($dbColumnsConfiguration[$propName]->Width))
					$configColumn->SetWidth($dbColumnsConfiguration[$propName]->Width);
			}
		}
		
		if ($this->limit === 0 || $this->limit > 1000) {
			// set parent ctrl rendering mode to continuous without output buffering
			$this->parentController->SetRenderMode(\MvcCore\IView::RENDER_WITHOUT_OB_CONTINUOUSLY);
		}
		parent::Init();
	}
	
	public function PreDispatch (): void {
		if ($this->dispatchState <= \MvcCore\IController::DISPATCH_STATE_INITIALIZED) 
			$this->Init();
		if ($this->dispatchState >= \MvcCore\IController::DISPATCH_STATE_PRE_DISPATCHED) return;
		
		$activeConfigColumns = $this->GetConfigColumns(TRUE)->GetArray();
		
		parent::PreDispatch();
		
		if (!$this->viewEnabled) return;
		

		// if there is breadcrumbs navigation and grid is table type,
		// add `small` css class to beadcrumbs instance:
		if (
			$this->parentController instanceof \App\Controllers\Admin && 
			array_search('grid-type-table', $this->cssClasses) !== FALSE
		) {
			$this->parentController->GetNavigationBreadCrumbs()->AddCssClass('small');
		}

		
		// prepare columns configuration for js
		$jsColumnsConfigs = [];
		$index = 0;
		foreach ($activeConfigColumns as $configColumn) {
			$rawWidth = $configColumn->GetWidth();
			$width = is_string($rawWidth) && is_numeric($rawWidth)
				? intval($rawWidth)
				: $rawWidth;
			$propName = $configColumn->GetPropName();
			$jsColumnsConfigs[$propName] = [
				'Index'		=> $index++,
				'Width'		=> $width,
				'Disabled'	=> $configColumn->GetDisabled() ? TRUE : FALSE,
			];
		}
		$this->view->jsColumnsConfigs = $jsColumnsConfigs;
		
		$this->AddCssClasses($this->id);
		
		// customize head filters rendering
		$tableHeadFilterForm = $this->GetTableHeadFilterForm();

		$filteringTitleDescLines = [
			"Special search characters:",
			";"		=> "semicolon separate multiple values,",
			"_"		=> "search wildcard for any single character (only texts and dates),",
			"%"		=> "search wildcard for zero or more characters (only texts and dates),",
			"!"		=> "exclamation mark at the beginning to search records not equal as value,",
			">"		=> "character at the beginning to search for greater records,",
			"<"		=> "character at the beginning to search for less records,",
			">="	=> "character at the beginning to search for greater than or equal records,",
			"<="	=> "character at the beginning to find less or equal records.",
			"The `null` keyword selects rows that have no value in the column."
		];
		$filteringTitleDescItems = [];
		foreach ($filteringTitleDescLines as $index => $filteringTitleDescLine)
			$filteringTitleDescItems[] = is_numeric($index)
				? $this->translator->Translate($filteringTitleDescLine)
				: $index . "\t" . $this->translator->Translate($filteringTitleDescLine);
		/** @var \MvcCore\Ext\Forms\Fields\Text[] $filteringTextFields */
		$filteringTextFields = $tableHeadFilterForm->GetFieldsByType('text');
		$filteringTitleDesc = implode("\n", $filteringTitleDescItems);
		foreach ($filteringTextFields as $filteringTextField) {
			if (str_starts_with($filteringTextField->GetName(), 'value')) {
				$filteringTextField
					->SetTitle($filteringTitleDesc)
					->SetPlaceHolder($this->translator->Translate(
						self::GRID_TRANS_CONTROL_TEXT . 'Enter to search'
					) . '&hellip;');
			}
		}
	}

	protected function actionSaveColumnsWidths (): void {
		$idGrid = $this->GetParam('idGrid', '-_a-zA-Z0-9');
		if ($idGrid !== $this->id) return;

		$rawColumnsConfigsParam = $this->GetParam('columnsConfigs', FALSE);
		$columnsConfigsParam = NULL;
		try {
			$columnsConfigsParam = (array) \MvcCore\Tool::JsonDecode($rawColumnsConfigsParam);
		} catch (\Exception $e) {
			throw new \Exception("Malformed columns configurations data.");
		}
		
		$success = FALSE;
		if (is_array($columnsConfigsParam) && count($columnsConfigsParam) > 0) {
			$colsConfigsToSave = [];
			foreach ($this->configColumns as /*$urlName =>*/ $columnConfig) {
				$propName = $columnConfig->GetPropName();
				if (isset($columnsConfigsParam[$propName])) {
					$columnConfigParam = $columnsConfigsParam[$propName];
					$colConfigsToSave = (object) [
						'Index'		=> $columnConfig->GetColumnIndex(),
						'Width'		=> $columnConfig->GetWidth(),
						'Disabled'	=> $columnConfig->GetDisabled(),
					];
					if (isset($columnConfigParam->Index) && is_int($columnConfigParam->Index)) 
						$colConfigsToSave->Index = $columnConfigParam->Index;
					if (isset($columnConfigParam->Width) && is_numeric($columnConfigParam->Width)) 
						$colConfigsToSave->Width = intval($columnConfigParam->Width);
					if (isset($columnConfigParam->Disabled) && is_bool($columnConfigParam->Disabled)) 
						$colConfigsToSave->Disabled = $columnConfigParam->Disabled;
					$colsConfigsToSave[$propName] = $colConfigsToSave;
				}
			}
			$success = $this->storeColumnsConfiguration($idGrid, $colsConfigsToSave);
		}
		
		$this->JsonResponse(['success' => $success]);
	}

	protected function actionSaveColumnsStates (): void {
		$form = $this->GetColumnsForm();
		[$result, $data/*, $errors*/] = $form->Submit();
		if ($result) {
			$enabledColsNames = $data['columns'];
			$colsConfigsToSave = [];
			$allDbColumns = [];
			$enabledDbColumns = [];
			foreach ($this->GetAllConfigColumns() as $columnConfig) {
				$dbColumnName = $columnConfig->GetDbColumnName();
				$propName = $columnConfig->GetPropName();
				$enabled = in_array($propName, $enabledColsNames, TRUE);
				$colsConfigsToSave[$propName] = (object) [
					'Index'		=> $columnConfig->GetColumnIndex(),
					'Width'		=> $columnConfig->GetWidth(),
					'Disabled'	=> !$enabled,
				];
				$allDbColumns[$dbColumnName] = $propName;
				if ($enabled)
					$enabledDbColumns[$dbColumnName] = $propName;
			}
			$filtering = [];
			$sorting = [];
			if ($this->ignoreDisabledColumns) {
				foreach ($this->filtering as $dbColumnName => $columnFiltering)
					$filtering[$allDbColumns[$dbColumnName]] = $columnFiltering;
				foreach ($this->sorting as $dbColumnName => $columnSorting)
					$sorting[$allDbColumns[$dbColumnName]] = $columnSorting;
			} else {
				foreach ($this->filtering as $dbColumnName => $columnFiltering)
					if (isset($enabledDbColumns[$dbColumnName]))
						$filtering[$enabledDbColumns[$dbColumnName]] = $columnFiltering;
				foreach ($this->sorting as $dbColumnName => $columnSorting)
					if (isset($enabledDbColumns[$dbColumnName]))
						$sorting[$enabledDbColumns[$dbColumnName]] = $columnSorting;
			}
			$this->storeColumnsConfiguration($this->GetId(), $colsConfigsToSave);
			$redirectUrl = rawurldecode($this->Url(null, [
				static::URL_PARAM_GRID => [
					static::URL_PARAM_PAGE		=> $this->page,
					static::URL_PARAM_COUNT		=> $this->itemsPerPage,
					static::URL_PARAM_SORT		=> $sorting,
					static::URL_PARAM_FILTER	=> $filtering,
					static::URL_PARAM_CLEAR		=> TRUE,
				]
			]));
		} else {
			$redirectUrl = rawurldecode($this->GridUrl([
				static::URL_PARAM_ACTION => NULL
			]));
		}
		self::Redirect($redirectUrl, \MvcCore\IResponse::SEE_OTHER);
	}

	protected function storeColumnsConfiguration (string $idGrid, array $columnsConfiguration): bool {
		$colsConfigsToSaveJson = \MvcCore\Tool::JsonEncode($columnsConfiguration);
		$sql = $this->configDataInDatabase
			? [
				"UPDATE [core].[grid_configs]		",
				"SET [data] = :data					",
				"WHERE	[id_user] = :id_user AND	",
				"		[id_grid] = :id_grid;		",
			] : [
				"INSERT INTO dbo.[grid_configs] (	",
				"	[id_user], [id_grid], [data]	",
				") VALUES (							",
				"	:id_user, :id_grid, :data		",
				");									",
			];
		return \App\Models\Base::GetConnection()
			->Prepare($sql)
			->Execute([
				':data'		=> $colsConfigsToSaveJson,
				':id_user'	=> $this->user->GetId(),
				':id_grid'	=> $idGrid,
			])
			->GetExecResult();
	}

	protected function loadColumnsConfiguration (?string $idGrid, int $idUser): array {
		$dbColumnsConfiguration = [];
		if ($idGrid === NULL) 
			throw new \Exception("Grid id property not configured.");
		$rawDbColumnsConfiguration = \App\Models\Base::GetConnection()
			->Prepare([
				"SELECT gc.[data]						",
				"FROM [core].[grids_configs] gc			",
				"WHERE	gc.[id_org_user] = :id_user AND	",
				"		gc.[id_grid] = :id_grid;		",
			])
			->FetchOne([
				':id_user'	=> $idUser,
				':id_grid'	=> $idGrid,
			])
			->ToScalar('data', 'string');
		if ($rawDbColumnsConfiguration !== NULL) {
			$this->configDataInDatabase = TRUE;
			try {
				$dbColumnsConfiguration = (array) \MvcCore\Tool::JsonDecode($rawDbColumnsConfiguration);
			} catch (\Exception $e) {
			}
		}
		return $dbColumnsConfiguration;
	}

	protected function initColumnsForm (): void {
		$submitUrl = rawurldecode($this->GridUrl([static::URL_PARAM_ACTION => static::GRID_ACTION_SAVE_COLUMNS_STATES]));
		$form = (new \App\Forms\Common\GridColumns($this))
			->SetAction($submitUrl);
		$this->columnsForm = $form;
	}

	/**
	 * Translate if necessary:
	 * - controls texts
	 */
	protected function preDispatchTranslations (): void {
		if (!$this->translate) return;
		$prefix = static::GRID_TRANS_CONTROL_TEXT;
		foreach ($this->controlsTexts as $key => $controlText)
			$this->controlsTexts[$key] = $this->translator->Translate(
				$prefix . $controlText, ['{0}']
			);
	}

}