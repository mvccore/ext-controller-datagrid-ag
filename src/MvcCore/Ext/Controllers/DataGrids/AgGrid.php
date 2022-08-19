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

class		AgGrid
extends		\MvcCore\Ext\Controllers\DataGrid
implements	\MvcCore\Ext\Controllers\DataGrids\AgGrid\IConstants {
	
	use \MvcCore\Ext\Controllers\DataGrids\AgGrid\InternalProps,
		\MvcCore\Ext\Controllers\DataGrids\AgGrid\ConfigProps,
		\MvcCore\Ext\Controllers\DataGrids\AgGrid\ConfigGettersSetters,
		\MvcCore\Ext\Controllers\DataGrids\AgGrid\InitMethods,
		\MvcCore\Ext\Controllers\DataGrids\AgGrid\PreDispatchMethods,
		\MvcCore\Ext\Controllers\DataGrids\AgGrid\ActionMethods;
	
	/**
	 * Items per page, `NULL` by default, it depends on client row model.
	 * @var int
	 */
	protected $itemsPerPage = NULL;

	/**
	 * MvcCore Extension - Controller - DataGrid - Ag - version:
	 * Comparison by PHP function version_compare();
	 * @see http://php.net/manual/en/function.version-compare.php
	 */
	const VERSION = '5.1.0';
	
}