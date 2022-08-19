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
trait PreDispatchMethods {

	/**
	 * Process necessary operations for rendering 
	 * and set up and call model instance total count.
	 * @inheritDocs
	 * @return void
	 */
	public function PreDispatch () {
		if ($this->ajaxDataRequest) return;
		if ($this->dispatchState >= \MvcCore\IController::DISPATCH_STATE_PRE_DISPATCHED) return;
		parent::PreDispatch();
		if ($this->dispatchState > \MvcCore\IController::DISPATCH_STATE_PRE_DISPATCHED) return;
		$this->preDispatchAssets();
	}

	/**
	 * Switch necessary rendering config booleans to `FALSE`
	 * if sorting or filtering is completely disabled.
	 * @return void
	 */
	protected function preDispatchRenderConfig () {
		parent::preDispatchRenderConfig();
		if ($this->clientPageMode === IConstants::CLIENT_PAGE_MODE_SINGLE) {
			$this->configRendering
				->SetRenderControlCountScales(IDataGrid::CONTROL_DISPLAY_NEVER)
				->SetRenderControlPaging(IDataGrid::CONTROL_DISPLAY_NEVER)
				->SetRenderControlStatus(IDataGrid::CONTROL_DISPLAY_NEVER)
				->SetRenderControlSorting(IDataGrid::CONTROL_DISPLAY_NEVER);
		}
	}

	/**
	 * Check if pages count is larger or at least the same as page number from URL.
	 * @return bool
	 */
	protected function preDispatchTotalCount () {
		if ($this->clientPageMode === IConstants::CLIENT_PAGE_MODE_SINGLE) {
			$pagesCountByTotalCount = ($this->clientRowBuffer > 0) 
				? intval(ceil(floatval($this->totalCount) / floatval($this->clientRowBuffer))) 
				: 0 ;
			// If user write to large page number to URL, redirect user to the last page.
			$page = $this->urlParams[static::URL_PARAM_PAGE];
			if ($page > $pagesCountByTotalCount && $pagesCountByTotalCount > 0) {
				$redirectUrl = $this->GridUrl([
					static::URL_PARAM_PAGE	=> $pagesCountByTotalCount,
				]);
				/** @var \MvcCore\Controller $this */
				$this::Redirect(
					$redirectUrl, 
					\MvcCore\IResponse::SEE_OTHER, 
					'Grid virtual page is too high by total count.'
				);
				return FALSE;
			}
			return TRUE;
		} else {
			return parent::preDispatchTotalCount();
		}
	}

	/**
	 * @return void
	 */
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