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
                        var FilterMenu = /** @class */ (function () {
                            function FilterMenu() {
                            }
                            FilterMenu.prototype.getGui = function () {
                                return null;
                            };
                            FilterMenu.prototype.destroy = function () {
                            };
                            FilterMenu.prototype.isFilterActive = function () {
                                return true;
                            };
                            FilterMenu.prototype.getModel = function () {
                            };
                            FilterMenu.prototype.onNewRowsLoaded = function () {
                            };
                            FilterMenu.prototype.onAnyFilterChanged = function () {
                            };
                            FilterMenu.prototype.doesFilterPass = function (params) {
                                return false;
                            };
                            FilterMenu.prototype.getModelAsString = function (model) {
                                return '';
                            };
                            FilterMenu.prototype.setModel = function () {
                            };
                            return FilterMenu;
                        }());
                        ColumnsManagers.FilterMenu = FilterMenu;
                    })(ColumnsManagers = AgGrids.ColumnsManagers || (AgGrids.ColumnsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=FilterMenu.js.map