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

namespace MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs;

interface IRendering extends \MvcCore\Ext\Controllers\DataGrids\Configs\IRendering {
	
	/**
	 * AgGrid css theme.
	 * @var string
	 */
	const 
		THEME_ALPINE		= 'ag-theme-alpine',
		THEME_ALPINE_DARK	= 'ag-theme-alpine-dark',
		THEME_BALHAM		= 'ag-theme-balham',
		THEME_BALHAM_DARK	= 'ag-theme-balham-dark',
		THEME_BASE			= 'ag-theme-base',
		THEME_BLUE			= 'ag-theme-blue',
		THEME_BOOTSTRAP		= 'ag-theme-bootstrap',
		THEME_CLASSIC		= 'ag-theme-classic',
		THEME_DARK			= 'ag-theme-dark',
		THEME_FRESH			= 'ag-theme-fresh',
		THEME_MATERIAL		= 'ag-theme-material';

	/**
	 * 
	 * @param  string $theme
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetTheme ($theme);

	/**
	 * 
	 * @return string|NULL
	 */
	public function GetTheme ();

	/**
	 * @param  string|NULL $tableHeadFilteringTitle
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetTableHeadFilteringTitle ($tableHeadFilteringTitle);

	/**
	 * @return string|NULL
	 */
	public function GetTableHeadFilteringTitle ();
	
	/**
	 * 
	 * @param  \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerAssets|callable|NULL $assetsHandler 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetHandlerAssets ($handlerAssets);

	/**
	 * 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerAssets|callable|NULL
	 */
	public function GetHandlerAssets ();
}