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
                        var ClientModelType;
                        (function (ClientModelType) {
                            ClientModelType[ClientModelType["FIXED_DATA"] = 1] = "FIXED_DATA";
                            ClientModelType[ClientModelType["DYNAMIC_LOADING"] = 2] = "DYNAMIC_LOADING";
                        })(ClientModelType = Enums.ClientModelType || (Enums.ClientModelType = {}));
                    })(Enums = AgGrids.Enums || (AgGrids.Enums = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=ClientModelType.js.map