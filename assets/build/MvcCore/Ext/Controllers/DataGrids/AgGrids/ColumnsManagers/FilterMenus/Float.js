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
                            var Float = /** @class */ (function (_super) {
                                __extends(Float, _super);
                                function Float() {
                                    return _super !== null && _super.apply(this, arguments) || this;
                                }
                                Float.prototype.init = function (agParams) {
                                    _super.prototype.init.call(this, agParams);
                                    this.parserArgs = this.serverColumnCfg.parserArgs;
                                    this.formatArgs = this.serverColumnCfg.formatArgs;
                                    var fractionsCount = this.formatArgs.length > 0
                                        ? Number(this.formatArgs[0])
                                        : this.grid.GetServerConfig().locales.floatFractions;
                                    var stepItems = ['0.'];
                                    for (var i = 0; i < fractionsCount - 1; i++)
                                        stepItems.push('0');
                                    stepItems.push('1');
                                    this.step = stepItems.join('');
                                };
                                Float.prototype.changeValueInputType = function (index, currentControlType) {
                                    var sectionElms = this.elms.sections[index];
                                    if (this.isControlTypeForCompleteValue(currentControlType)) {
                                        sectionElms.valueInput.type = this.Static.VALUE_TYPE;
                                        if (this.step != null)
                                            sectionElms.valueInput.step = this.step;
                                    }
                                    else {
                                        sectionElms.valueInput.type = 'text';
                                        sectionElms.valueInput.step = null;
                                    }
                                    return this;
                                };
                                Float.VALUE_TYPE = 'number';
                                return Float;
                            }(ColumnsManagers.FilterMenu));
                            FilterMenus.Float = Float;
                        })(FilterMenus = ColumnsManagers.FilterMenus || (ColumnsManagers.FilterMenus = {}));
                    })(ColumnsManagers = AgGrids.ColumnsManagers || (AgGrids.ColumnsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Float.js.map