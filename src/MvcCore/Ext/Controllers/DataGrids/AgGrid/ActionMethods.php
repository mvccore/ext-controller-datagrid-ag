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
trait ActionMethods {
	
	/**
	 * @return void
	 */
	public function ActionData () {
		if (!$this->ajaxDataRequest) return;
		if ($this->dispatchState < \MvcCore\IController::DISPATCH_STATE_INITIALIZED) 
			$this->Init();
		if ($this->dispatchState < \MvcCore\IController::DISPATCH_STATE_PRE_DISPATCHED) 
			$this->PreDispatch();
		if ($this->dispatchState > \MvcCore\IController::DISPATCH_STATE_PRE_DISPATCHED) return;
		list($gridPath, $gridUrl) = $this->GetAjaxGridPathAndUrl();
		$response = (object) [
			'totalCount'	=> $this->totalCount,
			'offset'		=> $this->offset,
			'limit'			=> $this->limit,
			'sorting'		=> $this->GetAjaxSorting(),
			'filtering'		=> $this->GetAjaxFiltering(),
			'url'			=> $gridUrl,
			'path'			=> $gridPath,
			'dataCount'		=> count($this->pageData),
			'controls'		=> NULL,
			'data'			=> $this->pageData,
		];
		if ($this->clientPageMode === IConstants::CLIENT_PAGE_MODE_MULTI) {	
			$renderConf = $this->GetConfigRendering();
			$response->controls = (object) [
				'countScales'	=> NULL,
				'status'		=> NULL,
				'paging'		=> NULL,
			];
			if ($renderConf->GetRenderControlCountScales())
				$response->controls->countScales	= $this->view->RenderGridControlCountScales();
			if ($renderConf->GetRenderControlStatus())
				$response->controls->status			= $this->view->RenderGridControlStatus();
			if ($renderConf->GetRenderControlPaging())
				$response->controls->paging			= $this->view->RenderGridControlPaging();
		}
		$callbackParamName = $this->ajaxParamsNames[self::AJAX_PARAM_CALLBACK];
		if ($this->request->HasParam($callbackParamName)) {
			$this->JsonpResponse($response);
		} else {
			$this->JsonResponse($response);
		}
	}

	public function ActionColumnsStates () {
		xxx("ActionColumnsStates");

		$redirectUrl = rawurldecode($this->GridUrl([
			static::URL_PARAM_ACTION => NULL
		]));
		self::Redirect($redirectUrl, \MvcCore\IResponse::SEE_OTHER);
	}

	public function ActionColumnsWidths () {
		xxx("ActionColumnsWidths");

		$redirectUrl = rawurldecode($this->GridUrl([
			static::URL_PARAM_ACTION => NULL
		]));
		self::Redirect($redirectUrl, \MvcCore\IResponse::SEE_OTHER);
	}
}