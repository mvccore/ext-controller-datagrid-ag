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
                    var Columns;
                    (function (Columns) {
                        var Manager = /** @class */ (function () {
                            function Manager(grid) {
                                var _newTarget = this.constructor;
                                this.agColumnDefaults = {
                                    floatingFilter: true,
                                    suppressMenu: true,
                                    resizable: true,
                                    editable: false,
                                    flex: 1
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
                                this.optionsManager = grid.GetOptionsManager();
                                this.eventsManager = grid.GetEvents();
                                this.helpers = grid.GetHelpers();
                                var isTouchDevice = this.helpers.IsTouchDevice();
                                this.sortHeaderDefaults.renderRemove = !isTouchDevice;
                                if (!isTouchDevice) {
                                    this.filterHeaderDefaults.submitDelayMs = 0;
                                }
                                this.filterMenuDefaults.isTouchDevice = isTouchDevice;
                                this.serverColumnsMapAll = new Map();
                                this.serverColumnsSortedAll = [];
                                this.serverColumnsUserSortedAll = [];
                                this.serverColumnsSortedActive = [];
                            }
                            Manager.prototype.SetServerColumnsMapAll = function (serverColumnsMapAll) {
                                this.serverColumnsMapAll = serverColumnsMapAll;
                                return this;
                            };
                            Manager.prototype.GetServerColumnsMapAll = function () {
                                return this.serverColumnsMapAll;
                            };
                            Manager.prototype.SetServerColumnsSortedAll = function (serverColumnsSortedAll) {
                                this.serverColumnsSortedAll = serverColumnsSortedAll;
                                return this;
                            };
                            Manager.prototype.GetServerColumnsSortedAll = function () {
                                return this.serverColumnsSortedAll;
                            };
                            Manager.prototype.SetServerColumnsUserSortedAll = function (serverColumnsUserSortedAll) {
                                this.serverColumnsUserSortedAll = serverColumnsUserSortedAll;
                                return this;
                            };
                            Manager.prototype.GetServerColumnsUserSortedAll = function () {
                                return this.serverColumnsUserSortedAll;
                            };
                            Manager.prototype.SetServerColumnsSortedActive = function (serverColumnsSortedActive) {
                                this.serverColumnsSortedActive = serverColumnsSortedActive;
                                return this;
                            };
                            Manager.prototype.GetServerColumnsSortedActive = function () {
                                return this.serverColumnsSortedActive;
                            };
                            Manager.prototype.SetAgColumnsConfigs = function (gridColumns) {
                                this.agColumnsConfigs = gridColumns;
                                return this;
                            };
                            Manager.prototype.GetAgColumnsConfigs = function () {
                                return this.agColumnsConfigs;
                            };
                            Manager.prototype.SetAgColumnDefaults = function (defaultColDef) {
                                this.agColumnDefaults = defaultColDef;
                                return this;
                            };
                            Manager.prototype.GetAgColumnDefaults = function () {
                                return this.agColumnDefaults;
                            };
                            Manager.prototype.Init = function () {
                                return this
                                    .initServerCfgAndViewHelper()
                                    .initColumns();
                            };
                            Manager.prototype.initServerCfgAndViewHelper = function () {
                                this.serverConfig = this.grid.GetServerConfig();
                                this.initData = this.grid.GetInitialData();
                                this.viewHelper = new this.grid.Static.Classes.Columns.ViewHelper(this.grid);
                                this.sortHeaderDefaults.renderSequence = ((this.serverConfig.sortingMode & AgGrids.Enums.SortingMode.SORT_MULTIPLE_COLUMNS) != 0);
                                var renderConfig = this.serverConfig.renderConfig;
                                this.sortingEnabled = renderConfig.renderTableHead && renderConfig.renderTableHeadSorting;
                                this.filteringEnabled = renderConfig.renderTableHead && renderConfig.renderTableHeadFiltering;
                                if (!this.filteringEnabled) {
                                    this.agColumnDefaults.floatingFilter = false;
                                }
                                return this;
                            };
                            Manager.prototype.initColumns = function () {
                                var e_1, _a, e_2, _b;
                                var _this = this;
                                this.agColumnsConfigs = new Map();
                                var agColumn, serverColumnCfg, serverColumnsArr = [], columnUrlName;
                                Object.keys(this.serverConfig.columns).forEach(function (columnUrlName) { return serverColumnsArr.push(_this.serverConfig.columns[columnUrlName]); });
                                this.serverColumnsSortedAll = this.helpers.SortConfigColumns(serverColumnsArr, 'columnIndex');
                                this.serverColumnsUserSortedAll = this.helpers.SortConfigColumns(this.serverColumnsSortedAll, 'columnIndexUser');
                                this.grid.SetSortHeaders(new Map());
                                this.grid.SetFilterHeaders(new Map());
                                this.grid.SetFilterMenus(new Map());
                                try {
                                    for (var _c = __values(this.serverColumnsUserSortedAll), _d = _c.next(); !_d.done; _d = _c.next()) {
                                        var serverColumnCfg = _d.value;
                                        columnUrlName = serverColumnCfg.urlName;
                                        this.serverColumnsMapAll.set(serverColumnCfg.propName, serverColumnCfg);
                                        if (serverColumnCfg.disabled === true)
                                            continue;
                                        serverColumnCfg.columnIndexActive = this.serverColumnsSortedActive.length;
                                        this.serverColumnsSortedActive.push(serverColumnCfg);
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
                                        if (headerComponentParams != null) {
                                            headerComponentParams.direction = sortDirection;
                                            headerComponentParams.sequence = sortIndex;
                                        }
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
                            Manager.prototype.initColumn = function (serverColumnCfg) {
                                var column = {
                                    colId: serverColumnCfg.urlName,
                                    field: serverColumnCfg.propName,
                                    headerName: serverColumnCfg.headingName,
                                    tooltipField: serverColumnCfg.propName
                                };
                                if (serverColumnCfg.cssClasses != null && serverColumnCfg.cssClasses.length > 0)
                                    column.headerClass = column.cellClass = serverColumnCfg.cssClasses.join(' ');
                                this.initColumnSorting(column, serverColumnCfg);
                                this.initColumnFiltering(column, serverColumnCfg);
                                this.viewHelper.SetUpColumnCfg(column, serverColumnCfg);
                                this.initColumnStyles(column, serverColumnCfg);
                                return column;
                            };
                            Manager.prototype.initColumnSorting = function (column, serverColumnCfg) {
                                column.sortable = this.sortingEnabled && !(serverColumnCfg.sort === false);
                                if (!column.sortable)
                                    return this;
                                var headerComponentParams = __assign(__assign({}, this.sortHeaderDefaults), {
                                    grid: this.grid,
                                    columnId: serverColumnCfg.urlName,
                                    sortable: column.sortable
                                });
                                column.headerComponent = this.grid.Static.Classes.Columns.SortHeader;
                                column.headerComponentParams = headerComponentParams;
                                return this;
                            };
                            Manager.prototype.initColumnFiltering = function (column, serverColumnCfg) {
                                var e_3, _a, e_4, _b;
                                column.filter = (this.filteringEnabled &&
                                    serverColumnCfg.filter !== AgGrids.Enums.FilteringMode.DISABLED &&
                                    serverColumnCfg.filter !== false);
                                if (!column.filter)
                                    return this;
                                var filtering = this.grid.GetFiltering(), filteringItem = filtering.has(serverColumnCfg.urlName)
                                    ? filtering.get(serverColumnCfg.urlName)
                                    : null;
                                column.floatingFilterComponent = this.grid.Static.Classes.Columns.FilterHeader;
                                var floatingFilterComponentParams = __assign(__assign({}, this.filterHeaderDefaults), {
                                    grid: this.grid,
                                    columnId: serverColumnCfg.urlName,
                                    filteringItem: filteringItem
                                });
                                column.floatingFilterComponentParams = floatingFilterComponentParams;
                                var serverType = serverColumnCfg.types[serverColumnCfg.types.length - 1];
                                column.filter = Columns.FilterOperatorsCfg.GetServerTypesExtendedFilterMenu(this.grid, serverType);
                                var allControlTypes = AgGrids.Columns.FilterOperatorsCfg.FILTERING_CONTROL_TYPES, columnControlTypes = AgGrids.Enums.FilterControlType.UNKNOWN, columnFiltering = Number(serverColumnCfg.filter);
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
                            Manager.prototype.initColumnStyles = function (column, serverColumnCfg) {
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
                            return Manager;
                        }());
                        Columns.Manager = Manager;
                    })(Columns = AgGrids.Columns || (AgGrids.Columns = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Manager.js.map