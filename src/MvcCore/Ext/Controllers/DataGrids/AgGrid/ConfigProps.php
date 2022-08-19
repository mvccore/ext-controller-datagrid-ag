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

use \MvcCore\Ext\Controllers\DataGrids\AgGrid\IConstants;

/**
 * @mixin \MvcCore\Ext\Controllers\DataGrids\AgGrid
 */
trait ConfigProps {

	/**
	 * @var string
	 */
	protected static $jsClassFullName = 'MvcCore.Ext.Controllers.DataGrids.AgGrid';

	/**
	 * Configuration object for datagrid parts, style and controls rendering.
	 * You can easily configure datagrid component parts, style 
	 * and controls by providing this object custom instance.
	 * This object is created automatically by default if not provided.
	 * @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering|NULL
	 */
	protected $configRendering = NULL;

	/**
	 * @var string|NULL
	 */
	protected $id = NULL;
	
	/**
	 * @var int|NULL
	 */
	protected $clientPageMode = NULL;
	
	/**
	 * @var int
	 */
	protected $clientRowBuffer = 100;

	/**
	 * @var string|NULL
	 */
	protected $dataUrl = NULL;
	
	/**
	 * @var int
	 */
	protected $dataRequestMethod = IConstants::AJAX_DATA_REQUEST_METHOD_JSONP;

	/**
	 * @var int|NULL
	 */
	protected $rowSelection = IConstants::ROW_SELECTION_NONE;
	
	/**
	 * Ajax params for dataset offset, limit, sorting and filtering.
	 * Keys are fixed, values are param names for current datagrid.
	 * @var array<string, string>
	 */
	protected $ajaxParamsNames = [
		IConstants::AJAX_PARAM_OFFSET		=> 'offset',
		IConstants::AJAX_PARAM_LIMIT		=> 'limit',
		IConstants::AJAX_PARAM_SORTING		=> 'sorting',
		IConstants::AJAX_PARAM_FILTERING	=> 'filtering',
		IConstants::AJAX_PARAM_CALLBACK		=> 'callback',
	];
}