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
 * @mixin \MvcCore\Ext\Models\Db\Model
 */
trait GridRow {
	
	/**
	 * Cache for local instance properties to serialize in JSON data.
	 * @var array<string, bool>|NULL
	 */
	protected static $activeColumns = NULL;
	
	/**
	 * @inheritDocs
	 * @param array $jsonProperties 
	 */
	public static function SetActiveColumns (array $activeColumns) {
		self::$activeColumns = $activeColumns;
	}

	/**
	 * @inheritDocs
	 * @param  array $data       Raw data from database (row) or from form fields.
	 * @param  int   $propsFlags All properties flags are available.
	 * @throws \InvalidArgumentException
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Models\GridRow Current `$this` context.
	 */
	public function SetValues ($data = [], $propsFlags = 0) {
		foreach ($data as $dbKey => $dbValue) {
			if (!isset(static::$activeColumns[$dbKey])) 
				continue;
			list(
				$propIsPrivate, $propAllowNulls, $propTypes, $propertyName, $propFormatArgs
			) = static::$activeColumns[$dbKey];
			if ($dbValue === NULL) {
				if (!$propAllowNulls) continue;
				$value = NULL;
			} else {
				$value = static::parseToTypes(
					$dbValue, $propTypes, $propFormatArgs
				);
			}
			if ($propIsPrivate) {
				$prop = new \ReflectionProperty($this, $propertyName);
				$prop->setAccessible(TRUE);
				$prop->setValue($this, $value);
			} else {
				$this->{$propertyName} = $value;
			}
		}
		return $this;
	}


	/**
	 * @inheritDocs
	 * @param  int $propsFlags
	 * @return array<string, mixed>
	 */
	#[\ReturnTypeWillChange]
	public function jsonSerialize ($propsFlags = 0) {
		$phpWithTypes = PHP_VERSION_ID >= 70400;
		$result = [];
		$nonGridProps = static::GetJsonNonGridProps();
		foreach (static::$activeColumns as $activeColumn) {
			list(
				$propIsPrivate, /*$propAllowNulls*/, /*$propTypes*/, $propertyName, /*$propFormatArgs*/
			) = $activeColumn;
			if (isset($nonGridProps[$propertyName]))
				continue;
			$propValue = NULL;
			if ($propIsPrivate) {
				$prop = new \ReflectionProperty($this, $propertyName);
				$prop->setAccessible(TRUE);
				if ($phpWithTypes) {
					if ($prop->isInitialized($this))
						$propValue = $prop->getValue($this);
				} else {
					$propValue = $prop->getValue($this);
				}
			} else if (isset($this->{$propertyName})) {
				$propValue = $this->{$propertyName};
			}
			$result[$propertyName] = $propValue;
		}
		return $result;
	}
}