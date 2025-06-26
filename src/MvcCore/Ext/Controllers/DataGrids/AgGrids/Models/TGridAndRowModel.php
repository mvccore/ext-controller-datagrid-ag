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

namespace MvcCore\Ext\Controllers\DataGrids\AgGrids\Models;

/**
 * @mixin \MvcCore\Ext\Controllers\DataGrids\Models\TGridModel|\MvcCore\Ext\Controllers\DataGrids\AgGrids\Models\TGridRow
 */
trait TGridAndRowModel {

	use \MvcCore\Ext\Controllers\DataGrids\Models\GridModel\Features,
		\MvcCore\Ext\Controllers\DataGrids\AgGrids\Models\TGridRow {
			\MvcCore\Ext\Controllers\DataGrids\AgGrids\Models\TGridRow::SetGrid insteadof \MvcCore\Ext\Controllers\DataGrids\Models\GridModel\Features;
		}

	
}