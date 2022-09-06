var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
                    var ColumnsManagers;
                    (function (ColumnsManagers) {
                        var FilterMenus;
                        (function (FilterMenus) {
                            var Time = /** @class */ (function (_super) {
                                __extends(Time, _super);
                                function Time() {
                                    return _super !== null && _super.apply(this, arguments) || this;
                                }
                                Time.PARSER_ARGS_DEFAULT = [ColumnsManagers.ViewHelper.PARSER_PATTERN_TIME];
                                Time.FORMAT_ARGS_DEFAULT = [ColumnsManagers.ViewHelper.PARSER_PATTERN_TIME];
                                Time.VALUE_TYPE = 'time';
                                return Time;
                            }(FilterMenus.DateTime));
                            FilterMenus.Time = Time;
                        })(FilterMenus = ColumnsManagers.FilterMenus || (ColumnsManagers.FilterMenus = {}));
                    })(ColumnsManagers = AgGrids.ColumnsManagers || (AgGrids.ColumnsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Time.js.map