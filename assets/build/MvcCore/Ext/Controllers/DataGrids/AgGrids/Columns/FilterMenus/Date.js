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
                            var Date = /** @class */ (function (_super) {
                                __extends(Date, _super);
                                function Date() {
                                    return _super !== null && _super.apply(this, arguments) || this;
                                }
                                Date.prototype.initParserAndFormatArgs = function () {
                                    this.parserArgs = this.serverColumnCfg.parserArgs;
                                    this.formatArgs = this.serverColumnCfg.formatArgs;
                                    if (this.parserArgs == null || this.parserArgs.length === 0)
                                        this.parserArgs = this.serverConfig.locales.parserArgsDate;
                                    if (this.formatArgs == null || this.formatArgs.length === 0)
                                        this.formatArgs = this.serverConfig.locales.formatArgsDate;
                                };
                                Date.VALUE_TYPE = 'date';
                                return Date;
                            }(FilterMenus.DateTime));
                            FilterMenus.Date = Date;
                        })(FilterMenus = Columns.FilterMenus || (Columns.FilterMenus = {}));
                    })(Columns = AgGrids.Columns || (AgGrids.Columns = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Date.js.map