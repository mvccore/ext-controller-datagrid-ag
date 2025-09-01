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

namespace MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs;

use \MvcCore\Ext\Controllers\DataGrids\Configs\JsonSerialize;

class		PersistentColumn
implements	\MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\IPersistentColumn, 
			\JsonSerializable {
	
	/**
	 * Model PHP code propery name.
	 * @var ?string
	 */
	protected $propName = NULL;

	/**
	 * Datagrid column index, starting with `0`, optional.
	 * @jsonSerialize
	 * @var ?int
	 */
	#[JsonSerialize]
	protected $columnIndex = NULL;

	/**
	 * Column initial or current width, it can be defined 
	 * as integer for pixel value, float for flex value
	 * or string including `px` or `%` units.
	 * Width is used only for table grid type.
	 * @jsonSerialize
	 * @var string|int|float|null
	 */
	#[JsonSerialize]
	protected $width = NULL;
	
	/**
	 * `TRUE` for disabled column, `FALSE|null` for enabled column (enabled by default).
	 * @jsonSerialize
	 * @var ?bool
	 */
	#[JsonSerialize]
	protected $disabled = NULL;
	

	/**
	 * Create datagrid column config item.
	 * @param ?string               $propName     Data grid model property name.
	 * @param ?int                  $columnIndex  Datagrid column index, starting with `0`.
	 * @param string|int|float|null $width        Column initial or current width, it can be defined 
	 *                                            as integer for pixel value, float for flex value
	 *                                            or string including `px` or `%` units.
	 *                                            Width is used only for table grid type.
	 * @param ?bool                 $disabled     Force column disable (enabled by default).
	 */
	public function __construct ($propName, $columnIndex, $width, $disabled) {
		$this->propName		= $propName;
		$this->columnIndex	= $columnIndex;
		$this->width		= $width;
		$this->disabled		= $disabled;
	}

	/**
	 * @inheritDoc
	 * @return ?string
	 */
	public function GetPropName () {
		return $this->propName;
	}

	/**
	 * @inheritDoc
	 * @param  ?string $propName
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\PersistentColumn
	 */
	public function SetPropName ($propName) {
		$this->propName = $propName;
		return $this;
	}
	
	/**
	 * @inheritDoc
	 * @return ?int
	 */
	public function GetColumnIndex () {
		return $this->columnIndex;
	}

	/**
	 * @inheritDoc
	 * @param  ?int $columnIndex
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\PersistentColumn
	 */
	public function SetColumnIndex ($columnIndex) {
		$this->columnIndex = $columnIndex;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return string|int|float|null
	 */
	public function GetWidth () {
		return $this->width;
	}

	/**
	 * @inheritDoc
	 * @param  string|int|float|null $width
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\PersistentColumn
	 */
	public function SetWidth ($width) {
		$this->width = $width;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return ?bool
	 */
	public function GetDisabled () {
		return $this->disabled;
	}

	/**
	 * @inheritDoc
	 * @param  ?bool $disabled
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\PersistentColumn
	 */
	public function SetDisabled ($disabled) {
		$this->disabled = $disabled;
		return $this;
	}
	
	/**
	 * Return data for JSON serialization.
	 * @return array|mixed
	 */
	#[\ReturnTypeWillChange]
	public function jsonSerialize () {
		return JsonSerialize::Serialize($this, \ReflectionProperty::IS_PROTECTED);
	}
}