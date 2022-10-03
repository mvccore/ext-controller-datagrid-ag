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

use \MvcCore\Ext\Controllers\DataGrids\Configs\JsonSerialize;

class		Locales
implements	\MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\ILocales,
			\JsonSerializable {
	
	/**
	 * Global localization settings - for numeric, money and datetime columns.
	 * First item is lowercase language code, second item is uppercase country code.
	 * @var \string[]|NULL
	 * @jsonSerialize
	 */
	#[JsonSerialize]
	protected $locale					= NULL;
	
	/**
	 * Localization settings for numeric columns (integers and floats).
	 * First item is lowercase language code, second item is uppercase country code.
	 * @var \string[]|NULL
	 * @jsonSerialize
	 */
	#[JsonSerialize]
	protected $localeNumeric			= NULL;
	
	/**
	 * Localization settings for money columns.
	 * First item is lowercase language code, second item is uppercase country code.
	 * @var \string[]|NULL
	 * @jsonSerialize
	 */
	#[JsonSerialize]
	protected $localeMoney				= NULL;
	
	/**
	 * Localization settings for datetime columns.
	 * First item is lowercase language code, second item is uppercase country code.
	 * @var \string[]|NULL
	 * @jsonSerialize
	 */
	#[JsonSerialize]
	protected $localeDateTime			= NULL;
	
	/**
	 * Currency code for money columns, three uppercase letters.
	 * This settings is used for client javascript `Intl` currency formater.
	 * @var string|NULL
	 * @jsonSerialize
	 */
	#[JsonSerialize]
	protected $currencyCode				= NULL;
	
	/**
	 * Currency sign for money columns, not used by default.
	 * This settings is prepared for any extended money formatter.
	 * @var string|NULL
	 * @jsonSerialize
	 */
	#[JsonSerialize]
	protected $currencySign				= NULL;

	/**
	 * Currency float fractions length for money columns, 2 by default.
	 * This settings is used for client javascript `Intl` currency formater.
	 * @var int|NULL
	 * @jsonSerialize
	 */
	#[JsonSerialize]
	protected $currencyFractions		= self::FRACTIONS_DEFAULT_CURRENCY;
	
	/**
	 * Standard float fractions length for float columns, 2 by default.
	 * This settings is used for client javascript `Intl` float formater.
	 * @var int|NULL
	 * @jsonSerialize
	 */
	#[JsonSerialize]
	protected $floatFractions			= self::FRACTIONS_DEFAULT_FLOAT;
	
	/**
	 * 
	 * @var \string[]
	 * @jsonSerialize
	 */
	#[JsonSerialize]
	protected $parserArgsDate			= [self::PARSER_ARG_DB2CODE_DATE, self::PARSER_ARG_CLIENT_DATE];
	
	/**
	 * 
	 * @var \string[]
	 * @jsonSerialize
	 */
	#[JsonSerialize]
	protected $parserArgsDateTime		= [self::PARSER_ARG_DB2CODE_DATE_TIME, self::PARSER_ARG_CLIENT_DATE_TIME];
	
	/**
	 * 
	 * @var \string[]
	 * @jsonSerialize
	 */
	#[JsonSerialize]
	protected $parserArgsTime			= [self::PARSER_ARG_DB2CODE_TIME, self::PARSER_ARG_CLIENT_TIME];
	
	/**
	 * 
	 * @var \string[]
	 * @jsonSerialize
	 */
	#[JsonSerialize]
	protected $formatArgsDate			= [self::FORMAT_ARG_CLIENT_DATE, self::FORMAT_ARG_DBLIKE_DATE];
	
	/**
	 * 
	 * @var \string[]
	 * @jsonSerialize
	 */
	#[JsonSerialize]
	protected $formatArgsDateTime		= [self::FORMAT_ARG_CLIENT_DATE_TIME, self::FORMAT_ARG_DBLIKE_DATE_TIME];
	
	/**
	 * 
	 * @var \string[]
	 * @jsonSerialize
	 */
	#[JsonSerialize]
	protected $formatArgsTime			= [self::FORMAT_ARG_CLIENT_TIME, self::FORMAT_ARG_DBLIKE_TIME];

	/**
	 * @return void
	 */
	public function Init () {
		if ($this->locale === NULL) {
			$locale = \MvcCore\Ext\Tools\Locale::GetLocale(LC_CTYPE);
			$this->locale = [$locale->lang, $locale->locale];
		}
		if ($this->localeNumeric === NULL) {
			$localeNumeric = \MvcCore\Ext\Tools\Locale::GetLocale(LC_NUMERIC);
			$this->localeNumeric = [$localeNumeric->lang, $localeNumeric->locale];
		}
		if ($this->localeMoney === NULL) {
			$localeMoney = \MvcCore\Ext\Tools\Locale::GetLocale(LC_MONETARY);
			$this->localeMoney = [$localeMoney->lang, $localeMoney->locale];
		}
		if ($this->localeDateTime === NULL) {
			$localeDateTime = \MvcCore\Ext\Tools\Locale::GetLocale(LC_TIME);
			$this->localeDateTime = [$localeDateTime->lang, $localeDateTime->locale];
		}
		$localeData = (object) localeconv();
		if ($this->currencyCode === NULL)
			$this->currencyCode = utf8_encode($localeData->int_curr_symbol);
		if ($this->currencySign === NULL)
			$this->currencySign = utf8_encode($localeData->currency_symbol);
	}
	
	/**
	 * @inheritDocs
	 * @param  bool $asString
	 * @return \string[]|NULL
	 */
	public function GetLocale ($asString = FALSE) {
		return $asString && $this->locale !== NULL
			? implode(static::SYSTEM_LOCALE_SEPARATOR, $this->locale)
			: $this->locale;
	}
	/**
	 * @inheritDocs
	 * @param  \string[]|NULL $locale
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetLocale ($locale) {
		$this->locale = $locale;
		$this->localeNumeric = $locale;
		$this->localeMoney = $locale;
		$this->localeDateTime = $locale;
		return $this;
	}

	/**
	 * @inheritDocs
	 * @param  bool $asString
	 * @return \string[]|NULL
	 */
	public function GetLocaleNumeric ($asString = FALSE) {
		return $asString && $this->localeNumeric !== NULL
			? implode(static::SYSTEM_LOCALE_SEPARATOR, $this->localeNumeric)
			: $this->localeNumeric;
	}
	/**
	 * @inheritDocs
	 * @param  \string[]|NULL $localeNumeric
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetLocaleNumeric ($localeNumeric) {
		$this->localeNumeric = $localeNumeric;
		return $this;
	}

	/**
	 * @inheritDocs
	 * @return \string[]|NULL
	 */
	public function GetLocaleMoney ($asString = FALSE) {
		return $asString && $this->localeMoney !== NULL
			? implode(static::SYSTEM_LOCALE_SEPARATOR, $this->localeMoney)
			: $this->localeMoney;
	}
	/**
	 * @inheritDocs
	 * @param  \string[]|NULL $localeMoney
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetLocaleMoney ($localeMoney) {
		$this->localeMoney = $localeMoney;
		return $this;
	}
	
	/**
	 * @inheritDocs
	 * @return \string[]|NULL
	 */
	public function GetLocaleDateTime ($asString = FALSE) {
		return $asString && $this->localeDateTime !== NULL
			? implode(static::SYSTEM_LOCALE_SEPARATOR, $this->localeDateTime)
			: $this->localeDateTime;
	}
	/**
	 * @inheritDocs
	 * @param  \string[]|NULL $localeDateTime
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetLocaleDateTime ($localeDateTime) {
		$this->localeDateTime = $localeDateTime;
		return $this;
	}
	
	/**
	 * @inheritDocs
	 * @return string|NULL
	 */
	public function GetCurrencyCode () {
		return $this->currencyCode;
	}
	/**
	 * @inheritDocs
	 * @param  string|NULL $currencyCode 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetCurrencyCode ($currencyCode) {
		$this->currencyCode = $currencyCode;
		return $this;
	}
	
	/**
	 * @inheritDocs
	 * @return string|NULL
	 */
	public function GetCurrencySign () {
		return $this->currencySign;
	}
	/**
	 * @inheritDocs
	 * @param  string|NULL $currencyCode 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetCurrencySign ($currencySign) {
		$this->currencySign = $currencySign;
		return $this;
	}

	/**
	 * @inheritDocs
	 * @return int|NULL
	 */
	public function GetCurrencyFractions () {
		return $this->currencyFractions;
	}
	/**
	 * @inheritDocs
	 * @param  int|NULL $currencyFractions 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetCurrencyFractions ($currencyFractions) {
		$this->currencyFractions = $currencyFractions;
		return $this;
	}
	
	/**
	 * @inheritDocs
	 * @return int|NULL
	 */
	public function GetFloatFractions () {
		return $this->floatFractions;
	}
	/**
	 * @inheritDocs
	 * @param  int|NULL $floatFractions 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetFloatFractions ($floatFractions) {
		$this->floatFractions = $floatFractions;
		return $this;
	}
	
	/**
	 * @inheritDocs
	 * @return \string[]
	 */
	public function GetParserArgsDate () {
		return $this->parserArgsDate;
	}
	/**
	 * @inheritDocs
	 * @param  \string[] $parserArgsDate 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetParserArgsDate ($parserArgsDate) {
		$this->parserArgsDate = $parserArgsDate;
		return $this;
	}
	
	/**
	 * @inheritDocs
	 * @return \string[]
	 */
	public function GetParserArgsDateTime () {
		return $this->parserArgsDateTime;
	}
	/**
	 * @inheritDocs
	 * @param  \string[] $parserArgsDateTime 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetParserArgsDateTime ($parserArgsDateTime) {
		$this->parserArgsDateTime = $parserArgsDateTime;
		return $this;
	}
	
	/**
	 * @inheritDocs
	 * @return \string[]
	 */
	public function GetParserArgsTime () {
		return $this->parserArgsTime;
	}
	/**
	 * @inheritDocs
	 * @param  \string[] $parserArgsTime 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetParserArgsTime ($parserArgsTime) {
		$this->parserArgsTime = $parserArgsTime;
		return $this;
	}

	/**
	 * @inheritDocs
	 * @return \string[]
	 */
	public function GetFormatArgsDate () {
		return $this->formatArgsDate;
	}
	/**
	 * @inheritDocs
	 * @param  \string[] $formatArgsDate 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetFormatArgsDate ($formatArgsDate) {
		$this->formatArgsDate = $formatArgsDate;
		return $this;
	}
	
	/**
	 * @inheritDocs
	 * @return \string[]
	 */
	public function GetFormatArgsDateTime () {
		return $this->formatArgsDateTime;
	}
	/**
	 * @inheritDocs
	 * @param  \string[] $formatArgsDateTime 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetFormatArgsDateTime ($formatArgsDateTime) {
		$this->formatArgsDateTime = $formatArgsDateTime;
		return $this;
	}
	
	/**
	 * @inheritDocs
	 * @return \string[]
	 */
	public function GetFormatArgsTime () {
		return $this->formatArgsTime;
	}

	/**
	 * @inheritDocs
	 * @param  \string[] $formatArgsTime 
	 * @return \MvcCore\Ext\Controllers\DataGrids\AgGrids\Configs\Locales
	 */
	public function SetFormatArgsTime ($formatArgsTime) {
		$this->formatArgsTime = $formatArgsTime;
		return $this;
	}

	/**
	 * Return data for JSON serialization.
	 * @return array|mixed
	 */
	#[\ReturnTypeWillChange]
	public function jsonSerialize () {
		return JsonSerialize::Serialize($this, \ReflectionProperty::IS_PROTECTED);
	}
}