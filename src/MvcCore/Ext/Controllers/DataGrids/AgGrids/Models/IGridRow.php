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

interface IGridRow extends \MvcCore\Ext\Controllers\DataGrids\Models\IGridRow {
	
	/**
	 * Get metadata collection to set up database values 
	 * inside current row class more faster in in `SetValues()` method
	 * or serialize data more faster in method `$row->jsonSerialize()`.
	 * @return ?array
	 */
	public static function GetActiveColumns ();
	
	/**
	 * Set metadata collection to set up database values 
	 * inside current row class more faster in in `SetValues()` method
	 * or serialize data more faster in method `$row->jsonSerialize()`.
	 * @param array $jsonProperties 
	 */
	public static function SetActiveColumns (array $activeColumns);

	/**
	 * Set up database values into current row class more faster 
	 * then in `\MvcCore\Ext\Models\Db\Model::SetValues()` method.
	 * Set up only active columns to serialize less data later.
	 * @param  array $data       Raw data from database (row) or from form fields.
	 * @param  int   $propsFlags All properties flags are available.
	 * @throws \InvalidArgumentException
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Models\GridRow Current `$this` context.
	 */
	public function SetValues ($data = [], $propsFlags = 0);

	/**
	 * Serialize row instance class into JSON format.
	 * @param  int $propsFlags
	 * @return array<string, mixed>
	 */
	#[\ReturnTypeWillChange]
	public function jsonSerialize ($propsFlags = 0);

}