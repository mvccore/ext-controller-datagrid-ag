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

	const ASSETS_BUNDLE_DEFAULT_NAME_JS = 'agGridJs';

	const ASSETS_BUNDLE_DEFAULT_NAME_CSS = 'agGridCss';

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
		return [
			(object) [
				'async'		=> FALSE,
				'defer'		=> FALSE,
				'notMin'	=> TRUE,
				'paths'		=> [
					$gridAssetsDir . "/ag-grid-community/ag-grid-community.min.noStyle.js",
					$gridAssetsDir . "/ajax-min/ajax.min.js",
				],
			],
			(object) [
				'async'		=> FALSE,
				'defer'		=> FALSE,
				'notMin'	=> FALSE,
				'paths'		=> [
					$mvcCoreAgGridAssetsDir . "AgGrids/MD5.js",

					$mvcCoreAgGridAssetsDir . "AgGrids/Enums/AjaxDataRequestMethod.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/Enums/AjaxParamName.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/Enums/ClientModelType.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/Enums/ClientPageMode.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/Enums/ControlText.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/Enums/FilteringMode.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/Enums/Operator.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/Enums/RowSelection.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/Enums/RowSelection.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/Enums/SortingMode.js",

					$mvcCoreAgGridAssetsDir . "AgGrids/Types/GridColumn.js",
					
					$mvcCoreAgGridAssetsDir . "AgGrids/EventsManager.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/SinglePageMode.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/EventsManagers/MultiplePagesMode.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/DataSource.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/DataSources/MultiplePagesModes/Cache.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/DataSources/MultiplePagesMode.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/DataSources/SinglePageMode.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/AgOptions/Bases.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/AgOptions/Columns.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/Options.js",

					$mvcCoreAgGridAssetsDir . "AgGrids/Helpers.js",
					$mvcCoreAgGridAssetsDir . "AgGrids/ToolTip.js",

					$mvcCoreAgGridAssetsDir . "AgGrid.js",
				],
			],
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