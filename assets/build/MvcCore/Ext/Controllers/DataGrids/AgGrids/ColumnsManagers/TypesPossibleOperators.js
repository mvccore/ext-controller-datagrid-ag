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
                        var TypesPossibleOperators = /** @class */ (function () {
                            function TypesPossibleOperators() {
                            }
                            ;
                            TypesPossibleOperators.DATA = new Map([
                                [AgGrids.Enums.ServerType.STRING, new Map([
                                        [AgGrids.Enums.FilteringMode.ALLOW_EQUALS, [
                                                AgGrids.Enums.Operator.EQUAL,
                                                AgGrids.Enums.Operator.NOT_EQUAL,
                                            ]]
                                    ])],
                                [AgGrids.Enums.ServerType.STRING, new Map([
                                        [AgGrids.Enums.FilteringMode.ALLOW_EQUALS, [
                                                AgGrids.Enums.Operator.EQUAL,
                                                AgGrids.Enums.Operator.NOT_EQUAL,
                                            ]]
                                    ])],
                                AgGrids.Enums.Operator.LIKE,
                                AgGrids.Enums.Operator.NOT_LIKE
                            ]);
                            return TypesPossibleOperators;
                        }());
                        ColumnsManagers.TypesPossibleOperators = TypesPossibleOperators;
                    })(ColumnsManagers = AgGrids.ColumnsManagers || (AgGrids.ColumnsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=TypesPossibleOperators.js.map