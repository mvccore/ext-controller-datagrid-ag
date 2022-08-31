var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
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
                            this.agColumnDefaults = {
                                floatingFilter: true,
                                suppressMenu: true,
                                resizable: true,
                                editable: false,
                                flex: 1,
                                headerComponent: AgGrids.ColumnsManagers.SortHeader,
                                tooltipComponent: AgGrids.ToolTip
                            };
                            this.sortHeaderDefaults = {
                                renderDirection: true,
                                renderRemove: true,
                                renderSequence: true,
                            };
                            this.Static = _newTarget;
                            this.grid = grid;
                            this.options = grid.GetOptions();
                            this.eventsManager = grid.GetEvents();
                            this.helpers = grid.GetHelpers();
                            this.sortHeaderDefaults.renderRemove = !this.helpers.IsTouchDevice();
                        }
                        ColumnsManager.prototype.SetAgColumnsConfigs = function (gridColumns) {
                            this.agColumnsConfigs = gridColumns;
                            return this;
                        };
                        ColumnsManager.prototype.GetAgColumnsConfigs = function () {
                            return this.agColumnsConfigs;
                        };
                        ColumnsManager.prototype.SetAgColumnDefaults = function (defaultColDef) {
                            this.agColumnDefaults = defaultColDef;
                            return this;
                        };
                        ColumnsManager.prototype.GetAgColumnDefaults = function () {
                            return this.agColumnDefaults;
                        };
                        ColumnsManager.prototype.Init = function () {
                            return this
                                .initServerCfgAndViewHelper()
                                .initColumns();
                        };
                        ColumnsManager.prototype.initServerCfgAndViewHelper = function () {
                            this.serverConfig = this.grid.GetServerConfig();
                            this.initData = this.grid.GetInitialData();
                            this.viewHelper = new AgGrids.ColumnsManagers.ViewHelper(this.grid);
                            this.sortHeaderDefaults.renderSequence = ((this.serverConfig.sortingMode & AgGrids.Enums.SortingMode.SORT_MULTIPLE_COLUMNS) != 0);
                            return this;
                        };
                        ColumnsManager.prototype.initColumns = function () {
                            var e_1, _a;
                            this.agColumnsConfigs = new Map();
                            var agColumn, serverColumnCfg, serverColumns = this.serverConfig.columns;
                            this.grid.SetSortHeaders(new Map());
                            for (var columnUrlName in serverColumns) {
                                serverColumnCfg = serverColumns[columnUrlName];
                                if (serverColumnCfg.disabled === true)
                                    continue;
                                agColumn = this.initColumn(serverColumnCfg);
                                this.agColumnsConfigs.set(columnUrlName, agColumn);
                            }
                            var sortIndex = 0;
                            try {
                                for (var _b = __values(this.initData.sorting), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var sortItem = _c.value;
                                    var _d = __read(sortItem, 2), columnUrlName = _d[0], sortDirection = _d[1];
                                    agColumn = this.agColumnsConfigs.get(columnUrlName);
                                    var headerComponentParams = agColumn.headerComponentParams;
                                    headerComponentParams.direction = sortDirection;
                                    headerComponentParams.sequence = sortIndex;
                                    sortIndex++;
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_1) throw e_1.error; }
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
                            var headerComponentParams = __assign(__assign({}, this.sortHeaderDefaults), {
                                grid: this.grid,
                                columnId: serverColumnCfg.urlName,
                                sortable: column.sortable
                            });
                            column.headerComponentParams = headerComponentParams;
                            var serverType = serverColumnCfg.types[serverColumnCfg.types.length - 1];
                            if (this.Static.agColumnsTypes.has(serverType))
                                column.type = this.Static.agColumnsTypes.get(serverType);
                            column.filterParams = {
                                suppressAndOrCondition: true,
                                /*filterOptions:[
                                    'equals',
                                    'notEqual',
                                    'contains',
                                    'notContains',
                                    'startsWith',
                                    'endsWith',
                                    'lessThan',
                                    'lessThanOrEqual',
                                    'greaterThan',
                                    'greaterThanOrEqual',
                                    'inRange',
                
                                    'blank',
                                    'notBlank',
                                    'empty'
                                ],*/
                                buttons: [
                                    'apply', 'clear', 'reset', 'cancel'
                                ]
                            };
                            // TODO
                            if (column.type === 'dateColumn') {
                                if (column.filter)
                                    column.filter = 'agDateColumnFilter';
                                column.floatingFilterComponent = AgGrids.ColumnsManagers.FilterInput;
                                column.floatingFilterComponentParams = {
                                    suppressFilterButton: false,
                                    context: this.grid
                                };
                            }
                            if (column.type === 'numericColumn') {
                                column.filter = AgGrids.ColumnsManagers.FilterMenu;
                                column.filterParams = {
                                    context: this.grid
                                };
                                column.floatingFilterComponent = AgGrids.ColumnsManagers.FilterInput;
                                column.floatingFilterComponentParams = {
                                    suppressFilterButton: false,
                                    context: this.grid
                                };
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
                        ColumnsManager.agColumnsTypes = new Map([
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