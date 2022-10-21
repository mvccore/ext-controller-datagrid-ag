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
		if ($this->ajaxDataRequest) {
			if ($this->view === NULL) {}
				$this->view = $this->createView(TRUE);
			$this->view->grid = $this;
				
			/** @var \MvcCore\Controller $parentOfParentClass */
			$parentOfParentClass = get_parent_class(get_parent_class(__CLASS__));
			$parentOfParentClass::PreDispatch();
				
			$this->LoadModel();
			$this->preDispatchPage();
			if (!$this->preDispatchTotalCount()) return;
			$this->preDispatchTranslations();
			if ($this->clientPageMode === IConstants::CLIENT_PAGE_MODE_SINGLE)
				$this->configRendering->SetRenderControlPaging(\MvcCore\Ext\Controllers\IDataGrid::CONTROL_DISPLAY_NEVER);
			$this->preDispatchPaging();
			$this->preDispatchCountScales();
		} else {
			if ($this->dispatchState >= \MvcCore\IController::DISPATCH_STATE_PRE_DISPATCHED) return;
			parent::PreDispatch();
			if ($this->dispatchState > \MvcCore\IController::DISPATCH_STATE_PRE_DISPATCHED) return;
			$this->preDispatchLocales();
			$this->preDispatchAssets();
		}
	}
	
	/**
	 * Set up model instance and call database for total count.
	 * @throws \InvalidArgumentException 
	 * @return void
	 */
	public function LoadModel () {
		if ($this->rowClassIsActiveColumnsModel)
			$this->SetUpRowModelActiveColumns();
		parent::LoadModel();
	}
	
	/**
	 * Set active columns collection into row class.
	 * @return void
	 */
	public function SetUpRowModelActiveColumns () {
		$rowFullClassName = $this->GetRowClass();
		$rowClassPropsFlags = $this->rowClassPropsFlags !== 0
			? $this->rowClassPropsFlags
			: ($this->rowClassIsExtendedModel
				? $rowFullClassName::GetDefaultPropsFlags()
				: \MvcCore\IModel::PROPS_INHERIT_PROTECTED
			);
		$activeColumns = $this->GetConfigColumns($this->GetEnabledColumnsOnly());
		list ($metaData, $sourceCodeNamesMap) = $rowFullClassName::GetMetaData(
			$rowClassPropsFlags, [\MvcCore\Ext\Models\Db\Model\IConstants::METADATA_BY_CODE]
		);
		$activeColumnsMap = [];
		/** @var $activeColumns \MvcCore\Ext\Controllers\DataGrids\Configs\Column[] */
		foreach ($activeColumns as $configColumn) {
			$propertyName = $configColumn->GetPropName();
			$activeColumnsKey = $configColumn->GetDbColumnName();
			if ($activeColumnsKey === NULL)
				$activeColumnsKey = $propertyName;
			$propIsPrivate = FALSE;
			$propAllowNulls = TRUE;
			if (isset($sourceCodeNamesMap[$propertyName])) {
				$metaDataIndex = $sourceCodeNamesMap[$propertyName];
				list($propIsPrivate, $propAllowNulls) = $metaData[$metaDataIndex];
			}
			$activeColumnsMap[$activeColumnsKey] = [
				$propIsPrivate, 
				$propAllowNulls, 
				$configColumn->GetTypes(), 
				$propertyName, 
				$configColumn->GetParserArgs(), 
				$configColumn->GetFormatArgs()
			];
		};
		$rowFullClassName::SetActiveColumns($activeColumnsMap);
	}


	/**
	 * 
	 * @return void
	 */
	protected function preDispatchPage () {
		if ($this->page === NULL && $this->clientPageMode === IConstants::CLIENT_PAGE_MODE_MULTI) {
			$displayingCount = $this->count;
			if (
				$displayingCount === 0 && (
					$this->configRendering->GetRenderControlPaging() & static::CONTROL_DISPLAY_ALWAYS
				) != 0
			) $displayingCount = $this->totalCount;
			$this->page = $this->intdiv($this->offset, $displayingCount) + 1;
			$this->urlParams[self::URL_PARAM_PAGE] = $this->page;
		}
	}

	/**
	 * Check if pages count is larger or at least the same as page number from URL.
	 * @return bool
	 */
	protected function preDispatchTotalCount () {
		if ($this->ajaxDataRequest) {
			// Do not process redirections for ajax requests, 
			// because page param is not used to define result data.
			// If offset is to high, there is returned empty result and it OK.
			return TRUE;
		} else if ($this->clientPageMode === IConstants::CLIENT_PAGE_MODE_SINGLE) {
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
	 * Translate if necessary:
	 * - controls texts
	 * @return void
	 */
	protected function preDispatchTranslations () {
		if (!$this->translate) return;
		foreach ($this->controlsTexts as $key => $controlText)
			$this->controlsTexts[$key] = call_user_func_array(
				$this->translator, [$controlText, ['{0}', '{1}']]
			);
	}
	
	/**
	 * Switch rendering config boolean to render count scales control to 
	 * never render, if datagrid renders only single page and items per page value
	 * is greater than zero (items per page value is not set to unlimited value).
	 * Because than - the count scales control is completely useless.
	 * @return void
	 */
	protected function preDispatchCountScales () {
		$renderCountScales = $this->configRendering->GetRenderControlCountScales();
		if (!$renderCountScales) return;
		$multiplePages = $this->totalCount > $this->count && $this->count !== 0;
		if (!$multiplePages && ($renderCountScales & static::CONTROL_DISPLAY_IF_NECESSARY) != 0) 
			$this->configRendering->SetRenderControlCountScales(static::CONTROL_DISPLAY_NEVER);
	}
	
	/**
	 * 
	 * @return void
	 */
	protected function preDispatchLocales () {
		$this->GetConfigLocales()->Init();
	}

	/**
	 * 
	 * @return void
	 */
	protected function preDispatchAssets () {
		$gridView = $this->view;
		$assetsGroupsCss = $gridView->GetGridAssetsGroupsCss();
		$assetsGroupsJs = $gridView->GetGridAssetsGroupsJs();
		$args = [$assetsGroupsCss, $assetsGroupsJs, $this->parentController, $this];
		$handlerAssets = $this->configRendering->GetHandlerAssets();
		if (
			is_callable($handlerAssets) || 
			$handlerAssets instanceof \MvcCore\Ext\Controllers\DataGrids\AgGrids\IHandlerAssets
		) {
			call_user_func_array($handlerAssets, $args);
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