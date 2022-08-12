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
	 * Client row selection mode.
	 * @var int
	 */
	const 
		ROW_SELECTION_NONE			= 1,
		ROW_SELECTION_SINGLE		= 2,
		ROW_SELECTION_MULTIPLE		= 4,
		ROW_SELECTION_NOT_DESELECT	= 8;

	/**
	 * @var string
	 */
	protected static $jsClassFullName = 'MvcCore.Ext.Controllers.DataGrids.AgGrid';

	/**
	 * @var string|NULL
	 */
	protected $id = NULL;

	/**
	 * @var string|NULL
	 */
	protected $dataUrl = NULL;

	/**
	 * @var int|NULL
	 */
	protected $rowSelection = self::ROW_SELECTION_NONE;
	
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
	 * @param  string $dataUrl 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetDataUrl ($dataUrl) {
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
	 * @param  int $rowSelection 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrid
	 */
	public function SetRowSelection ($rowSelection) {
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
			$this->view->jsClassFullName = static::$jsClassFullName;
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

		$this->preDispatchAssets();
	}

	protected function preDispatchAssets () {
		$gridView = $this->view;
		$assetsGroupsCss = $gridView->GetGridAssetsGroupsCss();
		$assetsGroupsJs = $gridView->GetGridAssetsGroupsJs();
		$args = [$assetsGroupsCss, $assetsGroupsJs, $this->parentController, $this];
		$assetsHandler = $this->configRendering->GetAssetsHandler();
		if (
			is_callable($assetsHandler) || 
			$assetsHandler instanceof \MvcCore\Ext\Controllers\DataGrids\AgGrids\IAssetsHandler
		) {
			call_user_func_array($assetsHandler, $args);
		} else {
			$ctrlView = $this->parentController->GetView();
			$cssVarHead = $ctrlView->Css($gridView::ASSETS_BUNDLE_DEFAULT_NAME_CSS);
			$jsVarHead = $ctrlView->Js($gridView::ASSETS_BUNDLE_DEFAULT_NAME_JS);
			foreach ($assetsGroupsCss as $assetsGroupCss) {
				if (count($assetsGroupCss->paths) === 0) continue;
				foreach ($assetsGroupCss->paths as $assetsGroupCssPath)
					$cssVarHead->VendorAppend(
						$assetsGroupCssPath,
						$assetsGroupCss->media,
						$assetsGroupCss->notMin
					);
			}
			foreach ($assetsGroupsJs as $assetsGroupJs) {
				if (count($assetsGroupJs->paths) === 0) continue;
				foreach ($assetsGroupJs->paths as $assetsGroupJsPath)
					$jsVarHead->VendorAppend(
						$assetsGroupJsPath,
						$assetsGroupJs->async,
						$assetsGroupJs->defer,
						$assetsGroupJs->notMin
					);
			}
		}
	}
}