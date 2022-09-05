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

namespace MvcCore\Ext\Controllers\DataGrids\AgGrids\Models;

/**
 * @mixin \MvcCore\Model|\MvcCore\Ext\Models\Db\Model
 */
trait GridModel {
	
	/**
	 * 
	 * @param  string $rowClassFullName 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Models\GridModel
	 */
	public function SetRowModelActiveColumns ($rowClassFullName, $propsFlags = 0) {
		$activeColumns = $this->grid->GetConfigColumns(
			$this->grid->GetEnabledColumnsOnly()	
		);
		if ($propsFlags === 0) 
			$propsFlags = static::$defaultPropsFlags;
		list ($metaData, $sourceCodeNamesMap) = $rowClassFullName::GetMetaData(
			$propsFlags, [\MvcCore\Ext\Models\Db\Model\IConstants::METADATA_BY_CODE]
		);
		$activeColumnsMap = [];
		/** @var $activeColumns \MvcCore\Ext\Controllers\DataGrids\Configs\Column[] */
		foreach ($activeColumns as $configColumn) {
			$propertyName = $configColumn->GetPropName();
			if (!isset($sourceCodeNamesMap[$propertyName])) continue;
			$metaDataIndex = $sourceCodeNamesMap[$propertyName];
			list($propIsPrivate, $propAllowNulls) = $metaData[$metaDataIndex];
			$activeColumnsMap[$configColumn->GetDbColumnName()] = [
				$propIsPrivate, 
				$propAllowNulls, 
				$configColumn->GetTypes(), 
				$propertyName, 
				$configColumn->GetParserArgs(), 
				$configColumn->GetFormatArgs()
			];
		};
		$rowClassFullName::SetActiveColumns($activeColumnsMap);
		return $this;
	}

}
