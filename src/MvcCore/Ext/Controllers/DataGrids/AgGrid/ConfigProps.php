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
	//protected $configRendering				= NULL;

	/**
	 * Localization properties configuration object.
	 * @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales|NULL
	 */
	protected $configLocales				= NULL;


	/**
	 * Custom JS full class name. Class must extend JS class:
	 * `MvcCore.Ext.Controllers.DataGrids.AgGrid`.
	 * This class is instanciated in inline `<script>` element during 
	 * the page load immediately after datagrid HTML code.
	 * Use this extended custom JavaScript class to handle 
	 * initiation of data grid by your own code or use it for any
	 * other extended behaviour of your datagrid.
	 * @var string
	 */
	protected $jsClassFullName				= 'MvcCore.Ext.Controllers.DataGrids.AgGrid';
	
	/**
	 * `TRUE` (by default) to serialize into JSON rows data only enabled columns only,
	 * `FALSE` to serialize all columns including disabled.
	 * If some column is disabled and it has configured property `alwaysSend`, 
	 * then column will be always serialized also if this settings is set to `TRUE`.
	 * @var bool
	 */
	protected $enabledColumnsOnly			= TRUE;

	/**
	 * Grid row selection mode flags.
	 * Avaiable flags:
	 * - `\MvcCore\Ext\Controllers\DataGrids\IAgGrid::ROW_SELECTION_NONE`,
	 * - `\MvcCore\Ext\Controllers\DataGrids\IAgGrid::ROW_SELECTION_SINGLE`,
	 * - `\MvcCore\Ext\Controllers\DataGrids\IAgGrid::ROW_SELECTION_MULTIPLE`,
	 * - `\MvcCore\Ext\Controllers\DataGrids\IAgGrid::ROW_SELECTION_NOT_DESELECT`,
	 * - `\MvcCore\Ext\Controllers\DataGrids\IAgGrid::ROW_SELECTION_AUTOSELECT_FIRST`.
	 * You can combine any selection flags together, but it's not possible 
	 * to combine flag `ROW_SELECTION_NONE` with any other flag and flags 
	 * `ROW_SELECTION_SINGLE` and `ROW_SELECTION_MULTIPLE` are not possible
	 * to combine together.
	 * @var int
	 */
	protected $rowSelection					= IConstants::ROW_SELECTION_NONE;

	/**
	 * User time zone offset.
	 * @var \DateInterval|NULL
	 */
	protected $timeZoneOffset				= NULL;

	/**
	 * `TRUE` to cache data in client browser, `FALSE` by default.
	 * @var bool
	 */
	protected $clientCache					= FALSE;
	
	/**
	 * Client page mode:
	 * - `\MvcCore\Ext\Controllers\DataGrids\IAgGrid::CLIENT_PAGE_MODE_MULTI`
	 *   Client side rendered with only data for current page.
	 * - `\MvcCore\Ext\Controllers\DataGrids\IAgGrid::CLIENT_PAGE_MODE_SINGLE`
	 *   Client side rendered with continuous data loading by user scrolling.
	 * If you do not configure this property, page mode will be mixed,
	 * for pages with scale higher than `0` will be used `CLIENT_PAGE_MODE_MULTI`
	 * and for scale `0` (all items) will be used `CLIENT_PAGE_MODE_SINGLE`.
	 * @var int|NULL
	 */
	protected $clientPageMode				= NULL;
	
	/**
	 * How many rows for each block in the store, i.e. how many 
	 * rows returned from the server at a time in AJAX response. Default: 100.
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
	 * This configuration is used if client cache is 
	 * enabled by `$grid->SetclientCache(TRUE);`.
	 * Default value is `NULL` for unlimited cache.
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
	 * 
	 * This configuration is used if grid has enabled
	 * client history by `$grid->SetClientChangeHistory(TRUE);`.
	 * 
	 * Use string with your title and `<grid>` placeholder for data
	 * automaticly serialized by grid javascript on client side by 
	 * grid current page, scale, sort and filter:
	 * 
	 * Example:
	 * ```
	 * $grid->SetClientTitleTemplate("Nice page title text | <grid>");
	 * ```
	 * 
	 * If grid has configured constant `self::URL_PARAM_GRID` to something
	 * else then `<grid>`, then also this placeholder will be different
	 * by value of this constant.
	 * @var string|NULL
	 */
	protected $clientTitleTemplate			= NULL;
	
	/**
	 * Custom AJAX request method to load grid rows data.
	 * Available values:
	 * - `\MvcCore\Ext\Controllers\DataGrids\IAgGrid::AJAX_DATA_REQUEST_METHOD_GET` (default),
	 * - `\MvcCore\Ext\Controllers\DataGrids\IAgGrid::AJAX_DATA_REQUEST_METHOD_POST`,
	 * - `\MvcCore\Ext\Controllers\DataGrids\IAgGrid::AJAX_DATA_REQUEST_METHOD_JSONP`.
	 * Most promissing value for large datasets is `AJAX_DATA_REQUEST_METHOD_JSONP`,
	 * because there is no limit by JavaScript object `window.XMLHttpRequest`.
	 * @var int
	 */
	protected $dataRequestMethod			= IConstants::AJAX_DATA_REQUEST_METHOD_GET;

	/**
	 * Custom URL to load grid rows data by AJAX.
	 * 
	 * This property is required to configure, because this url is used
	 * to load grid data by AJAX request when you sort, filter or move to next page.
	 * 
	 * Put here full or relative URL string to route, where is
	 * action with the same grid initialization, for example:
	 * ```
	 * class IndexController {
	 *    ...
	 *    public function IndexAction (): void {
	 *       $this->view->grid = $this->initGrid();
	 *    }
	 *    public function DataInit (): void {
	 *       $this->initGrid();
	 *    }
	 *    protected function initGrid (): AgGrid {
	 *       $grid = new AgGrid($this, 'grid');
	 *       ...
	 *       $grid->SetUrlData($this->Url(':Data'));
	 *       ...
	 *       return $grid;
	 *    }
	 *    ...
	 * }
	 * ```
	 * Everything else will be handled by grid itself.
	 * @var string|NULL
	 */
	protected $urlData						= NULL;
	
	/**
	 * Custom URL to submit client columns enabled/disabled states.
	 * 
	 * This property is required to configure, because this url is used
	 * to enable or disable columns by POST action in db or session.
	 * 
	 * Put here full or relative URL string to route, where is
	 * action with the same grid initialization, for example:
	 * ```
	 * class IndexController {
	 *    ...
	 *    public function IndexAction (): void {
	 *       $this->view->grid = $this->initGrid();
	 *    }
	 *    public function ColumnsStatesInit (): void {
	 *       $this->initGrid();
	 *    }
	 *    protected function initGrid (): AgGrid {
	 *       $grid = new AgGrid($this, 'grid');
	 *       ...
	 *       $grid->SetUrlColumnsStates($this->Url(':ColumnsStates'));
	 *       ...
	 *       return $grid;
	 *    }
	 *    ...
	 * }
	 * ```
	 * Everything else will be handled by grid itself.
	 * @var string|NULL
	 */
	protected $urlColumnsStates				= NULL;
	
	/**
	 * Custom URL to send client columns order changes by AJAX.
	 * 
	 * This property is required to configure, because this url is used
	 * to set column width or order change by AJAX request in db or session.
	 * 
	 * Put here full or relative URL string to route, where is
	 * action with the same grid initialization, for example:
	 * ```
	 * class IndexController {
	 *    ...
	 *    public function IndexAction (): void {
	 *       $this->view->grid = $this->initGrid();
	 *    }
	 *    public function ColumnsChangesInit (): void {
	 *       $this->initGrid();
	 *    }
	 *    protected function initGrid (): AgGrid {
	 *       $grid = new AgGrid($this, 'grid');
	 *       ...
	 *       $grid->SetUrlColumnsChanges($this->Url(':ColumnsChanges'));
	 *       ...
	 *       return $grid;
	 *    }
	 *    ...
	 * }
	 * ```
	 * Everything else will be handled by grid itself.
	 * @var string|NULL
	 */
	protected $urlColumnsChanges			= NULL;

	/**
	 * Custom handler to read user column configurations from any place.
	 * 
	 * Function accepts two arguments:
	 * - `mixed $idGrid` - completed by `$grid->GetId()`,
	 * - `mixed $idUser` - completed by `$controller->GetUser()?->GetId()`.
	 * Function must return empty or completed collection if any 
	 * user configuration found:
	 * - `\MvcCore\Ext\Controllers\DataGrids\AgGrids\Iterators\PersistentColumns`.
	 * 
	 * Example to load configuration from database:
	 * ```
	 * use \MvcCore\Ext\Controllers\DataGrids\AgGrids\Iterators\PersistentColumns;
	 * $grid->SetHandlerColumnsRead(
	 *    function ($idGrid, $idUser) use ($db): PersistentColumns {
	 *       $jsonStr = $db
	 *          ->Prepare("
	 *             SELECT c.data
	 *             FROM grids_configs c
	 *             WHERE c.id_grid = :id_grid AND c.id_org_user = :id_user;
	 *          ")
	 *          ->FetchOne([
	 *             ":id_grid"     => $idGrid,
	 *             ":id_org_user" => $idUser,
	 *          ])
	 *          ->ToScalar('data', 'string');
	 *       $data = [];
	 *       if ($jsonStr !== NULL) {
	 *          $json = \MvcCore\Tool::JsonDecode($jsonStr);
	 *          foreach ($json->columns as $propName => $item)
	 *             $data[$propName] = new PersistentColumn(
	 *                $propName, $item->columnIndex, $item->width, $item->disabled
	 *             );
	 *          // set count only if client page mode is not configured
	 *          if ($this->clientPageMode === NULL)
	 *             $this->SetItemsPerPage($json->count);
	 *       }
	 *       return new PersistentColumns($data);
	 *    }
	 * );
	 * ```
	 * @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerColumnsRead|callable
	 */
	protected $handlerColumnsRead			= NULL;

	/**
	 * Custom handler to write user column configurations into any place.
	 * 
	 * Function accepts three arguments:
	 * - `mixed $idGrid` - completed by `$grid->GetId()`,
	 * - `mixed $idUser` - completed by `$controller->GetUser()?->GetId()`.
	 * - `PersistentColumns $persistentColumns` - collection with all 
	 *   datagrid configured columns, every column contains width, enabled
	 *   or disabled state and column order.
	 * Function return type is `void`.
	 * 
	 * Example to store configuration in database:
	 * ```
	 * use \MvcCore\Ext\Controllers\DataGrids\AgGrids\Iterators\PersistentColumns;
	 * $grid->SetHandlerColumnsWrite(
	 *    function ($idGrid, $idUser, PersistentColumns $persistentColumns) use ($db): void {
	 *       $jsonStr = \MvcCore\Tool::JsonEncode([
	 *         'count'   => $this->GetCount(),
	 *         'columns' => $persistentColumns,
	 *       ]);
	 *       $db
	 *          ->Prepare("
	 *             MERGE INTO grids_configs
	 *                WITH (HOLDLOCK) AS c
	 *             USING (SELECT
	 *                :id_grid AS id_grid,
	 *                :id_user AS id_user,
	 *                :data AS data
	 *             ) AS s ON
	 *                c.id_grid = s.id_grid AND
	 *                c.id_user = s.id_user
	 *             WHEN MATCHED THEN
	 *             	UPDATE
	 *             	SET
	 *             	   id_grid = s.id_grid,
	 *             	   id_user = s.id_user,
	 *             	   data = s.data
	 *             WHEN NOT MATCHED THEN
	 *             	INSERT (
	 *             	   id_grid, id_user, data
	 *             	) VALUES (
	 *             	   s.id_grid, s.id_user, s.data
	 *             	);
	 *          ")
	 *          ->Execute([
	 *             ":id_grid" => $idGrid,
	 *             ":id_user" => $idUser,
	 *             ":data"    => $jsonStr,
	 *          ]);
	 *    }
	 * );
	 * ```
	 * @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerColumnsWrite|callable
	 */
	protected $handlerColumnsWrite			= NULL;
	
	/**
	 * Ajax params for dataset offset, limit, sorting and filtering.
	 * Keys are fixed, values are param names for current datagrid.
	 * 
	 * If you want to use different AJAX param names, you can configure 
	 * this array to any other values, but you have to know which other 
	 * system params already exists and not possible to use.
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