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
                    var Tools;
                    (function (Tools) {
                        var ToolTip = /** @class */ (function () {
                            function ToolTip() {
                            }
                            ToolTip.prototype.init = function (params) {
                                var _a;
                                var eGui = this.eGui = document.createElement('div');
                                var color = params.color || 'white';
                                var data = (_a = params.api.getDisplayedRowAtIndex(params.rowIndex)) === null || _a === void 0 ? void 0 : _a.data;
                                eGui.classList.add('custom-tooltip');
                                ///@ts-ignore
                                eGui.style['background-color'] = color;
                                eGui.innerHTML = "\n\t\t\t\t<p>\n\t\t\t\t\t<span class\"name\">" + data.athlete + "</span>\n\t\t\t\t</p>\n\t\t\t\t<p>\n\t\t\t\t\t<span>Country: </span>\n\t\t\t\t\t" + data.country + "\n\t\t\t\t</p>\n\t\t\t\t<p>\n\t\t\t\t\t<span>Total: </span>\n\t\t\t\t\t" + data.total + "\n\t\t\t\t</p>\n\t\t\t";
                            };
                            ToolTip.prototype.getGui = function () {
                                return this.eGui;
                            };
                            return ToolTip;
                        }());
                        Tools.ToolTip = ToolTip;
                    })(Tools = AgGrids.Tools || (AgGrids.Tools = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=ToolTip.js.map