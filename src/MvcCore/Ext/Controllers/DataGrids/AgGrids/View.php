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

class View extends \MvcCore\Ext\Controllers\DataGrids\View {

	const ASSETS_BUNDLE_DEFAULT_NAME_JS = 'agGrid';

	const ASSETS_BUNDLE_DEFAULT_NAME_CSS = 'agGrid';

	/**
	 * @var string|NULL
	 */
	protected static $gridAssetsDir = NULL;

	/**
	 * Get custom internal templates full path base.
	 * @internal
	 * @return string
	 */
	public function GetGridScriptsFullPathBase () {
		if ($this->gridScriptsFullPathBase === NULL)
			$this->gridScriptsFullPathBase = str_replace('\\', '/', __DIR__) . '/Views';
		return $this->gridScriptsFullPathBase;
	}
	
	/**
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
				//$gridAssetsDir . "/ag-grid-community/ag-grid-community.noStyle.js",
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
		return [
			(object) [
				'media'		=> 'all',
				'notMin'	=> TRUE,
				'paths'		=> [
					$gridAssetsDir . "/ag-grid-community/styles/{$agGridBaseStyle}.css",
					$gridAssetsDir . "/ag-grid-community/styles/{$agGridThemeStyle}.css",
				],
			],
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
					$gridAssetsDir . "/custom-styles/{$agGridCustomStyle}.css",
				],
			],
		];
	}

	protected static function getAssetsDir () {
		if (static::$gridAssetsDir != NULL)
			return static::$gridAssetsDir;
		$clsNameSeqments = explode('\\', get_called_class());
		$parentDirsPath = str_repeat('/..', count($clsNameSeqments));
		return static::$gridAssetsDir = \MvcCore\Tool::RealPathVirtual(
			str_replace('\\', '/', __DIR__) . $parentDirsPath . '/assets'
		);
	}
}