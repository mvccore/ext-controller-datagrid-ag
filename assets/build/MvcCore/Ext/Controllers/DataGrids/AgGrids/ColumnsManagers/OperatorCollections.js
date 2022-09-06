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
                            TypesPossibleOperators.typesPossibleOperators = new Map([
                                [AgGrids.Enums.ServerType.STRING, [
                                        AgGrids.Enums.Operator.EQUAL,
                                        AgGrids.Enums.Operator.NOT_EQUAL,
                                        AgGrids.Enums.Operator.LIKE,
                                        AgGrids.Enums.Operator.NOT_LIKE
                                    ]],
                                [AgGrids.Enums.ServerType.INT, [
                                        AgGrids.Enums.Operator.EQUAL,
                                        AgGrids.Enums.Operator.NOT_EQUAL,
                                        AgGrids.Enums.Operator.LOWER,
                                        AgGrids.Enums.Operator.LOWER_EQUAL,
                                        AgGrids.Enums.Operator.GREATER,
                                        AgGrids.Enums.Operator.GREATER_EQUAL
                                    ]],
                                [AgGrids.Enums.ServerType.FLOAT, [
                                        AgGrids.Enums.Operator.EQUAL,
                                        AgGrids.Enums.Operator.NOT_EQUAL,
                                        AgGrids.Enums.Operator.LOWER,
                                        AgGrids.Enums.Operator.LOWER_EQUAL,
                                        AgGrids.Enums.Operator.GREATER,
                                        AgGrids.Enums.Operator.GREATER_EQUAL
                                    ]],
                                [AgGrids.Enums.ServerType.DATE, [
                                        AgGrids.Enums.Operator.EQUAL,
                                        AgGrids.Enums.Operator.NOT_EQUAL,
                                        AgGrids.Enums.Operator.LOWER,
                                        AgGrids.Enums.Operator.LOWER_EQUAL,
                                        AgGrids.Enums.Operator.GREATER,
                                        AgGrids.Enums.Operator.GREATER_EQUAL,
                                        AgGrids.Enums.Operator.LIKE,
                                        AgGrids.Enums.Operator.NOT_LIKE
                                    ]],
                                [AgGrids.Enums.ServerType.DATE_TIME, [
                                        AgGrids.Enums.Operator.EQUAL
                                    ]],
                                [AgGrids.Enums.ServerType.TIME, [
                                        AgGrids.Enums.Operator.EQUAL
                                    ]],
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
//# sourceMappingURL=OperatorCollections.js.map