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

namespace MvcCore\Ext\Controllers\DataGrids;

use \MvcCore\Ext\Controllers\DataGrid\IConstants as IConstantsBase,
	\MvcCore\Ext\Controllers\DataGrids\AgGrid\IConstants as IConstantsAg;

class		AgGrid
extends		\MvcCore\Ext\Controllers\DataGrid 
implements	\MvcCore\Ext\Controllers\DataGrids\IAgGrid {
	
	use \MvcCore\Ext\Controllers\DataGrids\AgGrid\InternalProps,
		\MvcCore\Ext\Controllers\DataGrids\AgGrid\InternalGettersSetters,
		\MvcCore\Ext\Controllers\DataGrids\AgGrid\ConfigProps,
		\MvcCore\Ext\Controllers\DataGrids\AgGrid\ConfigGettersSetters,
		\MvcCore\Ext\Controllers\DataGrids\AgGrid\InitMethods,
		\MvcCore\Ext\Controllers\DataGrids\AgGrid\PreDispatchMethods,
		\MvcCore\Ext\Controllers\DataGrids\AgGrid\ActionMethods,
		\MvcCore\Ext\Controllers\DataGrids\AgGrid\ColumnsParsingMethods;
	
	/**
	 * MvcCore Extension - Controller - DataGrid - Ag - version:
	 * Comparison by PHP function version_compare();
	 * @see http://php.net/manual/en/function.version-compare.php
	 */
	const VERSION = '5.3.7';
	
	/**
	 * Internal datagrid actions.
	 * Keys are url values, values are local method names.
	 * @internal
	 * @var array
	 */
	protected static $gridInitActions = [
		IConstantsBase::GRID_ACTION_FILTER_TABLE	=> 'TableFilterInit',
		IConstantsBase::GRID_ACTION_FILTER_FORM		=> 'FormFilterInit',
		IConstantsBase::GRID_ACTION_DEFAULT			=> 'DefaultInit',
		IConstantsAg::GRID_ACTION_COLUMNS_STATES	=> 'ColumnsStatesInit',
		IConstantsAg::GRID_ACTION_COLUMNS_CHANGES	=> 'ColumnsChangesInit',
	];

	/**
	 * Row model class full name, not required, 
	 * if `NULL`, grid model class is used.
	 * @var ?string
	 */
	protected $rowClass = IConstantsBase::ROW_MODEL_CLASS_DEFAULT;

	/**
	 * Configuration object for datagrid parts, style and controls rendering.
	 * You can easily configure datagrid component parts, style 
	 * and controls by providing this object custom instance.
	 * This object is created automatically by default if not provided.
	 * @var ?\MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	protected $configRendering				= NULL;
	
}