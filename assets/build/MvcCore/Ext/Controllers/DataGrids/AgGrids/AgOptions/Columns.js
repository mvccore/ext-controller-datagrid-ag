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
                                var agColumn, serverColumnCfg, serverConfig = this.grid.GetServerConfig(), serverColumns = serverConfig.columns;
                                for (var columnUrlName in serverColumns) {
                                    serverColumnCfg = serverColumns[columnUrlName];
                                    if (serverColumnCfg.disabled === true)
                                        continue;
                                    agColumn = this.initColumn(columnUrlName, serverColumnCfg, serverConfig);
                                    this.agColumns.push(agColumn);
                                }
                                return this;
                            };
                            Columns.prototype.initColumn = function (columnUrlName, serverColumnCfg, serverConfig) {
                                var column = {
                                    colId: columnUrlName,
                                    field: serverColumnCfg.propName,
                                    headerName: serverColumnCfg.headingName,
                                    tooltipField: serverColumnCfg.propName,
                                    floatingFilter: true,
                                    suppressMenu: true,
                                    resizable: true,
                                    editable: false
                                };
                                column.filter = !(serverColumnCfg.filter === false);
                                column.sortable = !(serverColumnCfg.sort === false);
                                var serverType = serverColumnCfg.types[0];
                                if (this.Static.types.has(serverType)) {
                                    column.type = this.Static.types.get(serverType);
                                    console.log(column.type);
                                    if (column.type === 'dateColumn') {
                                        if (column.filter)
                                            column.filter = 'agDateColumnFilter';
                                        column.valueFormatter = function (params) {
                                            // TODO
                                            var dateAsString = params.data[serverColumnCfg.propName];
                                            var dateTime = Date.parse(dateAsString) + serverConfig.timeZoneOffset;
                                            var formatArgs = serverColumnCfg.format;
                                            return moment(dateTime).format(formatArgs[formatArgs.length - 1]);
                                        };
                                    }
                                }
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
                                    resizable: true,
                                    tooltipComponent: AgGrids.ToolTip
                                };
                                return this;
                            };
                            Columns.types = new Map([
                                ["string", "textColumn"],
                                ["int", "numericColumn"],
                                ["float", "numericColumn"],
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