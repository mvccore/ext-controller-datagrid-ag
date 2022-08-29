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
                    var ColumnsManagers;
                    (function (ColumnsManagers) {
                        var ViewHelper = /** @class */ (function () {
                            function ViewHelper(grid) {
                                var _newTarget = this.constructor;
                                this.Static = _newTarget;
                                this.grid = grid;
                                this.serverConfig = grid.GetServerConfig();
                                this.localeNumeric = this.serverConfig.locales.localeNumeric.join(AgGrids.Options.SYSTEM_LOCALE_SEPARATOR);
                                this.localeMoney = this.serverConfig.locales.localeMoney.join(AgGrids.Options.SYSTEM_LOCALE_SEPARATOR);
                                this.localeDateTime = this.serverConfig.locales.localeDateTime.join(AgGrids.Options.SYSTEM_LOCALE_SEPARATOR);
                                this.formattersInt = new Map([
                                    ['default', new Intl.NumberFormat(this.localeNumeric, {
                                            minimumIntegerDigits: 1
                                        })]
                                ]);
                                this.formattersFloat = new Map([
                                    ['default', new Intl.NumberFormat(this.localeNumeric, {
                                            minimumFractionDigits: this.serverConfig.locales.floatFractions,
                                            maximumFractionDigits: this.serverConfig.locales.floatFractions
                                        })]
                                ]);
                                this.formattersMoney = new Map([
                                    ['default', new Intl.NumberFormat(this.localeMoney, {
                                            style: 'currency',
                                            currency: this.serverConfig.locales.currencyCode,
                                            currencySign: 'standard',
                                            minimumFractionDigits: this.serverConfig.locales.currencyFractions,
                                            maximumFractionDigits: this.serverConfig.locales.currencyFractions
                                        })]
                                ]);
                                this.Static.defaults = new Map([
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
                                    var propName = serverColumnCfg.propName, formatArgs = serverColumnCfg.format;
                                    agColumnCfg.valueFormatter = function (params) {
                                        return viewHelper.call(_this, params, propName, formatArgs);
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
                                var minimumFractionDigits = this.serverConfig.locales.floatFractions, maximumFractionDigits = this.serverConfig.locales.floatFractions;
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
                                var minimumFractionDigits = this.serverConfig.locales.floatFractions, maximumFractionDigits = this.serverConfig.locales.floatFractions;
                                if (formatArgs.length > 0) {
                                    minimumFractionDigits = parseInt(formatArgs[0], 10);
                                    if (formatArgs.length > 1)
                                        maximumFractionDigits = parseInt(formatArgs[1], 10);
                                }
                                if (maximumFractionDigits < minimumFractionDigits)
                                    maximumFractionDigits = minimumFractionDigits;
                                this.formattersMoney.set(formatterKey, new Intl.NumberFormat(this.localeMoney, {
                                    style: 'currency',
                                    currency: this.serverConfig.locales.currencyCode,
                                    currencySign: 'standard',
                                    minimumFractionDigits: minimumFractionDigits,
                                    maximumFractionDigits: maximumFractionDigits
                                }));
                                return this.formattersMoney.get(formatterKey);
                            };
                            ViewHelper.prototype.formatInt = function (params, propName, formatArgs) {
                                var formatterKey = formatArgs == null ? 'default' : formatArgs.join('|');
                                return this.getIntFormater(formatterKey, formatArgs).format(params.data[propName]);
                            };
                            ViewHelper.prototype.formatFloat = function (params, propName, formatArgs) {
                                var formatterKey = formatArgs == null ? 'default' : formatArgs.join('|');
                                return this.getFloatFormater(formatterKey, formatArgs).format(params.data[propName]);
                            };
                            ViewHelper.prototype.formatMoney = function (params, propName, formatArgs) {
                                var formatterKey = formatArgs == null ? 'default' : formatArgs.join('|');
                                return this.getMoneyFormater(formatterKey, formatArgs).format(params.data[propName]);
                            };
                            ViewHelper.prototype.formatDate = function (params, propName, formatArgs) {
                                var dateTime = Date.parse(params.data[propName]) + this.serverConfig.timeZoneOffset;
                                if (formatArgs == null || formatArgs.length === 0)
                                    formatArgs = [this.Static.FORMAT_PATTERN_DATE];
                                return moment(dateTime).format(formatArgs[formatArgs.length - 1]);
                            };
                            ViewHelper.prototype.formatDateTime = function (params, propName, formatArgs) {
                                var dateTime = Date.parse(params.data[propName]) + this.serverConfig.timeZoneOffset;
                                if (formatArgs == null || formatArgs.length === 0)
                                    formatArgs = [this.Static.FORMAT_PATTERN_DATE_TIME];
                                return moment(dateTime).format(formatArgs[formatArgs.length - 1]);
                            };
                            ViewHelper.prototype.formatTime = function (params, propName, formatArgs) {
                                var dateTime = Date.parse(params.data[propName]) + this.serverConfig.timeZoneOffset;
                                if (formatArgs == null || formatArgs.length === 0)
                                    formatArgs = [this.Static.FORMAT_PATTERN_TIME];
                                return moment(dateTime).format(formatArgs[formatArgs.length - 1]);
                            };
                            ViewHelper.FORMAT_PATTERN_DATE = 'YYYY-MM-DD';
                            ViewHelper.FORMAT_PATTERN_DATE_TIME = 'YYYY-MM-DD HH:mm:ss';
                            ViewHelper.FORMAT_PATTERN_TIME = 'HH:mm:ss';
                            return ViewHelper;
                        }());
                        ColumnsManagers.ViewHelper = ViewHelper;
                    })(ColumnsManagers = AgGrids.ColumnsManagers || (AgGrids.ColumnsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=ViewHelper.js.map