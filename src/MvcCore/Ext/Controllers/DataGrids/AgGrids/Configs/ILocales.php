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
	 * 
	 * @var string
	 */
	const SYSTEM_LOCALE_SEPARATOR		= '-';

	/**
	 * 
	 * @var int
	 */
	const FRACTIONS_DEFAULT_FLOAT		= 2;
	
	/**
	 * 
	 * @var int
	 */
	const FRACTIONS_DEFAULT_CURRENCY	= 2;


	/**
	 * 
	 * @var string
	 */
	const PARSER_ARG_DB2CODE_DATE		= 'Y-m-d H:i:s.v';
	
	/**
	 * 
	 * @var string
	 */
	const PARSER_ARG_DB2CODE_DATE_TIME	= 'Y-m-d H:i:s.v';
	
	/**
	 * 
	 * @var string
	 */
	const PARSER_ARG_DB2CODE_TIME		= 'Y-m-d H:i:s.v';


	/**
	 * 
	 * @var string
	 */
	const PARSER_ARG_CLIENT_DATE		= 'YYYY-MM-DDTHH:mm:ssZ';
	
	/**
	 * 
	 * @var string
	 */
	const PARSER_ARG_CLIENT_DATE_TIME	= 'YYYY-MM-DDTHH:mm:ssZ';
	
	/**
	 * 
	 * @var string
	 */
	const PARSER_ARG_CLIENT_TIME		= 'YYYY-MM-DDTHH:mm:ssZ';

	
	/**
	 * 
	 * @var string
	 */
	const FORMAT_ARG_CLIENT_DATE		= 'YYYY-MM-DD';
	
	/**
	 * 
	 * @var string
	 */
	const FORMAT_ARG_CLIENT_DATE_TIME	= 'YYYY-MM-DD HH:mm';
	
	/**
	 * 
	 * @var string
	 */
	const FORMAT_ARG_CLIENT_TIME		= 'HH:mm:ss';


	/**
	 * 
	 * @var string
	 */
	const FORMAT_ARG_DBLIKE_DATE		= 'yyyy-MM-dd';
	
	/**
	 * 
	 * @var string
	 */
	const FORMAT_ARG_DBLIKE_DATE_TIME	= 'yyyy-MM-dd HH:mm';
	
	/**
	 * 
	 * @var string
	 */
	const FORMAT_ARG_DBLIKE_TIME		= 'HH:mm';


	/**
	 * 
	 * @return void
	 */
	public function Init ();

	/**
	 * 
	 * @return \string[]|NULL
	 */
	public function GetLocaleNumeric ();

	/**
	 * 
	 * @param  \string[]|NULL $localeNumeric
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetLocaleNumeric ($localeNumeric);

	/**
	 * 
	 * @return \string[]|NULL
	 */
	public function GetLocaleMoney ();

	/**
	 * 
	 * @param  \string[]|NULL $localeMoney
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetLocaleMoney ($localeMoney);
	
	/**
	 * 
	 * @return \string[]|NULL
	 */
	public function GetLocaleDateTime ();

	/**
	 * 
	 * @param  \string[]|NULL $localeDateTime
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetLocaleDateTime ($localeDateTime);
	
	/**
	 * 
	 * @return string|NULL
	 */
	public function GetCurrencyCode ();

	/**
	 * 
	 * @param  string|NULL $currencyCode 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetCurrencyCode ($currencyCode);
	
	/**
	 * 
	 * @return string|NULL
	 */
	public function GetCurrencySign ();

	/**
	 * 
	 * @param  string|NULL $currencyCode 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetCurrencySign ($currencySign);

	/**
	 * 
	 * @return int|NULL
	 */
	public function GetCurrencyFractions ();

	/**
	 * 
	 * @param  int|NULL $currencyFractions 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetCurrencyFractions ($currencyFractions);
	
	/**
	 * 
	 * @return int|NULL
	 */
	public function GetFloatFractions ();

	/**
	 * 
	 * @param  int|NULL $floatFractions 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetFloatFractions ($floatFractions);
	
	/**
	 * 
	 * @return \string[]
	 */
	public function GetParserArgsDate ();

	/**
	 * 
	 * @param  \string[] $parserArgsDate 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetParserArgsDate ($parserArgsDate);
	
	/**
	 * 
	 * @return \string[]
	 */
	public function GetParserArgsDateTime ();

	/**
	 * 
	 * @param  \string[] $parserArgsDateTime 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetParserArgsDateTime ($parserArgsDateTime);
	
	/**
	 * 
	 * @return \string[]
	 */
	public function GetParserArgsTime ();

	/**
	 * 
	 * @param  \string[] $parserArgsTime 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetParserArgsTime ($parserArgsTime);

	/**
	 * 
	 * @return \string[]
	 */
	public function GetFormatArgsDate ();

	/**
	 * 
	 * @param  \string[] $formatArgsDate 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetFormatArgsDate ($formatArgsDate);
	
	/**
	 * 
	 * @return \string[]
	 */
	public function GetFormatArgsDateTime ();

	/**
	 * 
	 * @param  \string[] $formatArgsDateTime 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetFormatArgsDateTime ($formatArgsDateTime);
	
	/**
	 * 
	 * @return \string[]
	 */
	public function GetFormatArgsTime ();

	/**
	 * 
	 * @param  \string[] $formatArgsTime 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetFormatArgsTime ($formatArgsTime);
}