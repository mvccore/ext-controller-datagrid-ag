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
	 * @inheritDoc
	 * @param  string $id 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetId ($id) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->id = $id;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return string|NULL
	 */
	public function GetId () {
		return $this->id;
	}
	
	/**
	 * @inheritDoc
	 * @param  \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $configRendering
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	#[\ReturnTypeWillChange]
	public function SetConfigRendering (\MvcCore\Ext\Controllers\DataGrids\Configs\IRendering /*\MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\IRendering*/ $configRendering) {
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
	 * @inheritDoc
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
	 * @inheritDoc
	 * @param  \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales $configRendering
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	#[\ReturnTypeWillChange]
	public function SetConfigLocales (\MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\ILocales $configLocales) {
		$this->configLocales = $configLocales;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	#[\ReturnTypeWillChange]
	public function GetConfigLocales () {
		if ($this->configLocales === NULL) {
			$this->configLocales = new \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales;
		}
		return $this->configLocales;
	}
	
	/**
	 * @inheritDoc
	 * @param  string $jsClassFullName 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetJsClassFullName ($jsClassFullName) {
		$this->jsClassFullName = $jsClassFullName;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return string
	 */
	public function GetJsClassFullName () {
		return $this->jsClassFullName;
	}
	
	/**
	 * @inheritDoc
	 * @param  bool $enabledColumnsOnly 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetEnabledColumnsOnly ($enabledColumnsOnly) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->enabledColumnsOnly = $enabledColumnsOnly;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return bool
	 */
	public function GetEnabledColumnsOnly () {
		return $this->enabledColumnsOnly;
	}
	
	/**
	 * @inheritDoc
	 * @param  int $rowSelection 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetRowSelection ($rowSelection) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->rowSelection = $rowSelection;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return int
	 */
	public function GetRowSelection () {
		return $this->rowSelection;
	}
	
	/**
	 * @inheritDoc
	 * @param  \DateInterval $timeZoneOffset 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetTimeZoneOffset (\DateInterval $timeZoneOffset) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->timeZoneOffset = $timeZoneOffset;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return \DateInterval|NULL
	 */
	public function GetTimeZoneOffset () {
		if ($this->timeZoneOffset === NULL) {
			$this->timeZoneOffset = new \DateInterval("PT0H0M0S");
		}
		return $this->timeZoneOffset;
	}
	
	/**
	 * @inheritDoc
	 * @param  bool $clientCache 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetClientCache ($clientCache) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->clientCache = $clientCache;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return bool
	 */
	public function GetClientCache () {
		return $this->clientCache;
	}
	
	/**
	 * @inheritDoc
	 * @param  int $clientPageMode 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetClientPageMode ($clientPageMode) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->clientPageMode = $clientPageMode;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return int|NULL
	 */
	public function GetClientPageMode () {
		return $this->clientPageMode;
	}
	
	/**
	 * @inheritDoc
	 * @param  int $clientRequestBlockSize 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetClientRequestBlockSize ($clientRequestBlockSize) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->clientRequestBlockSize = $clientRequestBlockSize;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return int|NULL
	 */
	public function GetClientRequestBlockSize () {
		return $this->clientRequestBlockSize;
	}
	
	/**
	 * @inheritDoc
	 * @param  int $clientRowBuffer 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetClientRowBuffer ($clientRowBuffer) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->clientRowBuffer = $clientRowBuffer;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return int|NULL
	 */
	public function GetClientRowBuffer () {
		return $this->clientRowBuffer;
	}
	
	/**
	 * @inheritDoc
	 * @param  int|NULL $clientMaxRowsInCache 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetClientMaxRowsInCache ($clientMaxRowsInCache) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->clientMaxRowsInCache = $clientMaxRowsInCache;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return int|NULL
	 */
	public function GetClientMaxRowsInCache () {
		return $this->clientMaxRowsInCache;
	}

	/**
	 * @inheritDoc
	 * @param  bool $clientChangeHistory 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetClientChangeHistory ($clientChangeHistory) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->clientChangeHistory = $clientChangeHistory;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return bool
	 */
	public function GetClientChangeHistory () {
		return $this->clientChangeHistory;
	}
	
	/**
	 * @inheritDoc
	 * @param  string|NULL $clientTitleTemplate
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetClientTitleTemplate ($clientTitleTemplate) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->clientTitleTemplate = $clientTitleTemplate;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return string|NULL
	 */
	public function GetClientTitleTemplate () {
		return $this->clientTitleTemplate;
	}
	
	/**
	 * @inheritDoc
	 * @param  int $dataRequestMethod 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetDataRequestMethod ($dataRequestMethod) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->dataRequestMethod = $dataRequestMethod;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return int
	 */
	public function GetDataRequestMethod () {
		return $this->dataRequestMethod;
	}
	
	/**
	 * @inheritDoc
	 * @param  string $urlData 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetUrlData ($urlData) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->urlData = $urlData;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return string|NULL
	 */
	public function GetUrlData () {
		return $this->urlData;
	}
	
	/**
	 * @inheritDoc
	 * @param  string $urlColumnsStates
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetUrlColumnsStates ($urlColumnsStates) {
		$this->urlColumnsStates = $urlColumnsStates;
		return $this;
	}
	
	/**
	 * @inheritDoc
	 * @return string
	 */
	public function GetUrlColumnsStates () {
		if ($this->urlColumnsStates === NULL) {
			$gridParam = rtrim(rawurldecode($this->gridRequest->GetPath()), '/');
			$controllerClass = get_parent_class(get_parent_class(__CLASS__));
			$this->urlColumnsStates = $controllerClass::Url($this->appRouteName, [
				static::URL_PARAM_GRID		=> $gridParam,
				static::URL_PARAM_ACTION	=> static::GRID_ACTION_COLUMNS_STATES,
			]);
		}
		return $this->urlColumnsStates;
	}
	
	/**
	 * @inheritDoc
	 * @param  string $urlColumnsChanges
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetUrlColumnsChanges ($urlColumnsChanges) {
		$this->urlColumnsChanges = $urlColumnsChanges;
		return $this;
	}
	
	/**
	 * @inheritDoc
	 * @return string
	 */
	public function GetUrlColumnsChanges () {
		if ($this->urlColumnsChanges === NULL) {
			$gridParam = rtrim(rawurldecode($this->gridRequest->GetPath()), '/');
			$controllerClass = get_parent_class(get_parent_class(__CLASS__));
			$this->urlColumnsChanges = $controllerClass::Url($this->appRouteName, [
				static::URL_PARAM_GRID		=> $gridParam,
				static::URL_PARAM_ACTION	=> static::GRID_ACTION_COLUMNS_CHANGES,
			]);
		}
		return $this->urlColumnsChanges;
	}
	
	/**
	 * @inheritDoc
	 * @param  \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerColumnsRead|callable $handlerColumnsRead 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetHandlerColumnsRead ($handlerColumnsRead) {
		$this->handlerColumnsRead = $handlerColumnsRead;
		return $this;
	}
	
	/**
	 * @inheritDoc
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerColumnsRead|callable
	 */
	public function GetHandlerColumnsRead () {
		return $this->handlerColumnsRead;
	}
	
	/**
	 * @inheritDoc
	 * @param  \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerColumnsWrite|callable $handlerColumnsRead 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetHandlerColumnsWrite ($handlerColumnsWrite) {
		$this->handlerColumnsWrite = $handlerColumnsWrite;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerColumnsWrite|callable
	 */
	public function GetHandlerColumnsWrite () {
		return $this->handlerColumnsWrite;
	}
	
	/**
	 * @inheritDoc
	 * @param  array<string, string> $ajaxParamsNames 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetAjaxParamsNames (array $ajaxParamsNames) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrid $this */
		$this->ajaxParamsNames = $ajaxParamsNames;
		return $this;
	}

	/**
	 * @inheritDoc
	 * @return array<string, string>
	 */
	public function GetAjaxParamsNames () {
		return $this->ajaxParamsNames;
	}
	
	/**
	 * @inheritDoc
	 * @param  \int[] $countScales
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetCountScales (array $countScales) {
		parent::SetCountScales($countScales);
		$this->countScalesCustomized = TRUE;
		return $this;
	}
	
}