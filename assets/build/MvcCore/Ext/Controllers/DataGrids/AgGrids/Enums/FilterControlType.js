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
                        var FilterControlType;
                        (function (FilterControlType) {
                            FilterControlType[FilterControlType["UNKNOWN"] = 0] = "UNKNOWN";
                            FilterControlType[FilterControlType["EQUAL"] = 1] = "EQUAL";
                            FilterControlType[FilterControlType["NOT_EQUAL"] = 2] = "NOT_EQUAL";
                            FilterControlType[FilterControlType["IS_NULL"] = 4] = "IS_NULL";
                            FilterControlType[FilterControlType["IS_NOT_NULL"] = 8] = "IS_NOT_NULL";
                            FilterControlType[FilterControlType["CONTAINS"] = 16] = "CONTAINS";
                            FilterControlType[FilterControlType["NOT_CONTAINS"] = 32] = "NOT_CONTAINS";
                            FilterControlType[FilterControlType["STARTS_WITH"] = 64] = "STARTS_WITH";
                            FilterControlType[FilterControlType["ENDS_WITH"] = 128] = "ENDS_WITH";
                            FilterControlType[FilterControlType["NOT_STARTS_WITH"] = 256] = "NOT_STARTS_WITH";
                            FilterControlType[FilterControlType["NOT_ENDS_WITH"] = 512] = "NOT_ENDS_WITH";
                            FilterControlType[FilterControlType["LOWER"] = 1024] = "LOWER";
                            FilterControlType[FilterControlType["LOWER_EQUAL"] = 2048] = "LOWER_EQUAL";
                            FilterControlType[FilterControlType["GREATER"] = 4096] = "GREATER";
                            FilterControlType[FilterControlType["GREATER_EQUAL"] = 8192] = "GREATER_EQUAL";
                            FilterControlType[FilterControlType["IS_TRUE"] = 16384] = "IS_TRUE";
                            FilterControlType[FilterControlType["IS_FALSE"] = 32768] = "IS_FALSE";
                        })(FilterControlType = Enums.FilterControlType || (Enums.FilterControlType = {}));
                    })(Enums = AgGrids.Enums || (AgGrids.Enums = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=FilterControlType.js.map