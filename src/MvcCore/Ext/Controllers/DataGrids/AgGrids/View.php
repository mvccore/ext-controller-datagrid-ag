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

namespace MvcCore\Ext\Controllers\DataGrids\AgGrids;

use \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\IRendering as RenderingConsts;

class View extends \MvcCore\Ext\Controllers\DataGrids\View {

	const ASSETS_BUNDLE_DEFAULT_NAME_JS = 'agGrid';

	const ASSETS_BUNDLE_DEFAULT_NAME_CSS = 'agGrid';
	
	/**
	 * Grid view types to package view scripts paths.
	 * @var array<int,string>
	 */
	protected static $viewTypes2AppPaths= [
		self::VIEW_TYPE_GRID_CONTENT	=> '~/MvcCore/Ext/Controllers/DataGrids/AgGrids/Views/Content',
		self::VIEW_TYPE_GRID_CONTROL	=> '~/MvcCore/Ext/Controllers/DataGrids/AgGrids/Views/Controls',
		//self::VIEW_TYPE_GRID_FORM		=> '~/MvcCore/Ext/Controllers/DataGrids/AgGrids/Views/Form',
	];

	/**
	 * AgGrid assets directory by AgGrid main class location, initialized ondemand.
	 * @var string|NULL
	 */
	protected static $gridAssetsDir = NULL;

	/**
	 * Render datagrid refresh control.
	 * @return string
	 */
	public function RenderGridControlRefresh () {
		if (!$this->configRendering->GetRenderControlRefresh()) 
			return '';
		return $this->renderGridTemplate(
			self::VIEW_TYPE_GRID_CONTROL, 
			$this->configRendering->GetTemplateControlRefresh(), 
			'refresh'
		);
	}

	/**
	 * Get JS assets group for MvcCore Assets view helper to render JS assets in datagrid PreDispatch() method.
	 * @return \stdClass[]
	 */
	public function GetGridAssetsGroupsJs () {
		$gridAssetsDir = static::getAssetsDir();
		$mvcCoreAgGridAssetsDir = $gridAssetsDir . '/build/MvcCore/Ext/Controllers/DataGrids/';
		
		$minimalizedCode = (object) [
			'async'		=> FALSE,
			'defer'		=> FALSE,
			'notMin'	=> TRUE,
			'paths'		=> [
				$gridAssetsDir . "/ag-grid-community/ag-grid-community.min.noStyle.js",
				//$gridAssetsDir . "/ag-grid-community/ag-grid-community.noStyle.js", // dev
				$gridAssetsDir . "/moment/moment.min.js",
				$gridAssetsDir . "/ajax-min/ajax.min.js",
			],
		];
		$notMinimalizedCode = (object) [
			'async'		=> FALSE,
			'defer'		=> FALSE,
			'notMin'	=> FALSE,
			'paths'		=> [
				$mvcCoreAgGridAssetsDir . "AgGrids/Tools/MD5.js",

				$mvcCoreAgGridAssetsDir . "AgGrids/Enums/AjaxDataRequestMethod.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Enums/AjaxParamName.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Enums/ClientModelType.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Enums/ClientPageMode.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Enums/ControlText.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Enums/FilterControlType.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Enums/FilterButton.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Enums/FilteringMode.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Enums/Operator.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Enums/RowSelection.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Enums/RowSelection.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Enums/SortingMode.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Enums/ServerType.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Types/GridColumn.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Types/ViewHelper.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Types/Sorting.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Tools/Translator.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/Events/Base.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/Events/ColumnMove.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/Events/ColumnResize.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/Events/GridSizeChange.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/Events/GridBodyScroll.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/Events/ModelUpdate.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/Events/RowDataUpdate.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/Events/HistoryChange.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/Events/ColumnsVisibilityChange.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/Events/CountScaleChange.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/Events/FilterChange.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/Events/PageChange.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/Events/SelectionChange.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/Events/SortChange.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/Base.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/EventsManager.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/SinglePageMode.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/MultiplePagesMode.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/DataSource.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/DataSources/Cache.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/DataSources/MultiplePagesMode.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/DataSources/SinglePageMode.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Options/AgBases.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Columns/Manager.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Columns/ViewHelper.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Columns/SortHeader.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Columns/FilterHeader.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Columns/FilterMenu.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Columns/FilterMenus/Float.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Columns/FilterMenus/Int.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Columns/FilterMenus/Money.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Columns/FilterMenus/DateTime.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Columns/FilterMenus/Date.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Columns/FilterMenus/Time.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Columns/FilterOperatorsCfg.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Columns/VisibilityMenu.js",
				$mvcCoreAgGridAssetsDir . "AgGrids/Options/Manager.js",

				$mvcCoreAgGridAssetsDir . "AgGrids/Tools/Helpers.js",

				$mvcCoreAgGridAssetsDir . "AgGrid.js",
			],
		];

		// add localization for AgGrid library:
		$dateTimeLangAndLocaleArr = $this->controller->GetConfigLocales()->GetLocale(FALSE);
		$dateTimeLangAndLocaleStr = strtolower(implode('-', $dateTimeLangAndLocaleArr));
		$dateTimeLangAndLocaleFile = $gridAssetsDir . "/ag-grid-locale/{$dateTimeLangAndLocaleStr}.js";
		if (file_exists($dateTimeLangAndLocaleFile)) {
			array_unshift($notMinimalizedCode->paths, $dateTimeLangAndLocaleFile);
		} else {
			$dateTimeLang = strtolower($dateTimeLangAndLocaleArr[0]);
			$dateTimeLangFile = $gridAssetsDir . "/ag-grid-locale/{$dateTimeLang}.js";
			if (file_exists($dateTimeLangFile)) {
				array_unshift($notMinimalizedCode->paths, $dateTimeLangFile);
			} else {
				$dateTimeLangFile = $gridAssetsDir . "/ag-grid-locale/en-us.js";
				array_unshift($notMinimalizedCode->paths, $dateTimeLangFile);
			}
		}

		// add localization for Moment library:
		$dateTimeLangAndLocaleArr = $this->controller->GetConfigLocales()->GetLocaleDateTime(FALSE);
		$dateTimeLangAndLocaleStr = strtolower(implode('-', $dateTimeLangAndLocaleArr));
		$dateTimeLangAndLocaleFile = $gridAssetsDir . "/moment/locale/{$dateTimeLangAndLocaleStr}.js";
		if (file_exists($dateTimeLangAndLocaleFile)) {
			array_unshift($notMinimalizedCode->paths, $dateTimeLangAndLocaleFile);
		} else {
			$dateTimeLang = strtolower($dateTimeLangAndLocaleArr[0]);
			$dateTimeLangFile = $gridAssetsDir . "/moment/locale/{$dateTimeLang}.js";
			if (file_exists($dateTimeLangFile))
				array_unshift($notMinimalizedCode->paths, $dateTimeLangFile);
		}

		return [
			$minimalizedCode,
			$notMinimalizedCode,
		];
	}

	/**
	 * Get CSS assets group for MvcCore Assets view helper to render CSS assets in datagrid PreDispatch() method.
	 * @return \stdClass[]
	 */
	public function GetGridAssetsGroupsCss () {
		$gridAssetsDir = static::getAssetsDir();
		$agGridBaseStyle = "ag-grid";
		$agGridThemeStyle = $this->grid->GetConfigRendering()->GetTheme();
		$agGridCustomStyle = $this->grid->GetConfigRendering()->GetTheme();
		if (!$this->grid->GetEnvironment()->IsDevelopment()) {
			$agGridBaseStyle .= '.min';
			$agGridThemeStyle .= '.min';
		}
		$cssGroups = [
			(object) [
				'media'		=> 'all',
				'notMin'	=> FALSE,
				'paths'		=> [
					$gridAssetsDir . "/custom-styles/common.css",
					$gridAssetsDir . "/custom-styles/bottom-controls.css",
					$gridAssetsDir . "/custom-styles/sort-header.css",
					$gridAssetsDir . "/custom-styles/filter-header.css",
					$gridAssetsDir . "/custom-styles/filter-menu.css",
					$gridAssetsDir . "/custom-styles/visibility-menu.css",
					$gridAssetsDir . "/custom-styles/themes/{$agGridCustomStyle}.css",
				],
			],
			(object) [
				'media'		=> 'all',
				'notMin'	=> TRUE,
				'paths'		=> [
					$gridAssetsDir . "/ag-grid-community/styles/{$agGridBaseStyle}.css",
					$gridAssetsDir . "/ag-grid-community/styles/{$agGridThemeStyle}.css",
				],
			],
		];
		return $cssGroups;
	}

	/**
	 * Initialize AgGrid assets directory by AgGrid main class location.
	 * @return string
	 */
	protected static function getAssetsDir () {
		if (static::$gridAssetsDir != NULL)
			return static::$gridAssetsDir;
		$clsNameSeqments = explode('\\', get_called_class());
		$parentDirsPath = str_repeat('/..', count($clsNameSeqments));
		return static::$gridAssetsDir = \MvcCore\Tool::RealPathVirtual(
			str_replace('\\', '/', __DIR__) . $parentDirsPath . '/assets'
		);
	}
	
	/**
	 * Return composer package root dir by currently rendered class.
	 * Use internal static cache to speed up this method for multiple calls.
	 * @return string
	 */
	protected static function getGridScriptsFullPathBase () {
		$viewClassFullName = get_called_class();
		if (isset(static::$gridScriptsFullPathBases[$viewClassFullName]))
			return static::$gridScriptsFullPathBases[$viewClassFullName];
		$type = new \ReflectionClass($viewClassFullName);
		//$gridScriptsFullPathBase = dirname($type->getFileName(), 6);
		$gridScriptsFullPathBase = \MvcCore\Tool::RealPathVirtual($type->getFileName() . '/../../../../../..'); /// compatible code
		$gridScriptsFullPathBase = str_replace('\\', '/', $gridScriptsFullPathBase);
		return static::$gridScriptsFullPathBases[$viewClassFullName] = $gridScriptsFullPathBase;
	}

}