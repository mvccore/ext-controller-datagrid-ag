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
                    var SubOptions;
                    (function (SubOptions) {
                        var Columns = /** @class */ (function () {
                            function Columns(grid) {
                                var _newTarget = this.constructor;
                                this.Static = _newTarget;
                                this.grid = grid;
                                this.options = grid.GetOptions();
                                this.events = grid.GetEvents();
                                this.helpers = grid.GetHelpers();
                            }
                            Columns.prototype.Init = function () {
                                var serverColumns = this.grid.GetServerConfig().columns;
                                var gridColumns = [];
                                var gridColumn;
                                var serverColumnCfg;
                                for (var columnUrlName in serverColumns) {
                                    serverColumnCfg = serverColumns[columnUrlName];
                                    if (serverColumnCfg.disabled === true)
                                        continue;
                                    gridColumn = this.initColumn(columnUrlName, serverColumnCfg);
                                    gridColumns.push(gridColumn);
                                }
                                this.options.SetAgColumns(gridColumns);
                            };
                            Columns.prototype.initColumn = function (columnUrlName, serverColumnCfg) {
                                var column = {
                                    colId: columnUrlName,
                                    field: serverColumnCfg.propName,
                                    headerName: serverColumnCfg.headingName,
                                    tooltipField: serverColumnCfg.propName,
                                    resizable: true
                                };
                                var serverType = serverColumnCfg.types[0];
                                if (this.Static.types.has(serverType))
                                    column.type = this.Static.types.get(serverType);
                                column.filter = !(serverColumnCfg.filter === false);
                                column.sortable = !(serverColumnCfg.sort === false);
                                if (serverColumnCfg.width != null && typeof (serverColumnCfg.width) == 'number')
                                    column.width = serverColumnCfg.width;
                                if (serverColumnCfg.minWidth != null && typeof (serverColumnCfg.minWidth) == 'number')
                                    column.minWidth = serverColumnCfg.minWidth;
                                if (serverColumnCfg.maxWidth != null && typeof (serverColumnCfg.maxWidth) == 'number')
                                    column.maxWidth = serverColumnCfg.maxWidth;
                                if (serverColumnCfg.flex != null && typeof (serverColumnCfg.flex) == 'number')
                                    column.flex = serverColumnCfg.flex;
                                return column;
                            };
                            Columns.types = new Map([
                                ["string", "textColumn"],
                                ["int", "numericColumn"],
                                ["float", "numericColumn"],
                                ["\\Date", "dateColumn"],
                                ["\\DateTime", "dateColumn"],
                            ]);
                            return Columns;
                        }());
                        SubOptions.Columns = Columns;
                    })(SubOptions = AgGrids.SubOptions || (AgGrids.SubOptions = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Columns%20copy.js.map