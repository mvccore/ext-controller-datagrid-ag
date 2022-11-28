var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
                        var FilterMenus;
                        (function (FilterMenus) {
                            var DateTime = /** @class */ (function (_super) {
                                __extends(DateTime, _super);
                                function DateTime() {
                                    return _super !== null && _super.apply(this, arguments) || this;
                                }
                                DateTime.prototype.init = function (agParams) {
                                    _super.prototype.init.call(this, agParams);
                                    this.serverConfig = this.grid.GetServerConfig();
                                    this.timeZoneOffset = this.serverConfig.timeZoneOffset;
                                    this.initParserAndFormatArgs();
                                };
                                DateTime.prototype.initParserAndFormatArgs = function () {
                                    this.parserArgs = this.serverColumnCfg.parserArgs;
                                    this.formatArgs = this.serverColumnCfg.formatArgs;
                                    if (this.parserArgs == null || this.parserArgs.length === 0)
                                        this.parserArgs = this.serverConfig.locales.parserArgsDateTime;
                                    if (this.formatArgs == null || this.formatArgs.length === 0)
                                        this.formatArgs = this.serverConfig.locales.formatArgsDateTime;
                                };
                                DateTime.prototype.changeValueInputType = function (index, currentControlType) {
                                    var sectionElms = this.elms.sections[index];
                                    if (this.isControlTypeForCompleteValue(currentControlType)) {
                                        sectionElms.valueInput.type = this.Static.VALUE_TYPE;
                                    }
                                    else {
                                        sectionElms.valueInput.type = 'text';
                                    }
                                    return this;
                                };
                                DateTime.prototype.setValueInput = function (valueInput, value, currentControlType) {
                                    if (this.timeZoneOffset !== 0 &&
                                        this.valueIsValid(value) &&
                                        (this.isControlTypeForCompleteValue(currentControlType) ||
                                            (currentControlType & AgGrids.Enums.FilterControlType.STARTS_WITH) != 0 ||
                                            (currentControlType & AgGrids.Enums.FilterControlType.NOT_STARTS_WITH) != 0)) {
                                        var dateTime = moment(value, this.parserArgs[this.parserArgs.length - 1]);
                                        dateTime.add(this.timeZoneOffset, 's');
                                        value = dateTime.format(this.formatArgs[0]);
                                    }
                                    valueInput.value = value;
                                    return this;
                                };
                                DateTime.prototype.getValueInput = function (valueInput, currentControlType) {
                                    var value = valueInput.value;
                                    if (this.timeZoneOffset !== 0 &&
                                        this.valueIsValid(value) &&
                                        this.isControlTypeForCompleteValue(currentControlType)) {
                                        if (valueInput.type != 'text')
                                            value = value.replace(/T|Z/g, ' ');
                                        var dateTime = moment(value, this.parserArgs[this.parserArgs.length - 1]);
                                        dateTime.add(-(this.timeZoneOffset), 's');
                                        value = dateTime.format(this.formatArgs[0]);
                                    }
                                    return value;
                                };
                                DateTime.prototype.valueIsValid = function (value) {
                                    return value !== '' && value != null;
                                };
                                DateTime.VALUE_TYPE = 'datetime-local';
                                return DateTime;
                            }(Columns.FilterMenu));
                            FilterMenus.DateTime = DateTime;
                        })(FilterMenus = Columns.FilterMenus || (Columns.FilterMenus = {}));
                    })(Columns = AgGrids.Columns || (AgGrids.Columns = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=DateTime.js.map