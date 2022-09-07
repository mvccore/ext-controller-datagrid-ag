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

interface IPersistentColumn {
	
	/**
	 * Get data grid model property name.
	 * @return string|NULL
	 */
	public function GetPropName ();

	/**
	 * Set data grid model property name.
	 * @param  string|NULL $propName
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\PersistentColumn
	 */
	public function SetPropName ($propName);

	/**
	 * Get datagrid column index, starting with `0`, optional.
	 * @return int|NULL
	 */
	public function GetColumnIndex ();

	/**
	 * Set datagrid column index, starting with `0`, optional.
	 * @param  int|NULL $columnIndex
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\PersistentColumn
	 */
	public function SetColumnIndex ($columnIndex);

	/**
	 * Get column initial or current width, it can be defined 
	 * as integer for pixel value, float for flex value
	 * or string including `px` or `%` units.
	 * Width is used only for table grid type.
	 * @return string|int|float|NULL
	 */
	public function GetWidth ();

	/**
	 * Set column initial or current width, it can be defined 
	 * as integer for pixel value, float for flex value
	 * or string including pixels or percentage value.
	 * Width is used only for table grid type.
	 * @param  string|int|float|NULL $width
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\PersistentColumn
	 */
	public function SetWidth ($width);
	
	/**
	 * Get `TRUE` for disabled column, `FALSE|NULL` for enabled column (enabled by default).
	 * @return bool|NULL
	 */
	public function GetDisabled ();

	/**
	 * Set `TRUE` for disabled column, `FALSE|NULL` for enabled column (enabled by default).
	 * @param  bool|NULL $disabled
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\PersistentColumn
	 */
	public function SetDisabled ($disabled);
}
