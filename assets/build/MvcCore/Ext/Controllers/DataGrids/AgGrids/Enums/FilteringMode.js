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
                        var FilteringMode;
                        (function (FilteringMode) {
                            FilteringMode[FilteringMode["DISABLED"] = 0] = "DISABLED";
                            FilteringMode[FilteringMode["SINGLE_COLUMN"] = 1] = "SINGLE_COLUMN";
                            FilteringMode[FilteringMode["MULTIPLE_COLUMNS"] = 2] = "MULTIPLE_COLUMNS";
                            FilteringMode[FilteringMode["ALLOW_EQUALS"] = 4] = "ALLOW_EQUALS";
                            FilteringMode[FilteringMode["ALLOW_RANGES"] = 8] = "ALLOW_RANGES";
                            FilteringMode[FilteringMode["ALLOW_LIKE_RIGHT_SIDE"] = 16] = "ALLOW_LIKE_RIGHT_SIDE";
                            FilteringMode[FilteringMode["ALLOW_LIKE_LEFT_SIDE"] = 32] = "ALLOW_LIKE_LEFT_SIDE";
                            FilteringMode[FilteringMode["ALLOW_LIKE_ANYWHERE"] = 64] = "ALLOW_LIKE_ANYWHERE";
                            FilteringMode[FilteringMode["ALLOW_NULL"] = 128] = "ALLOW_NULL";
                            FilteringMode[FilteringMode["ALLOW_NOT_NULL"] = 256] = "ALLOW_NOT_NULL";
                            FilteringMode[FilteringMode["ALLOW_ALL_WITH_NULL"] = 252] = "ALLOW_ALL_WITH_NULL";
                            FilteringMode[FilteringMode["ALLOW_ALL_NOT_NULL"] = 380] = "ALLOW_ALL_NOT_NULL";
                        })(FilteringMode = Enums.FilteringMode || (Enums.FilteringMode = {}));
                    })(Enums = AgGrids.Enums || (AgGrids.Enums = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=FilteringMode.js.map