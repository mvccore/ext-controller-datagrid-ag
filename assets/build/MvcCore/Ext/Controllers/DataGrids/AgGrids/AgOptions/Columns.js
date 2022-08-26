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
                    var AgOptions;
                    (function (AgOptions) {
                        var Columns = /** @class */ (function () {
                            function Columns(grid) {
                                var _newTarget = this.constructor;
                                this.Static = _newTarget;
                                this.grid = grid;
                                this.options = grid.GetOptions();
                                this.eventsManager = grid.GetEvents();
                                this.helpers = grid.GetHelpers();
                            }
                            Columns.prototype.SetAgColumns = function (gridColumns) {
                                this.agColumns = gridColumns;
                                return this;
                            };
                            Columns.prototype.GetAgColumns = function () {
                                return this.agColumns;
                            };
                            Columns.prototype.SetDefaultColDef = function (defaultColDef) {
                                this.defaultColDef = defaultColDef;
                                return this;
                            };
                            Columns.prototype.GetDefaultColDef = function () {
                                return this.defaultColDef;
                            };
                            Columns.prototype.Init = function () {
                                return this
                                    .initColumns()
                                    .initDefaultColDef();
                            };
                            Columns.prototype.initColumns = function () {
                                this.agColumns = [];
                                var agColumn, serverColumnCfg, serverColumns = this.grid.GetServerConfig().columns;
                                for (var columnUrlName in serverColumns) {
                                    serverColumnCfg = serverColumns[columnUrlName];
                                    if (serverColumnCfg.disabled === true)
                                        continue;
                                    agColumn = this.initColumn(columnUrlName, serverColumnCfg);
                                    this.agColumns.push(agColumn);
                                }
                                return this;
                            };
                            Columns.prototype.initColumn = function (columnUrlName, serverColumnCfg) {
                                var column = {
                                    colId: columnUrlName,
                                    field: serverColumnCfg.propName,
                                    headerName: serverColumnCfg.headingName,
                                    tooltipField: serverColumnCfg.propName,
                                    resizable: true,
                                    editable: false
                                };
                                var serverType = serverColumnCfg.types[0];
                                console.log(serverColumnCfg.types);
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
                                if (serverColumnCfg.editable != null && typeof (serverColumnCfg.editable) == 'boolean')
                                    column.editable = serverColumnCfg.editable;
                                return column;
                            };
                            Columns.prototype.initDefaultColDef = function () {
                                this.defaultColDef = {
                                    flex: 1,
                                    //minWidth: 200,
                                    filter: true,
                                    resizable: true,
                                    sortable: true,
                                    floatingFilter: true,
                                    suppressMenu: true,
                                    editable: true,
                                    tooltipComponent: AgGrids.ToolTip
                                };
                                return this;
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
                        AgOptions.Columns = Columns;
                    })(AgOptions = AgGrids.AgOptions || (AgGrids.AgOptions = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Columns.js.map