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

interface IActionMethods {
	
	/**
	 * Internal default action for datagrid content rendering.
	 * @template
	 * @return void
	 */
	public function DefaultInit ();

	/**
	 * Complete page grid config for json serialization in response body.
	 * @return array
	 */
	public function GetClientServerConfig ();

	/**
	 * Serialize client site view helper functions from server view helpers.
	 * @return string
	 */
	public function GetClientHelpersJson ();

	/**
	 * Complete page initial grid data for json serialization in response body.
	 * @return array<string,mixed>
	 */
	public function GetClientInitData ();

	/**
	 * Grid data request init action method to extend, 
	 * executed after grid `Init()` method automatically.
	 * @return void
	 */
	public function DataInit ();

	/**
	 * Data request action method, executed after grid `PreDispatch()` method automatically.
	 * @return void
	 */
	public function DataAction ();

	/**
	 * Write current user columns configurations.
	 * @return void
	 */
	public function WriteColumnsConfigs ();

	/**
	 * Grid column states request init action method to extend, 
	 * executed after grid `Init()` method automatically.
	 * @return void
	 */
	public function ColumnsStatesInit ();

	/**
	 * Grid column changes request init action method to extend, 
	 * executed after grid `Init()` method automatically.
	 * @return void
	 */
	public function ColumnsChangesInit ();

}