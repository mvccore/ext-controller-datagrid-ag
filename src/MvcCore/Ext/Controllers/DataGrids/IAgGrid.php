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

interface	IAgGrid
extends		\MvcCore\Ext\Controllers\DataGrid\IConstants,
			\MvcCore\Ext\Controllers\DataGrid\IConfigGettersSetters,
			\MvcCore\Ext\Controllers\DataGrid\IColumnsParsingMethods,
			\MvcCore\Ext\Controllers\DataGrid\IInternalGettersSetters,
			\MvcCore\Ext\Controllers\DataGrid\IActionMethods,
			\MvcCore\Ext\Controllers\DataGrids\AgGrid\IConstants,
			\MvcCore\Ext\Controllers\DataGrids\AgGrid\IConfigGettersSetters,
			\MvcCore\Ext\Controllers\DataGrids\AgGrid\IInitMethods,
			\MvcCore\Ext\Controllers\DataGrids\AgGrid\IActionMethods {
}