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

class		Rendering
extends		\MvcCore\Ext\Controllers\DataGrids\Configs\Rendering
implements	\MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\IRendering {
	
	/**
	 * @inheritDocs
	 * @var bool
	 */
	protected $renderFilterForm					= FALSE;

	/**
	 * @inheritDocs
	 * @var \string[]
	 */
	protected $cssClassesContentTable			= ['grid-content'];

	/**
	 * AgGrid theme name.
	 * @var string|NULL
	 * @jsonSerialize
	 */
	#[JsonSerialize]
	protected $theme							= self::THEME_FRESH;
	
	/**
	 * Custom handler to assign all AgGrid assets response output.
	 * @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerAssets|callable|NULL
	 */
	protected $handlerAssets					= NULL;

	/**
	 * Table head filtering html title attribute.
	 * @jsonSerialize
	 * @var string|NULL
	 */
	#[JsonSerialize]
	protected $tableHeadFilteringTitle			= NULL;

	/**
	 * Render control with button to refresh datagrid data (only AgGrid datagrid type).
	 * This control is always rendered by default.
	 * @jsonSerialize
	 * @var int
	 */
	#[JsonSerialize]
	protected $renderControlRefresh				= \MvcCore\Ext\Controllers\IDataGrid::CONTROL_DISPLAY_ALWAYS;

	/**
	 * Css classes for datagrid refresh control (only AgGrid datagrid type).
	 * @jsonSerialize
	 * @var \string[]
	 */
	#[JsonSerialize]
	protected $cssClassesControlRefresh			= ['grid-control-refresh'];

	/**
	 * Css classes for datagrid refresh control button (only AgGrid datagrid type).
	 * @jsonSerialize
	 * @var \string[]
	 */
	#[JsonSerialize]
	protected $cssClassesControlRefreshButton	= ['grid-refresh-link'];
	
	/**
	 * Custom datagrid refresh control template (only AgGrid datagrid type).
	 * Relative from `/App/Views/Scripts` without file extension.
	 * @var string|NULL
	 */
	protected $templateControlRefresh			= NULL;

	/**
	 * Datagrid view full class name.
	 * @var string|\MvcCore\Ext\Controllers\DataGrids\View|\MvcCore\View
	 */
	protected $viewClass				= '\\MvcCore\\Ext\\Controllers\\DataGrids\\AgGrids\\View';

	
	/**
	 * @inheritDocs
	 * @param  string $theme
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetTheme ($theme) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->theme = $theme;
		return $this;
	}

	/**
	 * @inheritDocs
	 * @return string|NULL
	 */
	public function GetTheme () {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		return $this->theme;
	}
	
	/**
	 * @inheritDocs
	 * @param  \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerAssets|callable|NULL $handlerAssets 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetHandlerAssets ($handlerAssets) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->handlerAssets = $handlerAssets;
		return $this;
	}

	/**
	 * @inheritDocs
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerAssets|callable|NULL
	 */
	public function GetHandlerAssets () {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		return $this->handlerAssets;
	}
	
	/**
	 * @inheritDocs
	 * @param  string|NULL $tableHeadFilteringTitle
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetTableHeadFilteringTitle ($tableHeadFilteringTitle) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->tableHeadFilteringTitle = $tableHeadFilteringTitle;
		return $this;
	}

	/**
	 * @inheritDocs
	 * @return string|NULL
	 */
	public function GetTableHeadFilteringTitle () {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		return $this->tableHeadFilteringTitle;
	}
	
	/**
	 * @inheritDocs
	 * @param  int $renderControlRefresh
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetRenderControlRefresh ($renderControlRefresh = \MvcCore\Ext\Controllers\IDataGrid::CONTROL_DISPLAY_ALWAYS) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->renderControlRefresh = $renderControlRefresh;
		return $this;
	}

	/**
	 * @inheritDocs
	 * @return int
	 */
	public function GetRenderControlRefresh () {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		return $this->renderControlRefresh;
	}

	/**
	 * @inheritDocs
	 * @param string|\string[] $cssClasses
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetCssClassesControlRefresh ($cssClasses) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->cssClassesControlRefresh = is_array($cssClasses)
			? $cssClasses
			: explode(' ', (string) $cssClasses);
		return $this;
	}

	/**
	 * @inheritDocs
	 * @param string|\string[] $cssClasses
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function AddCssClassesControlRefresh ($cssClasses) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$cssClassesArr = is_array($cssClasses)
			? $cssClasses
			: explode(' ', (string) $cssClasses);
		$this->cssClassesControlRefresh = array_merge($this->cssClassesControlRefresh, $cssClassesArr);
		return $this;
	}

	/**
	 * @inheritDocs
	 * @return \string[]
	 */
	public function GetCssClassesControlRefresh () {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		return $this->cssClassesControlRefresh;
	}

	/**
	 * @inheritDocs
	 * @param  string|\string[] $cssClasses
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetCssClassesControlRefreshButton ($cssClasses) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->cssClassesControlRefreshButton = is_array($cssClasses)
			? $cssClasses
			: explode(' ', (string) $cssClasses);
		return $this;
	}

	/**
	 * @inheritDocs
	 * @param  string|\string[] $cssClasses
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function AddCssClassesControlRefreshButton ($cssClasses) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$cssClassesArr = is_array($cssClasses)
			? $cssClasses
			: explode(' ', (string) $cssClasses);
		$this->cssClassesControlRefreshButton = array_merge($this->cssClassesControlRefreshButton, $cssClassesArr);
		return $this;
	}

	/**
	 * @inheritDocs
	 * @return \string[]
	 */
	public function GetCssClassesControlRefreshButton () {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		return $this->cssClassesControlRefreshButton;
	}

	/**
	 * @inheritDocs
	 * @param  string $templateControlRefresh
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetTemplateControlRefresh ($templateControlRefresh) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->templateControlRefresh = $templateControlRefresh;
		return $this;
	}

	/**
	 * @inheritDocs
	 * @return string
	 */
	public function GetTemplateControlRefresh () {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		return $this->templateControlRefresh;
	}

	
	#region NOT IMPLEMENTED METHODS FROM PARENT CLASS

	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  int $type
	 */
	public function SetType ($type = \MvcCore\Ext\Controllers\IDataGrid::TYPE_TABLE) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->notImplementedException('type');
	}
	
	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  int $gridColumnsCount
	 */
	public function SetGridColumnsCount ($gridColumnsCount) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->notImplementedException('gridColumnsCount');
	}
	
	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetGridColumnsCount () {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->notImplementedException('gridColumnsCount');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  bool $renderFilterForm
	 */
	public function SetRenderFilterForm ($renderFilterForm) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->notImplementedException('renderFilterForm');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetRenderFilterForm () {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->notImplementedException('renderFilterForm');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  string|\string[] $cssClasses
	 */
	public function SetCssClassesContentTable ($cssClasses) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->notImplementedException('cssClassesContentTable');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  string|\string[] $cssClasses
	 */
	public function AddCssClassesContentTable ($cssClasses) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->notImplementedException('cssClassesContentTable');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetCssClassesContentTable () {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->notImplementedException('cssClassesContentTable');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  string $templateTableHead
	 */
	public function SetTemplateTableHead ($templateTableHead) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->notImplementedException('templateTableHead');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetTemplateTableHead () {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->notImplementedException('templateTableHead');
	}
	
	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  string $templateTableBody
	 */
	public function SetTemplateTableBody ($templateTableBody) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->notImplementedException('templateTableBody');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetTemplateTableBody () {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->notImplementedException('templateTableBody');
	}
	
	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  string $templateGridBody
	 */
	public function SetTemplateGridBody ($templateGridBody) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->notImplementedException('templateGridBody');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetTemplateGridBody () {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->notImplementedException('templateGridBody');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  string $templateControlSorting
	 */
	public function SetTemplateControlSorting ($templateControlSorting) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->notImplementedException('templateControlSorting');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetTemplateControlSorting () {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->notImplementedException('templateControlSorting');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  string $templateFilterForm
	 */
	public function SetTemplateFilterForm ($templateFilterForm) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->notImplementedException('templateFilterForm');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetTemplateFilterForm () {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		$this->notImplementedException('templateFilterForm');
	}
	
	/**
	 * @throws \Exception
	 * @param  string $propName 
	 */
	protected function notImplementedException ($propName) {
		/** @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering $this */
		throw new \Exception(
			"[" . get_class($this) . "] Property `" . $propName 
			. "` is not implemented in AgGrid rendering config."
		);
	}

	#endregion NOT IMPLEMENTED METHODS FROM PARENT CLASS
}