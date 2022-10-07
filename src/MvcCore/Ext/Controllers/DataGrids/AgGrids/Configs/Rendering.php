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
	 * AgGrid theme name.
	 * @var string|NULL
	 * @jsonSerialize
	 */
	#[JsonSerialize]
	protected $theme = self::THEME_FRESH;
	
	/**
	 * Custom handler to assign all AgGrid assets response output.
	 * @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerAssets|callable|NULL
	 */
	protected $handlerAssets = NULL;

	/**
	 * Table head filtering html title attribute.
	 * @jsonSerialize
	 * @var string|NULL
	 */
	#[JsonSerialize]
	protected $tableHeadFilteringTitle = NULL;

	/**
	 * Datagrid view full class name.
	 * @var string|\MvcCore\Ext\Controllers\DataGrids\View|\MvcCore\View
	 */
	protected $viewClass = '\\MvcCore\\Ext\\Controllers\\DataGrids\\AgGrids\\View';

	
	/**
	 * Set AgGrid theme name.
	 * @param  string $theme
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetTheme ($theme) {
		$this->theme = $theme;
		return $this;
	}

	/**
	 * Get AgGrid theme name.
	 * @return string|NULL
	 */
	public function GetTheme () {
		return $this->theme;
	}
	
	/**
	 * Set custom handler to assign all AgGrid assets response output.
	 * @param  \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerAssets|callable|NULL $handlerAssets 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetHandlerAssets ($handlerAssets) {
		$this->handlerAssets = $handlerAssets;
		return $this;
	}

	/**
	 * Get custom handler to assign all AgGrid assets response output.
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerAssets|callable|NULL
	 */
	public function GetHandlerAssets () {
		return $this->handlerAssets;
	}
	
	/**
	 * Set table head filtering html title attribute.
	 * @param  string|NULL $tableHeadFilteringTitle
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Rendering
	 */
	public function SetTableHeadFilteringTitle ($tableHeadFilteringTitle) {
		$this->tableHeadFilteringTitle = $tableHeadFilteringTitle;
		return $this;
	}

	/**
	 * Get table head filtering html title attribute.
	 * @return string|NULL
	 */
	public function GetTableHeadFilteringTitle () {
		return $this->tableHeadFilteringTitle;
	}

	
	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  int $type
	 */
	public function SetType ($type = \MvcCore\Ext\Controllers\IDataGrid::TYPE_TABLE) {
		$this->notImplementedException('type');
	}
	
	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  int $gridColumnsCount
	 */
	public function SetGridColumnsCount ($gridColumnsCount) {
		$this->notImplementedException('gridColumnsCount');
	}
	
	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetGridColumnsCount () {
		$this->notImplementedException('gridColumnsCount');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  bool $renderFilterForm
	 */
	public function SetRenderFilterForm ($renderFilterForm) {
		$this->notImplementedException('renderFilterForm');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetRenderFilterForm () {
		$this->notImplementedException('renderFilterForm');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  string|\string[] $cssClasses
	 */
	public function SetCssClassesContentTable ($cssClasses) {
		$this->notImplementedException('cssClassesContentTable');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  string|\string[] $cssClasses
	 */
	public function AddCssClassesContentTable ($cssClasses) {
		$this->notImplementedException('cssClassesContentTable');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetCssClassesContentTable () {
		$this->notImplementedException('cssClassesContentTable');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  string $templateTableHead
	 */
	public function SetTemplateTableHead ($templateTableHead) {
		$this->notImplementedException('templateTableHead');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetTemplateTableHead () {
		$this->notImplementedException('templateTableHead');
	}
	
	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  string $templateTableBody
	 */
	public function SetTemplateTableBody ($templateTableBody) {
		$this->notImplementedException('templateTableBody');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetTemplateTableBody () {
		$this->notImplementedException('templateTableBody');
	}
	
	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  string $templateGridBody
	 */
	public function SetTemplateGridBody ($templateGridBody) {
		$this->notImplementedException('templateGridBody');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetTemplateGridBody () {
		$this->notImplementedException('templateGridBody');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  string $templateControlSorting
	 */
	public function SetTemplateControlSorting ($templateControlSorting) {
		$this->notImplementedException('templateControlSorting');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetTemplateControlSorting () {
		$this->notImplementedException('templateControlSorting');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  string $templateFilterForm
	 */
	public function SetTemplateFilterForm ($templateFilterForm) {
		$this->notImplementedException('templateFilterForm');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetTemplateFilterForm () {
		$this->notImplementedException('templateFilterForm');
	}
	
	/**
	 * @throws \Exception
	 * @param  string $propName 
	 */
	protected function notImplementedException ($propName) {
		throw new \Exception(
			"[" . get_class($this) . "] Property `" . $propName 
			. "` is not implemented in AgGrid rendering config."
		);
	}
}