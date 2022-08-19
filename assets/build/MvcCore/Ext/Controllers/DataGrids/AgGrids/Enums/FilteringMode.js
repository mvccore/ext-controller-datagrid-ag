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
                            FilteringMode[FilteringMode["FILTER_DISABLED"] = 0] = "FILTER_DISABLED";
                            FilteringMode[FilteringMode["FILTER_SINGLE_COLUMN"] = 1] = "FILTER_SINGLE_COLUMN";
                            FilteringMode[FilteringMode["FILTER_MULTIPLE_COLUMNS"] = 2] = "FILTER_MULTIPLE_COLUMNS";
                            FilteringMode[FilteringMode["FILTER_ALLOW_EQUALS"] = 4] = "FILTER_ALLOW_EQUALS";
                            FilteringMode[FilteringMode["FILTER_ALLOW_RANGES"] = 8] = "FILTER_ALLOW_RANGES";
                            FilteringMode[FilteringMode["FILTER_ALLOW_LIKE_RIGHT_SIDE"] = 16] = "FILTER_ALLOW_LIKE_RIGHT_SIDE";
                            FilteringMode[FilteringMode["FILTER_ALLOW_LIKE_LEFT_SIDE"] = 32] = "FILTER_ALLOW_LIKE_LEFT_SIDE";
                            FilteringMode[FilteringMode["FILTER_ALLOW_LIKE_ANYWHERE"] = 64] = "FILTER_ALLOW_LIKE_ANYWHERE";
                            FilteringMode[FilteringMode["FILTER_ALLOW_NULL"] = 128] = "FILTER_ALLOW_NULL";
                            FilteringMode[FilteringMode["FILTER_ALLOW_ALL"] = 252] = "FILTER_ALLOW_ALL";
                        })(FilteringMode = Enums.FilteringMode || (Enums.FilteringMode = {}));
                    })(Enums = AgGrids.Enums || (AgGrids.Enums = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=FilteringMode.js.map