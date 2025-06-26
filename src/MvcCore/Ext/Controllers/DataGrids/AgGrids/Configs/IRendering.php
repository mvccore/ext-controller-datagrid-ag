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
		THEME_BLUE			= 'ag-theme-blue',
		THEME_BOOTSTRAP		= 'ag-theme-bootstrap',
		//THEME_CLASSIC		= 'ag-theme-classic',
		THEME_DARK			= 'ag-theme-dark',
		THEME_FRESH			= 'ag-theme-fresh',
		THEME_MATERIAL		= 'ag-theme-material';

	/**
	 * Set AgGrid theme name.
	 * @param  string $theme
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetTheme ($theme);

	/**
	 * Get AgGrid theme name.
	 * @return string|NULL
	 */
	public function GetTheme ();
	
	/**
	 * Set custom handler to assign all AgGrid assets response output.
	 * @param  \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerAssets|callable|NULL $assetsHandler 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetHandlerAssets ($handlerAssets);

	/**
	 * Get custom handler to assign all AgGrid assets response output.
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerAssets|callable|NULL
	 */
	public function GetHandlerAssets ();

	/**
	 * Set table head filtering html title attribute.
	 * @param  string|NULL $tableHeadFilteringTitle
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetTableHeadFilteringTitle ($tableHeadFilteringTitle);

	/**
	 * Get table head filtering html title attribute.
	 * @return string|NULL
	 */
	public function GetTableHeadFilteringTitle ();

	/**
	 * Set integer about render control with button to refresh datagrid data (only AgGrid datagrid type).
	 * This control is always rendered by default.
	 * @param  int $renderControlRefresh
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetRenderControlRefresh ($renderControlRefresh = \MvcCore\Ext\Controllers\IDataGrid::CONTROL_DISPLAY_ALWAYS);

	/**
	 * Get integer about render control with button to refresh datagrid data (only AgGrid datagrid type).
	 * This control is always rendered by default.
	 * @return int
	 */
	public function GetRenderControlRefresh ();


	/**
	 * Set css classes for datagrid refresh control (only AgGrid datagrid type).
	 * All previously configured css classes will be replaced with given values.
	 * @param string|\string[] $cssClasses
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetCssClassesControlRefresh ($cssClasses);

	/**
	 * Add css classes for datagrid refresh control (only AgGrid datagrid type).
	 * @param string|\string[] $cssClasses
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function AddCssClassesControlRefresh ($cssClasses);

	/**
	 * Get css classes for datagrid refresh control (only AgGrid datagrid type).
	 * @return \string[]
	 */
	public function GetCssClassesControlRefresh ();

	/**
	 * Set css classes for datagrid refresh control button(s) (only AgGrid datagrid type).
	 * All previously configured css classes will be replaced with given values.
	 * @param string|\string[] $cssClasses
	 * @return \MvcCore\Ext\Controllers\DataGrids\Configs\Rendering
	 */
	public function SetCssClassesControlRefreshButton ($cssClasses);

	/**
	 * Add css classes for datagrid refresh control button (only AgGrid datagrid type).
	 * @param string|\string[] $cssClasses
	 * @return \MvcCore\Ext\Controllers\DataGrids\Configs\Rendering
	 */
	public function AddCssClassesControlRefreshButton ($cssClasses);

	/**
	 * Get css classes for datagrid refresh control button (only AgGrid datagrid type).
	 * @return \string[]
	 */
	public function GetCssClassesControlRefreshButton ();

	/**
	 * Set custom datagrid refresh control template (only AgGrid datagrid type).
	 * Relative from `/App/Views/Scripts` without file extension.
	 * @param  string $templateControlRefresh
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetTemplateControlRefresh ($templateControlRefresh);

	/**
	 * Get custom datagrid refresh control template (only AgGrid datagrid type).
	 * Relative from `/App/Views/Scripts` without file extension.
	 * @return string
	 */
	public function GetTemplateControlRefresh ();

}