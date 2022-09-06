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
                    var Enums;
                    (function (Enums) {
                        var FilterButton;
                        (function (FilterButton) {
                            FilterButton[FilterButton["NONE"] = 0] = "NONE";
                            FilterButton[FilterButton["APPLY"] = 1] = "APPLY";
                            FilterButton[FilterButton["CLEAR"] = 2] = "CLEAR";
                            FilterButton[FilterButton["CANCEL"] = 4] = "CANCEL";
                        })(FilterButton = Enums.FilterButton || (Enums.FilterButton = {}));
                    })(Enums = AgGrids.Enums || (AgGrids.Enums = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=FilterButton.js.map