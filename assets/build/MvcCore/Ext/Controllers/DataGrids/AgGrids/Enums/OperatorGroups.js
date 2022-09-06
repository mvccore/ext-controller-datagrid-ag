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
                        var OperatorGroups;
                        (function (OperatorGroups) {
                            OperatorGroups[OperatorGroups["EQUALS"] = 0] = "EQUALS";
                            OperatorGroups[OperatorGroups["RANGES"] = 1] = "RANGES";
                            OperatorGroups[OperatorGroups["LIKE_RIGHT_SIDE"] = 2] = "LIKE_RIGHT_SIDE";
                            OperatorGroups[OperatorGroups["LIKE_LEFT_SIDE"] = 3] = "LIKE_LEFT_SIDE";
                            OperatorGroups[OperatorGroups["LIKE_ANYWHERE"] = 4] = "LIKE_ANYWHERE";
                        })(OperatorGroups = Enums.OperatorGroups || (Enums.OperatorGroups = {}));
                    })(Enums = AgGrids.Enums || (AgGrids.Enums = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=OperatorGroups.js.map