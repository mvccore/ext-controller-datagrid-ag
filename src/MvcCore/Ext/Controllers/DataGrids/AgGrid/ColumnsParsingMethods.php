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

use \MvcCore\Ext\Controllers\DataGrids\Configs\Type as GridType;

/**
 * @mixin \MvcCore\Ext\Controllers\DataGrids\AgGrid
 */
trait ColumnsParsingMethods {
	
	/**
	 * Complete datagrid column config instance or `NULL`.
	 * @param  \ReflectionProperty  $prop
	 * @param  int                  $index
	 * @param  array                $modelMetaData
	 * @param  bool                 $attrsAnotations
	 * @param  string|\MvcCore\Tool $toolClass
	 * @return \MvcCore\Ext\Controllers\DataGrids\Configs\Column|NULL
	 */
	protected function parseConfigColumn (
		\ReflectionProperty $prop, $index, $modelMetaData, $attrsAnotations, $toolClass
	) {
		$result = parent::parseConfigColumn(
			$prop, $index, $modelMetaData, $attrsAnotations, $toolClass
		);
		if ($result !== NULL && $result->GetIsDateTime()) {
			/** @var \MvcCore\Ext\Controllers\DataGrids\Configs\Column $result */
			$types = $result->GetTypes();
			$clientType = GridType::CLIENT_DATETIME;
			if (count($types) > 1)
				$clientType = $types[1];
			$configLocales = $this->GetConfigLocales();
			if ($clientType === GridType::CLIENT_DATE) {
				if ($result->GetParserArgs() === NULL)
					$result->SetParserArgs($configLocales->GetParserArgsDate());
				if ($result->GetFormatArgs() === NULL)
					$result->SetFormatArgs($configLocales->GetFormatArgsDate());
			} else if ($clientType === GridType::CLIENT_DATETIME) {
				if ($result->GetParserArgs() === NULL)
					$result->SetParserArgs($configLocales->GetParserArgsDateTime());
				if ($result->GetFormatArgs() === NULL)
					$result->SetFormatArgs($configLocales->GetFormatArgsDateTime());
			} else if ($clientType === GridType::CLIENT_TIME) {
				if ($result->GetParserArgs() === NULL)
					$result->SetParserArgs($configLocales->GetParserArgsTime());
				if ($result->GetFormatArgs() === NULL)
					$result->SetFormatArgs($configLocales->GetFormatArgsTime());
			}
		}
		return $result;
	}

}
