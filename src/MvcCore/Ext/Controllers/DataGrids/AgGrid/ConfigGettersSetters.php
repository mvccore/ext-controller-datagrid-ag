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

use \MvcCore\Ext\Controllers\IDataGrid;

/**
 * @mixin \MvcCore\Ext\Controllers\DataGrids\AgGrid
 */
trait ConfigGettersSetters {
	
	/**
	 * @param  string $jsClassFullName 
	 * @return string
	 */
	public static function SetJsClassFullName ($jsClassFullName) {
		return static::$jsClassFullName = $jsClassFullName;
	}

	/**
	 * @return string
	 */
	public static function GetJsClassFullName () {
		return static::$jsClassFullName;
	}
	
	
	/**
	 * @inheritDocs
	 * @param  \int[] $countScales
	 * @return \MvcCore\Ext\Controllers\DataGrid
	 */
	public function SetCountScales (array $countScales) {
		parent::SetCountScales($countScales);
		$this->countScalesCustomized = TRUE;
		return $this;
	}
	
	/**
	 * @inheritDocs
	 * @param  int $itemsPerPage
	 * @return \MvcCore\Ext\Controllers\DataGrid
	 */
	public function SetItemsPerPage ($itemsPerPage) {
		parent::SetItemsPerPage($itemsPerPage);
		$this->itemsPerPageCustomized = TRUE;
		return $this;
	}
	
	/**
	 * @inheritDocs
	 * @return int
	 */
	public function GetItemsPerPage () {
		if ($this->itemsPerPage === NULL) {
			$this->itemsPerPage = ($this->clientPageMode === IConstants::CLIENT_PAGE_MODE_SINGLE)
				? 0
				: self::ITEMS_PER_PAGE_DEFAULT;
		}
		return $this->itemsPerPage;
	}


	/**
	 * @param  string $id 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetId ($id) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->id = $id;
		return $this;
	}

	/**
	 * @return string|NULL
	 */
	public function GetId () {
		return $this->id;
	}
	
	/**
	 * @param  int $clientPageMode 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetClientPageMode ($clientPageMode) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->clientPageMode = $clientPageMode;
		return $this;
	}

	/**
	 * @return int|NULL
	 */
	public function GetClientPageMode () {
		return $this->clientPageMode;
	}
	
	/**
	 * @param  int $clientRowBuffer 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetClientRowBuffer ($clientRowBuffer) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->clientRowBuffer = $clientRowBuffer;
		return $this;
	}

	/**
	 * @return int|NULL
	 */
	public function GetClientRowBuffer () {
		return $this->clientRowBuffer;
	}
	
	/**
	 * @param  string $dataUrl 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetDataUrl ($dataUrl) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->dataUrl = $dataUrl;
		return $this;
	}

	/**
	 * @return string|NULL
	 */
	public function GetDataUrl () {
		return $this->dataUrl;
	}
	
	/**
	 * @param  int $dataRequestMethod 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetDataRequestMethod ($dataRequestMethod) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->dataRequestMethod = $dataRequestMethod;
		return $this;
	}

	/**
	 * @return int
	 */
	public function GetDataRequestMethod () {
		return $this->dataRequestMethod;
	}
	
	/**
	 * @param  int $rowSelection 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetRowSelection ($rowSelection) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->rowSelection = $rowSelection;
		return $this;
	}

	/**
	 * @return int
	 */
	public function GetRowSelection () {
		return $this->rowSelection;
	}

	/**
	 * @param  array<string, string> $ajaxParamsNames 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetAjaxParamsNames (array $ajaxParamsNames) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->ajaxParamsNames = $ajaxParamsNames;
		return $this;
	}

	/**
	 * @return array<string, string>
	 */
	public function GetAjaxParamsNames () {
		return $this->ajaxParamsNames;
	}
	
	/**
	 * @inheritDocs
	 * @param  \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $configRendering
	 * @return \MvcCore\Ext\Controllers\DataGrid
	 */
	#[\ReturnTypeWillChange]
	public function SetConfigRendering (/*\MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\IRendering*/ $configRendering) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $configRendering */
		$this->configRendering = $configRendering;
		return $this;
	}

	/**
	 * @inheritDocs
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	#[\ReturnTypeWillChange]
	public function GetConfigRendering () {
		if ($this->configRendering === NULL) {
			$this->configRendering = new \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering;
		}
		return $this->configRendering;
	}

}