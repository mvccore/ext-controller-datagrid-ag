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

namespace MvcCore\Ext\Controllers\DataGrids;

use \MvcCore\Ext\Controllers\IDataGrid,
	\MvcCore\Ext\Controllers\DataGrids;

class AgGrid extends \MvcCore\Ext\Controllers\DataGrid {
	
	/**
	 * MvcCore Extension - Controller - DataGrid - Ag - version:
	 * Comparison by PHP function version_compare();
	 * @see http://php.net/manual/en/function.version-compare.php
	 */
	const VERSION = '5.1.0';

	/**
	 * @var string|NULL
	 */
	protected $id = NULL;

	/**
	 * @var \MvcCore\Ext\Controllers\DataGrids\AgGrids\IAssetsHandler|callable|NULL
	 */
	protected $assetsHandler = NULL;
	
	/**
	 * @param  string $id 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetId ($id) {
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
	 * @param  \MvcCore\Ext\Controllers\DataGrids\AgGrids\IAssetsHandler|callable|NULL $assetsHandler 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetAssetsHandler ($assetsHandler) {
		$this->assetsHandler = $assetsHandler;
		return $this;
	}

	/**
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\IAssetsHandler|callable|NULL
	 */
	public function GetAssetsHandler () {
		return $this->assetsHandler;
	}


	
	



	
	/**
	 * @inheritDocs
	 * @return void
	 */
	public function Init () {
		if ($this->dispatchState > \MvcCore\IController::DISPATCH_STATE_CREATED) return;
		
		$this->GetConfigRendering();
		
		//parent::Init();
		$parentOfParentClass = get_parent_class(get_parent_class(__CLASS__));
		$parentOfParentClass::Init();
		
		$this->GetConfigUrlSegments();
		$this->initTranslations();
		$this->GetConfigColumns(FALSE);
		$this->GetRoute();
		$this->GetUrlParams();
		
		$this->initGridAction();
		if (!$this->initUrlParams()) return; // redirect inside
		$this->initOffsetLimit();
		
		$this->initItemsPerPageByRoute();
		// TODO: line bellow maybe not for ajax
		if (!$this->initUrlBuilding()) return; // redirect inside
		$this->initOperators();
		
		$this->initSorting();
		if (!$this->initFiltering()) return; // redirect inside
		
		call_user_func([$this, $this->gridAction]);
	}


	/**
	 * Process necessary operations for rendering 
	 * and set up and call model instance total count.
	 * @inheritDocs
	 * @return void
	 */
	public function PreDispatch () {
		if ($this->dispatchState <= \MvcCore\IController::DISPATCH_STATE_INITIALIZED) 
			$this->Init();
		if ($this->dispatchState >= \MvcCore\IController::DISPATCH_STATE_PRE_DISPATCHED) return;
		
		if ($this->viewEnabled) {
			if ($this->view === NULL)
				$this->view = $this->createView(TRUE);
			$this->view->grid = $this;
		}

		//parent::PreDispatch();
		$parentOfParentClass = get_parent_class(get_parent_class(__CLASS__));
		$parentOfParentClass::PreDispatch();
		
		$this->LoadModel();
		
		$this->preDispatchTranslations();
		$this->preDispatchTotalCount();
		$this->preDispatchCountScales();
		$this->preDispatchRenderConfig();
		$this->preDispatchColumnsConfigs();
	}
}