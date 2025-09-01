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

namespace MvcCore\Ext\Controllers\DataGrids\AgGrids;

interface IHandlerColumnsWrite {
	
	/**
	 * Custom handler to write user column configurations into any place.
	 * @param  string $idGrid 
	 * @param  ?int   $idUser 
	 * @param  \MvcCore\Ext\Controllers\DataGrids\AgGrids\Iterators\PersistentColumns $persistentColumns 
	 * @return void
	 */
	public function __invoke ($idGrid, $idUser, \MvcCore\Ext\Controllers\DataGrids\AgGrids\Iterators\PersistentColumns $persistentColumns);

}