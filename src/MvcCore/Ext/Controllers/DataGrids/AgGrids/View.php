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
				],
			],
			(object) [
				'async'		=> FALSE,
				'defer'		=> FALSE,
				'notMin'	=> FALSE,
				'paths'		=> [
					$mvcCoreAgGridAssetsDir . "/AgGrids/Enums/RowSelection.js",
					$mvcCoreAgGridAssetsDir . "/AgGrids/Types/GridColumn.js",
					$mvcCoreAgGridAssetsDir . "/AgGrids/ToolTip.js",
					$mvcCoreAgGridAssetsDir . "/AgGrids/Events.js",
					$mvcCoreAgGridAssetsDir . "/AgGrids/Initializations.js",
					$mvcCoreAgGridAssetsDir . "/AgGrid.js",
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