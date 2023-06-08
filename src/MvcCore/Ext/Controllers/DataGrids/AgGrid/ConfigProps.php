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
	 * Datagrid unique id, used to cache parsed columns configuration
	 * and to identificate grid element on current page.
	 * @var string|NULL
	 */
	protected $id							= NULL;

	/**
	 * Configuration object for datagrid parts, style and controls rendering.
	 * You can easily configure datagrid component parts, style 
	 * and controls by providing this object custom instance.
	 * This object is created automatically by default if not provided.
	 * @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering|NULL
	 */
	protected $configRendering				= NULL;

	/**
	 * Localization properties configuration object.
	 * @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales|NULL
	 */
	protected $configLocales				= NULL;


	/**
	 * Custom JS full class name. Class must extend JS class:
	 * `MvcCore.Ext.Controllers.DataGrids.AgGrid`.
	 * @var string
	 */
	protected $jsClassFullName				= 'MvcCore.Ext.Controllers.DataGrids.AgGrid';
	
	/**
	 * `TRUE` to serialize into JSON rows data only enabled columns only,
	 * `FALSE` to serialize all columns including disabled. `TRUE` by default.
	 * @var bool
	 */
	protected $enabledColumnsOnly			= TRUE;

	/**
	 * Grid row selection mode flags.
	 * @var int
	 */
	protected $rowSelection					= IConstants::ROW_SELECTION_NONE;

	/**
	 * User time zone offset.
	 * @var \DateInterval|NULL
	 */
	protected $timeZoneOffset				= NULL;

	/**
	 * `TRUE` to cache data in client browser.
	 * @var bool
	 */
	protected $clientCache					= TRUE;
	
	/**
	 * Client page mode:
	 * - `\MvcCore\Ext\Controllers\DataGrids\AgGrid::CLIENT_PAGE_MODE_MULTI`
	 *   Client side rendered with only data for current page.
	 * - `\MvcCore\Ext\Controllers\DataGrids\AgGrid::CLIENT_PAGE_MODE_SINGLE`
	 *   Client side rendered with continuous data loading by user scrolling.
	 * @var int|NULL
	 */
	protected $clientPageMode				= NULL;
	
	/**
	 * How many rows for each block in the store, i.e. how many 
	 * rows returned from the server at a time. Default: 100.
	 * @var int|NULL
	 */
	protected $clientRequestBlockSize		= NULL;
	
	/**
	 * AgGrid configuration property. The number of rows rendered 
	 * outside the viewable area the grid renders. Having a buffer 
	 * means the grid will have rows ready to show as the user 
	 * slowly scrolls vertically. Default: 10.
	 * @var int|NULL
	 */
	protected $clientRowBuffer				= NULL;
	
	/**
	 * Maximum number of rows in client browser cache.
	 * @var int|NULL
	 */
	protected $clientMaxRowsInCache			= NULL;
	
	/**
	 * `TRUE` to change client browser URL for each 
	 * page change, sort change or filter change.
	 * @var bool
	 */
	protected $clientChangeHistory			= TRUE;
	
	/**
	 * Client document title template.
	 * @var string|NULL
	 */
	protected $clientTitleTemplate			= NULL;
	
	/**
	 * Custom AJAX request method to load grid rows data.
	 * @var int
	 */
	protected $dataRequestMethod			= IConstants::AJAX_DATA_REQUEST_METHOD_GET;

	/**
	 * Custom URL to load grid rows data by AJAX.
	 * @var string|NULL
	 */
	protected $urlData						= NULL;
	
	/**
	 * Custom URL to submit client columns enabled/disabled states.
	 * @var string|NULL
	 */
	protected $urlColumnsStates				= NULL;
	
	/**
	 * Custom URL to send client columns order changes by AJAX.
	 * @var string|NULL
	 */
	protected $urlColumnsChanges			= NULL;

	/**
	 * Custom handler to read user column configurations from any place.
	 * @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerColumnsRead|callable
	 */
	protected $handlerColumnsRead			= NULL;

	/**
	 * Custom handler to write user column configurations into any place.
	 * @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerColumnsWrite|callable
	 */
	protected $handlerColumnsWrite			= NULL;
	
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
		IConstants::AJAX_PARAM_MODE			=> 'mode',
		IConstants::AJAX_PARAM_CALLBACK		=> 'callback',
		IConstants::AJAX_PARAM_CACHE_BUSTER	=> '_',
	];
}