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

namespace MvcCore\Ext\Controllers\DataGrids\AgGrids\Views;

trait TReverseHelper {

	use \MvcCore\Ext\Controllers\DataGrids\Views\TReverseHelper;

	/**
	 * Get valid javascript function as string to format cell value.
	 * Example:
	 * ```
	 * function (params, propName, parserArgs, formatArgs) {
	 *     return this.escape(params.data[propName] ? "Yes" : "No");
	 * }
	 * ```
	 * @return string
	 */
	public function GetJsFormatter (): string {
		return 'function (params, propName, parserArgs, formatArgs) { return this.escape(params.data[propName]); }';
	}
}