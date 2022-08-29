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
                    var ColumnsManager = /** @class */ (function () {
                        function ColumnsManager(grid) {
                            var _newTarget = this.constructor;
                            this.Static = _newTarget;
                            this.grid = grid;
                            this.options = grid.GetOptions();
                            this.eventsManager = grid.GetEvents();
                            this.helpers = grid.GetHelpers();
                        }
                        ColumnsManager.prototype.SetAgColumns = function (gridColumns) {
                            this.agColumns = gridColumns;
                            return this;
                        };
                        ColumnsManager.prototype.GetAgColumns = function () {
                            return this.agColumns;
                        };
                        ColumnsManager.prototype.SetDefaultColDef = function (defaultColDef) {
                            this.defaultColDef = defaultColDef;
                            return this;
                        };
                        ColumnsManager.prototype.GetDefaultColDef = function () {
                            return this.defaultColDef;
                        };
                        ColumnsManager.prototype.Init = function () {
                            return this
                                .initServerCfgAndViewHelper()
                                .initColumns()
                                .initDefaultColDef();
                        };
                        ColumnsManager.prototype.initServerCfgAndViewHelper = function () {
                            this.serverConfig = this.grid.GetServerConfig();
                            this.viewHelper = new AgGrids.ColumnsManagers.ViewHelper(this.grid);
                            return this;
                        };
                        ColumnsManager.prototype.initColumns = function () {
                            this.agColumns = [];
                            var agColumn, serverColumnCfg, serverColumns = this.serverConfig.columns;
                            for (var columnUrlName in serverColumns) {
                                serverColumnCfg = serverColumns[columnUrlName];
                                if (serverColumnCfg.disabled === true)
                                    continue;
                                agColumn = this.initColumn(serverColumnCfg);
                                this.agColumns.push(agColumn);
                            }
                            return this;
                        };
                        ColumnsManager.prototype.initColumn = function (serverColumnCfg) {
                            var column = {
                                colId: serverColumnCfg.urlName,
                                field: serverColumnCfg.propName,
                                headerName: serverColumnCfg.headingName,
                                tooltipField: serverColumnCfg.propName
                            };
                            column.filter = !(serverColumnCfg.filter === false);
                            column.sortable = !(serverColumnCfg.sort === false);
                            var serverType = serverColumnCfg.types[serverColumnCfg.types.length - 1];
                            if (this.Static.types.has(serverType))
                                column.type = this.Static.types.get(serverType);
                            // TODO
                            if (column.type === 'dateColumn') {
                                if (column.filter)
                                    column.filter = 'agDateColumnFilter';
                            }
                            this.viewHelper.SetUpColumnCfg(column, serverColumnCfg);
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
                        ColumnsManager.prototype.initDefaultColDef = function () {
                            this.defaultColDef = {
                                floatingFilter: true,
                                suppressMenu: true,
                                resizable: true,
                                editable: false,
                                flex: 1,
                                tooltipComponent: AgGrids.ToolTip
                            };
                            return this;
                        };
                        ColumnsManager.types = new Map([
                            [AgGrids.Enums.ServerType.INT, "numericColumn"],
                            [AgGrids.Enums.ServerType.FLOAT, "numericColumn"],
                            [AgGrids.Enums.ServerType.DATE, "dateColumn"],
                            [AgGrids.Enums.ServerType.DATE_TIME, "dateColumn"],
                            [AgGrids.Enums.ServerType.TIME, "dateColumn"],
                        ]);
                        return ColumnsManager;
                    }());
                    AgGrids.ColumnsManager = ColumnsManager;
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=ColumnsManager.js.map