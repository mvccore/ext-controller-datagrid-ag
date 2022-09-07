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
                    var ColumnsManagers;
                    (function (ColumnsManagers) {
                        var FilterMenus;
                        (function (FilterMenus) {
                            var Int = /** @class */ (function (_super) {
                                __extends(Int, _super);
                                function Int() {
                                    return _super !== null && _super.apply(this, arguments) || this;
                                }
                                Int.prototype.init = function (agParams) {
                                    _super.prototype.init.call(this, agParams);
                                };
                                Int.prototype.changeValueInputType = function (index, currentControlType) {
                                    var sectionElms = this.elms.sections[index];
                                    if (this.isControlTypeForCompleteValue(currentControlType)) {
                                        sectionElms.valueInput.type = this.Static.VALUE_TYPE;
                                        sectionElms.valueInput.step = '1';
                                    }
                                    else {
                                        sectionElms.valueInput.type = 'text';
                                        sectionElms.valueInput.step = null;
                                    }
                                    return this;
                                };
                                Int.VALUE_TYPE = 'number';
                                return Int;
                            }(ColumnsManagers.FilterMenu));
                            FilterMenus.Int = Int;
                        })(FilterMenus = ColumnsManagers.FilterMenus || (ColumnsManagers.FilterMenus = {}));
                    })(ColumnsManagers = AgGrids.ColumnsManagers || (AgGrids.ColumnsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Int.js.map