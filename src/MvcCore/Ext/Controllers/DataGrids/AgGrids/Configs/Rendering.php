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

class Rendering extends \MvcCore\Ext\Controllers\DataGrids\Configs\Rendering {
	
	/**
	 * Datagrid view full class name.
	 * @var string|\MvcCore\Ext\Controllers\DataGrids\View|\MvcCore\View
	 */
	protected $viewClass = '\\MvcCore\\Ext\\Controllers\\DataGrids\\AgGrids\\View';

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
	 * @param  string|\string[] $cssClasses
	 */
	public function SetCssClassesControlsWrapper ($cssClasses) {
		$this->notImplementedException('cssClassesControlsWrapper');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  string|\string[] $cssClasses
	 */
	public function AddCssClassesControlsWrapper ($cssClasses) {
		$this->notImplementedException('cssClassesControlsWrapper');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetCssClassesControlsWrapper () {
		$this->notImplementedException('cssClassesControlsWrapper');
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
	 * @param  string $templateControlPaging
	 */
	public function SetTemplateControlPaging ($templateControlPaging) {
		$this->notImplementedException('templateControlPaging');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetTemplateControlPaging () {
		$this->notImplementedException('templateControlPaging');
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
	 * @param  string $templateControlCountScales
	 */
	public function SetTemplateControlCountScales ($templateControlCountScales) {
		$this->notImplementedException('templateControlCountScales');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetTemplateControlCountScales () {
		$this->notImplementedException('templateControlCountScales');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 * @param  string $templateControlStatus
	 */
	public function SetTemplateControlStatus ($templateControlStatus) {
		$this->notImplementedException('templateControlStatus');
	}

	/**
	 * @inheritDocs
	 * @throws \Exception
	 */
	public function GetTemplateControlStatus () {
		$this->notImplementedException('templateControlStatus');
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