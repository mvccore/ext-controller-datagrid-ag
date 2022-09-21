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
                        var RowSelection;
                        (function (RowSelection) {
                            RowSelection[RowSelection["ROW_SELECTION_NONE"] = 1] = "ROW_SELECTION_NONE";
                            RowSelection[RowSelection["ROW_SELECTION_SINGLE"] = 2] = "ROW_SELECTION_SINGLE";
                            RowSelection[RowSelection["ROW_SELECTION_MULTIPLE"] = 4] = "ROW_SELECTION_MULTIPLE";
                            RowSelection[RowSelection["ROW_SELECTION_NOT_DESELECT"] = 8] = "ROW_SELECTION_NOT_DESELECT";
                            RowSelection[RowSelection["ROW_SELECTION_AUTOSELECT_FIRST"] = 16] = "ROW_SELECTION_AUTOSELECT_FIRST";
                        })(RowSelection = Enums.RowSelection || (Enums.RowSelection = {}));
                    })(Enums = AgGrids.Enums || (AgGrids.Enums = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=RowSelection.js.map