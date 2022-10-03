var MvcCore;
(function (MvcCore) {
    var Ext;
    (function (Ext) {
        var Controllers;
        (function (Controllers) {
            var DataGrids;
            (function (DataGrids) {
                var AgGrids;
                (function (AgGrids) {
                    var Columns;
                    (function (Columns) {
                        var ViewHelper = /** @class */ (function () {
                            function ViewHelper(grid) {
                                var _newTarget = this.constructor;
                                this.Static = _newTarget;
                                this.grid = grid;
                                this.translator = grid.GetTranslator();
                                this.serverConfig = grid.GetServerConfig();
                                this.localesConfig = this.serverConfig.locales;
                                this.localeNumeric = this.localesConfig.localeNumeric.join(AgGrids.Options.Manager.SYSTEM_LOCALE_SEPARATOR);
                                this.localeMoney = this.localesConfig.localeMoney.join(AgGrids.Options.Manager.SYSTEM_LOCALE_SEPARATOR);
                                this.localeDateTime = this.localesConfig.localeDateTime.join(AgGrids.Options.Manager.SYSTEM_LOCALE_SEPARATOR);
                                this.formattersInt = new Map([
                                    ['default', new Intl.NumberFormat(this.localeNumeric, {
                                            minimumIntegerDigits: 1
                                        })]
                                ]);
                                this.formattersFloat = new Map([
                                    ['default', new Intl.NumberFormat(this.localeNumeric, {
                                            minimumFractionDigits: this.localesConfig.floatFractions,
                                            maximumFractionDigits: this.localesConfig.floatFractions
                                        })]
                                ]);
                                this.formattersMoney = new Map([
                                    ['default', new Intl.NumberFormat(this.localeMoney, {
                                            style: 'currency',
                                            currency: this.localesConfig.currencyCode,
                                            currencySign: 'standard',
                                            minimumFractionDigits: this.localesConfig.currencyFractions,
                                            maximumFractionDigits: this.localesConfig.currencyFractions
                                        })]
                                ]);
                                this.Static.defaults = new Map([
                                    [AgGrids.Enums.ServerType.BOOL, this.formatBool],
                                    [AgGrids.Enums.ServerType.INT, this.formatInt],
                                    [AgGrids.Enums.ServerType.FLOAT, this.formatFloat],
                                    [AgGrids.Enums.ServerType.MONEY, this.formatMoney],
                                    [AgGrids.Enums.ServerType.DATE, this.formatDate],
                                    [AgGrids.Enums.ServerType.DATE_TIME, this.formatDateTime],
                                    [AgGrids.Enums.ServerType.TIME, this.formatTime],
                                ]);
                            }
                            ViewHelper.prototype.SetUpColumnCfg = function (agColumnCfg, serverColumnCfg) {
                                var _this = this;
                                var viewHelper = null;
                                if (serverColumnCfg.viewHelper != null) {
                                    try {
                                        var formatter = eval(serverColumnCfg.viewHelper);
                                        if (typeof formatter === 'function')
                                            viewHelper = formatter;
                                    }
                                    catch (e) {
                                    }
                                }
                                if (viewHelper == null) {
                                    var serverType = serverColumnCfg.types[serverColumnCfg.types.length - 1];
                                    if (this.Static.defaults.has(serverType))
                                        viewHelper = this.Static.defaults.get(serverType);
                                }
                                if (viewHelper != null) {
                                    var propName = serverColumnCfg.propName, parserArgs = serverColumnCfg.parserArgs, formatArgs = serverColumnCfg.formatArgs;
                                    agColumnCfg.valueFormatter = function (params) {
                                        if (params.data == null || params.data[propName] == null)
                                            return '';
                                        return viewHelper.call(_this, params, propName, parserArgs, formatArgs);
                                    };
                                }
                                return this;
                            };
                            ViewHelper.prototype.getIntFormater = function (formatterKey, formatArgs) {
                                if (this.formattersInt.has(formatterKey))
                                    return this.formattersInt.get(formatterKey);
                                var minimumIntegerDigits = 1;
                                if (formatArgs.length > 0)
                                    minimumIntegerDigits = parseInt(formatArgs[0], 10);
                                if (minimumIntegerDigits < 1)
                                    minimumIntegerDigits = 1;
                                this.formattersInt.set(formatterKey, new Intl.NumberFormat(this.localeNumeric, {
                                    minimumIntegerDigits: minimumIntegerDigits
                                }));
                                return this.formattersInt.get(formatterKey);
                            };
                            ViewHelper.prototype.getFloatFormater = function (formatterKey, formatArgs) {
                                if (this.formattersFloat.has(formatterKey))
                                    return this.formattersFloat.get(formatterKey);
                                var minimumFractionDigits = this.localesConfig.floatFractions, maximumFractionDigits = this.localesConfig.floatFractions;
                                if (formatArgs.length > 0) {
                                    minimumFractionDigits = parseInt(formatArgs[0], 10);
                                    if (formatArgs.length > 1)
                                        maximumFractionDigits = parseInt(formatArgs[1], 10);
                                }
                                if (maximumFractionDigits < minimumFractionDigits)
                                    maximumFractionDigits = minimumFractionDigits;
                                this.formattersFloat.set(formatterKey, new Intl.NumberFormat(this.localeNumeric, {
                                    minimumFractionDigits: minimumFractionDigits,
                                    maximumFractionDigits: maximumFractionDigits
                                }));
                                return this.formattersFloat.get(formatterKey);
                            };
                            ViewHelper.prototype.getMoneyFormater = function (formatterKey, formatArgs) {
                                if (this.formattersMoney.has(formatterKey))
                                    return this.formattersMoney.get(formatterKey);
                                var minimumFractionDigits = this.localesConfig.floatFractions, maximumFractionDigits = this.localesConfig.floatFractions;
                                if (formatArgs.length > 0) {
                                    minimumFractionDigits = parseInt(formatArgs[0], 10);
                                    if (formatArgs.length > 1)
                                        maximumFractionDigits = parseInt(formatArgs[1], 10);
                                }
                                if (maximumFractionDigits < minimumFractionDigits)
                                    maximumFractionDigits = minimumFractionDigits;
                                this.formattersMoney.set(formatterKey, new Intl.NumberFormat(this.localeMoney, {
                                    style: 'currency',
                                    currency: this.localesConfig.currencyCode,
                                    currencySign: 'standard',
                                    minimumFractionDigits: minimumFractionDigits,
                                    maximumFractionDigits: maximumFractionDigits
                                }));
                                return this.formattersMoney.get(formatterKey);
                            };
                            ViewHelper.prototype.formatBool = function (params, propName, parserArgs, formatArgs) {
                                return this.translator.Translate(params.data[propName] ? 'yes' : 'no');
                            };
                            ViewHelper.prototype.formatInt = function (params, propName, parserArgs, formatArgs) {
                                var formatterKey = formatArgs == null ? 'default' : formatArgs.join('|');
                                return this.getIntFormater(formatterKey, formatArgs).format(params.data[propName]);
                            };
                            ViewHelper.prototype.formatFloat = function (params, propName, parserArgs, formatArgs) {
                                var formatterKey = formatArgs == null ? 'default' : formatArgs.join('|');
                                return this.getFloatFormater(formatterKey, formatArgs).format(params.data[propName]);
                            };
                            ViewHelper.prototype.formatMoney = function (params, propName, parserArgs, formatArgs) {
                                var formatterKey = formatArgs == null ? 'default' : formatArgs.join('|');
                                return this.getMoneyFormater(formatterKey, formatArgs).format(params.data[propName]);
                            };
                            ViewHelper.prototype.formatDate = function (params, propName, parserArgs, formatArgs) {
                                if (parserArgs == null || parserArgs.length === 0)
                                    parserArgs = this.localesConfig.parserArgsDate;
                                var dateTime = moment(params.data[propName], parserArgs[parserArgs.length - 1]);
                                dateTime.add(this.serverConfig.timeZoneOffset, 's');
                                if (formatArgs == null || formatArgs.length === 0)
                                    formatArgs = this.localesConfig.formatArgsDate;
                                return dateTime.format(formatArgs[0]);
                            };
                            ViewHelper.prototype.formatDateTime = function (params, propName, parserArgs, formatArgs) {
                                if (parserArgs == null || parserArgs.length === 0)
                                    parserArgs = this.localesConfig.parserArgsDateTime;
                                var dateTime = moment(params.data[propName], parserArgs[parserArgs.length - 1]);
                                dateTime.add(this.serverConfig.timeZoneOffset, 's');
                                if (formatArgs == null || formatArgs.length === 0)
                                    formatArgs = this.localesConfig.formatArgsDateTime;
                                return dateTime.format(formatArgs[0]);
                            };
                            ViewHelper.prototype.formatTime = function (params, propName, parserArgs, formatArgs) {
                                if (parserArgs == null || parserArgs.length === 0)
                                    parserArgs = this.localesConfig.parserArgsTime;
                                var dateTime = moment(params.data[propName], parserArgs[parserArgs.length - 1]);
                                dateTime.add(this.serverConfig.timeZoneOffset, 's');
                                if (formatArgs == null || formatArgs.length === 0)
                                    formatArgs = this.localesConfig.formatArgsTime;
                                return dateTime.format(formatArgs[0]);
                            };
                            return ViewHelper;
                        }());
                        Columns.ViewHelper = ViewHelper;
                    })(Columns = AgGrids.Columns || (AgGrids.Columns = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=ViewHelper.js.map