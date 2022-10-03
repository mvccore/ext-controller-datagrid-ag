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
			$secondType = 'dateTime';
			if (count($types) > 1)
				$secondType = $types[1];
			if ($secondType === 'date') {
				if ($result->GetParserArgs() === NULL)
					$result->SetParserArgs($this->configLocales->GetParserArgsDate());
				if ($result->GetFormatArgs() === NULL)
					$result->SetFormatArgs($this->configLocales->GetFormatArgsDate());
			} else if ($secondType === 'dateTime') {
				if ($result->GetParserArgs() === NULL)
					$result->SetParserArgs($this->configLocales->GetParserArgsDateTime());
				if ($result->GetFormatArgs() === NULL)
					$result->SetFormatArgs($this->configLocales->GetFormatArgsDateTime());
			} else if ($secondType === 'time') {
				if ($result->GetParserArgs() === NULL)
					$result->SetParserArgs($this->configLocales->GetParserArgsTime());
				if ($result->GetFormatArgs() === NULL)
					$result->SetFormatArgs($this->configLocales->GetFormatArgsTime());
			}
		}
		return $result;
	}

}
