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
                            var DateTime = /** @class */ (function (_super) {
                                __extends(DateTime, _super);
                                function DateTime() {
                                    return _super !== null && _super.apply(this, arguments) || this;
                                }
                                DateTime.prototype.changeValueInputType = function (index, currentControlType) {
                                    var sectionElms = this.elms.sections[index];
                                    if ((currentControlType & AgGrids.Enums.FilterControlType.EQUAL) != 0 ||
                                        (currentControlType & AgGrids.Enums.FilterControlType.GREATER) != 0 ||
                                        (currentControlType & AgGrids.Enums.FilterControlType.LOWER) != 0 ||
                                        (currentControlType & AgGrids.Enums.FilterControlType.GREATER_EQUAL) != 0 ||
                                        (currentControlType & AgGrids.Enums.FilterControlType.LOWER_EQUAL) != 0 ||
                                        (currentControlType & AgGrids.Enums.FilterControlType.NOT_EQUAL) != 0) {
                                        sectionElms.valueInput.type = 'datetime-local';
                                    }
                                    else {
                                        sectionElms.valueInput.type = 'text';
                                    }
                                    return this;
                                };
                                return DateTime;
                            }(ColumnsManagers.FilterMenu));
                            FilterMenus.DateTime = DateTime;
                        })(FilterMenus = ColumnsManagers.FilterMenus || (ColumnsManagers.FilterMenus = {}));
                    })(ColumnsManagers = AgGrids.ColumnsManagers || (AgGrids.ColumnsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=DateTime.js.map