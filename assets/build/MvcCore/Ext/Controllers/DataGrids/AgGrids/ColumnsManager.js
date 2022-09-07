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
                                //tooltipComponent: AgGrids.ToolTip TODO
                            };
                            this.sortHeaderDefaults = {
                                renderDirection: true,
                                renderRemove: true,
                                renderSequence: true,
                            };
                            this.filterHeaderDefaults = {
                                suppressFilterButton: false,
                                submitDelayMs: 300
                            };
                            this.filterMenuDefaults = {
                                suppressAndOrCondition: true,
                                buttons: AgGrids.Enums.FilterButton.APPLY | AgGrids.Enums.FilterButton.CLEAR | AgGrids.Enums.FilterButton.CANCEL
                            };
                            this.Static = _newTarget;
                            this.grid = grid;
                            this.options = grid.GetOptions();
                            this.eventsManager = grid.GetEvents();
                            this.helpers = grid.GetHelpers();
                            var isTouchDevice = this.helpers.IsTouchDevice();
                            this.sortHeaderDefaults.renderRemove = !isTouchDevice;
                            if (!isTouchDevice) {
                                this.filterHeaderDefaults.submitDelayMs = 0;
                            }
                            this.filterMenuDefaults.isTouchDevice = isTouchDevice;
                            this.allServerColumnsSorted = [];
                            this.activeServerColumnsSorted = [];
                        }
                        ColumnsManager.prototype.SetAllServerColumnsSorted = function (allServerColumnsSorted) {
                            this.allServerColumnsSorted = allServerColumnsSorted;
                            return this;
                        };
                        ColumnsManager.prototype.GetAllServerColumnsSorted = function () {
                            return this.allServerColumnsSorted;
                        };
                        ColumnsManager.prototype.SetActiveServerColumnsSorted = function (activeServerColumnsSorted) {
                            this.activeServerColumnsSorted = activeServerColumnsSorted;
                            return this;
                        };
                        ColumnsManager.prototype.GetActiveServerColumnsSorted = function () {
                            return this.activeServerColumnsSorted;
                        };
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
                            var e_1, _a, e_2, _b;
                            this.agColumnsConfigs = new Map();
                            var agColumn, serverColumnCfg, columnUrlName;
                            this.allServerColumnsSorted = this.helpers.SortConfigColumns(this.serverConfig.columns);
                            this.grid.SetSortHeaders(new Map());
                            this.grid.SetFilterHeaders(new Map());
                            this.grid.SetFilterMenus(new Map());
                            try {
                                for (var _c = __values(this.allServerColumnsSorted), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var serverColumnCfg = _d.value;
                                    columnUrlName = serverColumnCfg.urlName;
                                    if (serverColumnCfg.disabled === true)
                                        continue;
                                    serverColumnCfg.activeColumnIndex = this.activeServerColumnsSorted.length;
                                    this.activeServerColumnsSorted.push(serverColumnCfg);
                                    agColumn = this.initColumn(serverColumnCfg);
                                    this.agColumnsConfigs.set(columnUrlName, agColumn);
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                            var sortIndex = 0;
                            try {
                                for (var _e = __values(this.initData.sorting), _f = _e.next(); !_f.done; _f = _e.next()) {
                                    var sortItem = _f.value;
                                    var _g = __read(sortItem, 2), columnUrlName = _g[0], sortDirection = _g[1];
                                    agColumn = this.agColumnsConfigs.get(columnUrlName);
                                    var headerComponentParams = agColumn.headerComponentParams;
                                    headerComponentParams.direction = sortDirection;
                                    headerComponentParams.sequence = sortIndex;
                                    sortIndex++;
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                                }
                                finally { if (e_2) throw e_2.error; }
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
                            this.initColumnSorting(column, serverColumnCfg);
                            this.initColumnFiltering(column, serverColumnCfg);
                            this.viewHelper.SetUpColumnCfg(column, serverColumnCfg);
                            this.initColumnStyles(column, serverColumnCfg);
                            return column;
                        };
                        ColumnsManager.prototype.initColumnSorting = function (column, serverColumnCfg) {
                            column.sortable = !(serverColumnCfg.sort === false);
                            var headerComponentParams = __assign(__assign({}, this.sortHeaderDefaults), {
                                grid: this.grid,
                                columnId: serverColumnCfg.urlName,
                                sortable: column.sortable
                            });
                            column.headerComponentParams = headerComponentParams;
                            return this;
                        };
                        ColumnsManager.prototype.initColumnFiltering = function (column, serverColumnCfg) {
                            var e_3, _a, e_4, _b;
                            column.filter = (serverColumnCfg.filter !== AgGrids.Enums.FilteringMode.DISABLED &&
                                serverColumnCfg.filter !== false);
                            if (!column.filter)
                                return this;
                            var filtering = this.grid.GetFiltering(), filteringItem = filtering.has(serverColumnCfg.urlName)
                                ? filtering.get(serverColumnCfg.urlName)
                                : null;
                            column.floatingFilterComponent = AgGrids.ColumnsManagers.FilterHeader;
                            var floatingFilterComponentParams = __assign(__assign({}, this.filterHeaderDefaults), {
                                grid: this.grid,
                                columnId: serverColumnCfg.urlName,
                                filteringItem: filteringItem
                            });
                            column.floatingFilterComponentParams = floatingFilterComponentParams;
                            var serverType = serverColumnCfg.types[serverColumnCfg.types.length - 1], filterMenuClass = AgGrids.ColumnsManagers.FilterMenu, serverTypesExtendefFilterMenus = AgGrids.ColumnsManagers.FilterOperatorsCfg.SERVER_TYPES_EXTENDED_FILTER_MENUS;
                            if (serverTypesExtendefFilterMenus.has(serverType))
                                filterMenuClass = serverTypesExtendefFilterMenus.get(serverType);
                            column.filter = filterMenuClass;
                            var allControlTypes = AgGrids.ColumnsManagers.FilterOperatorsCfg.FILTERING_CONTROL_TYPES, columnControlTypes = AgGrids.Enums.FilterControlType.UNKNOWN, columnFiltering = Number(serverColumnCfg.filter);
                            try {
                                for (var _c = __values(allControlTypes.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var _e = __read(_d.value, 2), filteringMode = _e[0], controlTypes = _e[1];
                                    if ((columnFiltering & filteringMode) != 0) {
                                        try {
                                            for (var controlTypes_1 = (e_4 = void 0, __values(controlTypes)), controlTypes_1_1 = controlTypes_1.next(); !controlTypes_1_1.done; controlTypes_1_1 = controlTypes_1.next()) {
                                                var controlType = controlTypes_1_1.value;
                                                columnControlTypes |= controlType;
                                            }
                                        }
                                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                        finally {
                                            try {
                                                if (controlTypes_1_1 && !controlTypes_1_1.done && (_b = controlTypes_1.return)) _b.call(controlTypes_1);
                                            }
                                            finally { if (e_4) throw e_4.error; }
                                        }
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                            var filterMenuParams = __assign(__assign({}, this.filterMenuDefaults), {
                                grid: this.grid,
                                columnId: serverColumnCfg.urlName,
                                serverColumnCfg: serverColumnCfg,
                                serverType: serverType,
                                filteringItem: filteringItem,
                                controlTypes: columnControlTypes
                            });
                            column.filterParams = filterMenuParams;
                            return this;
                        };
                        ColumnsManager.prototype.initColumnStyles = function (column, serverColumnCfg) {
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
                            return this;
                        };
                        return ColumnsManager;
                    }());
                    AgGrids.ColumnsManager = ColumnsManager;
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=ColumnsManager.js.map