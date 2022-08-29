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

namespace MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs;

interface ILocales {
	
	/**
	 * @var string
	 */
	const SYSTEM_LOCALE_SEPARATOR	= '-';

	/**
	 * @var int
	 */
	const FRACTIONS_DEFAULT_FLOAT	= 2;
	
	/**
	 * @var int
	 */
	const FRACTIONS_DEFAULT_CURRENCY= 2;

	/**
	 * @var string
	 */
	const FORMAT_PATTERN_DATE		= 'YYYY-MM-DD';
	
	/**
	 * @var string
	 */
	const FORMAT_PATTERN_DATE_TIME	= 'YYYY-MM-DD HH:mm:ss';
	
	/**
	 * @var string
	 */
	const FORMAT_PATTERN_TIME		= 'HH:mm:ss';


	/**
	 * @return void
	 */
	public function Init ();

	/**
	 * @inheritDocs
	 * @return \string[]|NULL
	 */
	public function GetLocaleNumeric ();

	/**
	 * @inheritDocs
	 * @param  \string[]|NULL $localeNumeric
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetLocaleNumeric ($localeNumeric);

	/**
	 * @inheritDocs
	 * @return \string[]|NULL
	 */
	public function GetLocaleMoney ();

	/**
	 * @inheritDocs
	 * @param  \string[]|NULL $localeMoney
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetLocaleMoney ($localeMoney);
	
	/**
	 * @inheritDocs
	 * @return \string[]|NULL
	 */
	public function GetLocaleDateTime ();

	/**
	 * @inheritDocs
	 * @param  \string[]|NULL $localeDateTime
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetLocaleDateTime ($localeDateTime);
	
	/**
	 * @inheritDocs
	 * @return string|NULL
	 */
	public function GetCurrencyCode ();

	/**
	 * @inheritDocs
	 * @param  string|NULL $currencyCode 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetCurrencyCode ($currencyCode);
	
	/**
	 * @inheritDocs
	 * @return string|NULL
	 */
	public function GetCurrencySign ();

	/**
	 * @inheritDocs
	 * @param  string|NULL $currencyCode 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetCurrencySign ($currencySign);

	/**
	 * @inheritDocs
	 * @return int|NULL
	 */
	public function GetCurrencyFractions ();

	/**
	 * @inheritDocs
	 * @param  int|NULL $currencyFractions 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetCurrencyFractions ($currencyFractions);
	
	/**
	 * @inheritDocs
	 * @return int|NULL
	 */
	public function GetFloatFractions ();

	/**
	 * @inheritDocs
	 * @param  int|NULL $floatFractions 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetFloatFractions ($floatFractions);
	
	/**
	 * @inheritDocs
	 * @return string|NULL
	 */
	public function GetFormatPatternDate ();

	/**
	 * @inheritDocs
	 * @param  string|NULL $currencyCode 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetFormatPatternDate ($formatPatternDate);
	
	/**
	 * @inheritDocs
	 * @return string|NULL
	 */
	public function GetFormatPatternDateTime ();

	/**
	 * @inheritDocs
	 * @param  string|NULL $currencyCode 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetFormatPatternDateTime ($formatPatternDateTime);
	
	/**
	 * @inheritDocs
	 * @return string|NULL
	 */
	public function GetFormatPatternTime ();

	/**
	 * @inheritDocs
	 * @param  string|NULL $currencyCode 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetFormatPatternTime ($formatPatternTime);
}