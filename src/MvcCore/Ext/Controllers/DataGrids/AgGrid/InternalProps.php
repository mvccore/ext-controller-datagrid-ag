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

namespace MvcCore\Ext\Controllers\DataGrids\AgGrid;

use \MvcCore\Ext\Controllers\DataGrids\AgGrid\IConstants as IConstantsAg;

/**
 * @mixin \MvcCore\Ext\Controllers\DataGrids\AgGrid
 */
trait InternalProps {
	
	/**
	 * Row model class interface.
	 * @var string
	 */
	protected static $rowModelActiveColumnsInterface = "\\MvcCore\\Ext\\Controllers\\DataGrids\\AgGrids\\Models\\IGridRow";

	/**
	 * If `TRUE`, client row model is configured to single page 
	 * continuous ajax loading and request is targeted to data action.
	 * @internal
	 * @var bool|NULL
	 */
	protected $ajaxDataRequest				= NULL;

	/**
	 * If `TRUE`, count scales has been customized from defaults.
	 * @internal
	 * @var bool
	 */
	protected $countScalesCustomized		= FALSE;

	/**
	 * If `TRUE`, row class implements active columns interface.
	 * @var bool
	 */
	protected $rowClassIsActiveColumnsModel = FALSE;

}