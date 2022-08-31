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
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetJsClassFullName ($jsClassFullName) {
		$this->jsClassFullName = $jsClassFullName;
		return $this;
	}

	/**
	 * @return string
	 */
	public function GetJsClassFullName () {
		return $this->jsClassFullName;
	}
	
	
	/**
	 * @inheritDocs
	 * @param  \int[] $countScales
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetCountScales (array $countScales) {
		parent::SetCountScales($countScales);
		$this->countScalesCustomized = TRUE;
		return $this;
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
	 * @param  bool $enabledColumnsOnly 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetEnabledColumnsOnly ($enabledColumnsOnly) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->enabledColumnsOnly = $enabledColumnsOnly;
		return $this;
	}

	/**
	 * @return bool
	 */
	public function GetEnabledColumnsOnly () {
		return $this->enabledColumnsOnly;
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
	 * @param  \DateInterval $timeZoneOffset 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetTimeZoneOffset (\DateInterval $timeZoneOffset) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->timeZoneOffset = $timeZoneOffset;
		return $this;
	}

	/**
	 * @return \DateInterval|NULL
	 */
	public function GetTimeZoneOffset () {
		if ($this->timeZoneOffset === NULL) {
			$this->timeZoneOffset = new \DateInterval("PT0H0M0S");
		}
		return $this->timeZoneOffset;
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
	 * @param  int|NULL $clientMaxRowsInCache 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetClientMaxRowsInCache ($clientMaxRowsInCache) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->clientMaxRowsInCache = $clientMaxRowsInCache;
		return $this;
	}

	/**
	 * 
	 * @return int|NULL
	 */
	public function GetClientMaxRowsInCache () {
		return $this->clientMaxRowsInCache;
	}

	/**
	 * @param  bool $clientCache 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetClientCache ($clientCache) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->clientCache = $clientCache;
		return $this;
	}

	/**
	 * 
	 * @return bool
	 */
	public function GetClientCache () {
		return $this->clientCache;
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
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	#[\ReturnTypeWillChange]
	public function SetConfigRendering (/*\MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\IRendering*/ $configRendering) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $configRendering */
		if (!($configRendering instanceof \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\IRendering)) {
			$namespace = "\\MvcCore\\Ext\\Controllers\\DataGrids\\AgGrids\\Configs\\";
			$interfaceName = $namespace."IRendering";
			$className = $namespace."Rendering";
			throw new \InvalidArgumentException(
				"[".get_class($this)."] Grid rendering config must implement "
				."interface `{$interfaceName}`. Try to create instance from `$className`."
			);
		}
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


	/**
	 * @inheritDocs
	 * @param  \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales $configRendering
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	#[\ReturnTypeWillChange]
	public function SetConfigLocales (\MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\ILocales $configLocales) {
		$this->configLocales = $configLocales;
		return $this;
	}

	/**
	 * @inheritDocs
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function GetConfigLocales () {
		if ($this->configLocales === NULL) {
			$this->configLocales = new \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales;
		}
		return $this->configLocales;
	}
}