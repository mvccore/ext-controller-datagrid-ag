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
                        var Operator;
                        (function (Operator) {
                            Operator["NOT_EQUAL"] = "!=";
                            Operator["LOWER"] = "<";
                            Operator["LOWER_EQUAL"] = "<=";
                            Operator["EQUAL"] = "=";
                            Operator["GREATER"] = ">";
                            Operator["GREATER_EQUAL"] = ">=";
                            Operator["LIKE"] = "LIKE";
                            Operator["NOT_LIKE"] = "NOT LIKE";
                        })(Operator = Enums.Operator || (Enums.Operator = {}));
                    })(Enums = AgGrids.Enums || (AgGrids.Enums = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Operator.js.map