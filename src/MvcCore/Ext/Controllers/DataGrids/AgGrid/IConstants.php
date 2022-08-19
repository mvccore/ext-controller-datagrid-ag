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

/**
 * @mixin \MvcCore\Ext\Controllers\DataGrids\AgGrid
 */
interface IConstants {
	
	/**
	 * Grid action name for ajax data.
	 * @var string
	 */
	const GRID_ACTION_DATA = 'data';


	/**
	 * Client side rendered with only data for current page.
	 * @var int
	 */
	const CLIENT_PAGE_MODE_MULTI	= 0;

	/**
	 * Client side rendered with continuous data loading by user scrolling.
	 * @var int 
	 */
	const CLIENT_PAGE_MODE_SINGLE	= 1;


	/**
	 * Client row selection mode - no row is possible to select.
	 * @var int
	 */
	const ROW_SELECTION_NONE			= 1;
	
	/**
	 * Client row selection mode - only single row is possible to select.
	 * @var int
	 */
	const ROW_SELECTION_SINGLE			= 2;
	
	/**
	 * Client row selection mode - multiple rows is possible to select.
	 * @var int
	 */
	const ROW_SELECTION_MULTIPLE		= 4;
	
	/**
	 * Client row selection mode - last selected row is not possible to deselect.
	 * @var int
	 */
	const ROW_SELECTION_NOT_DESELECT	= 8;

	
	/**
	 * Ajax param name key for offset.
	 * @var int
	 */
	const AJAX_PARAM_OFFSET			= 'offset';
	
	/**
	 * Ajax param name key for limit.
	 * @var int
	 */
	const AJAX_PARAM_LIMIT			= 'limit';
	
	/**
	 * Ajax param name key for sorting.
	 * @var int
	 */
	const AJAX_PARAM_SORTING		= 'sorting';
	
	/**
	 * Ajax param name key for filtering.
	 * @var int
	 */
	const AJAX_PARAM_FILTERING		= 'filtering';
	
	/**
	 * Ajax param name key for JSONP callback.
	 * @var int
	 */
	const AJAX_PARAM_CALLBACK		= 'callback';

	
	/**
	 * Ajax data request method to get data by 
	 * `window.XMLHttpRequest` with `GET` http method.
	 * @var int
	 */
	const AJAX_DATA_REQUEST_METHOD_GET		= 1;
	
	/**
	 * Ajax data request method to get data by 
	 * `window.XMLHttpRequest` with `POST` http method.
	 * @var int
	 */
	const AJAX_DATA_REQUEST_METHOD_POST		= 2;
	
	/**
	 * Ajax data request method to get data by 
	 * `JSONP` request functionality by `GET` http method.
	 * @var int
	 */
	const AJAX_DATA_REQUEST_METHOD_JSONP	= 4;
}