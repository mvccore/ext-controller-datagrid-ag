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
                    var EventsManager = /** @class */ (function () {
                        function EventsManager(grid) {
                            var e_1, _a, e_2, _b;
                            this.grid = grid;
                            var serverConfig = grid.GetServerConfig();
                            this.multiSorting = ((serverConfig.sortingMode & AgGrids.Enums.SortingMode.SORT_MULTIPLE_COLUMNS) != 0);
                            this.multiFiltering = ((serverConfig.filteringMode & AgGrids.Enums.FilteringMode.MULTIPLE_COLUMNS) != 0);
                            this.helpers = grid.GetHelpers();
                            this.defaultAllowedOperators = this.helpers.GetAllowedOperators(serverConfig.filteringMode);
                            this.columnsAllowedOperators = new Map();
                            var columnConfig, columnFilterCfg;
                            try {
                                for (var _c = __values(Object.keys(serverConfig.columns)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var columnId = _d.value;
                                    columnConfig = serverConfig.columns[columnId];
                                    columnFilterCfg = columnConfig.filter;
                                    if (typeof (columnFilterCfg) === 'number' && columnFilterCfg !== 0)
                                        this.columnsAllowedOperators.set(columnId, this.helpers.GetAllowedOperators(columnFilterCfg));
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                            var likeOperatorsArrFilter = new Set([AgGrids.Enums.Operator.LIKE, AgGrids.Enums.Operator.NOT_LIKE]);
                            this.likeOperatorsAndPrefixes = new Map();
                            this.notLikeOperatorsAndPrefixes = new Map();
                            try {
                                for (var _e = __values(serverConfig.filterOperatorPrefixes.entries()), _f = _e.next(); !_f.done; _f = _e.next()) {
                                    var _g = __read(_f.value, 2), operator = _g[0], prefix = _g[1];
                                    if (likeOperatorsArrFilter.has(operator)) {
                                        this.likeOperatorsAndPrefixes.set(operator, prefix);
                                    }
                                    else {
                                        this.notLikeOperatorsAndPrefixes.set(operator, prefix);
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                        EventsManager.prototype.HandleColumnResized = function (event) {
                            //console.log(event);
                        };
                        EventsManager.prototype.HandleColumnMoved = function (event) {
                            //console.log(event);
                        };
                        EventsManager.prototype.HandleInputFilterChange = function (columnId, rawInputValue) {
                            var e_3, _a, _b;
                            var rawInputIsNull = rawInputValue == null, rawInputValue = rawInputIsNull ? '' : rawInputValue.trim(), filterRemoving = rawInputValue === '', serverConfig = this.grid.GetServerConfig(), valuesDelimiter = serverConfig.urlSegments.urlDelimiterValues, rawValues = filterRemoving ? [] : rawInputValue.split(valuesDelimiter), serverColumnCfg = serverConfig.columns[columnId], columnFilterCfg = serverColumnCfg.filter, columnFilterCfgInt = Number(columnFilterCfg), columnFilterCfgIsInt = columnFilterCfg === columnFilterCfgInt, allowedOperators = (columnFilterCfgIsInt && this.columnsAllowedOperators.has(columnId)
                                ? this.columnsAllowedOperators.get(columnId)
                                : this.defaultAllowedOperators), columnAllowNullFilter = columnFilterCfgIsInt && ((columnFilterCfgInt & AgGrids.Enums.FilteringMode.ALLOW_NULL) != 0), filterValues, filterOperatorValues, operatorsAndPrefixes, filtering = this.grid.GetFiltering(), valueIsStringNull, operator, operatorCfg;
                            if (!filterRemoving) {
                                filterValues = new Map();
                                try {
                                    for (var rawValues_1 = __values(rawValues), rawValues_1_1 = rawValues_1.next(); !rawValues_1_1.done; rawValues_1_1 = rawValues_1.next()) {
                                        var rawValue = rawValues_1_1.value;
                                        valueIsStringNull = rawValue.toLowerCase() === 'null';
                                        // complete possible operator prefixes from submitted value
                                        operatorsAndPrefixes = this.getOperatorsAndPrefixesByRawValue(rawValue);
                                        // complete operator value from submitted value
                                        _b = __read(this.getOperatorByRawValue(rawValue, operatorsAndPrefixes, columnFilterCfg), 2), rawValue = _b[0], operator = _b[1];
                                        // check if operator is allowed
                                        if (operator == null || !allowedOperators.has(operator))
                                            continue;
                                        // check if operator configuration allowes submitted value form
                                        operatorCfg = allowedOperators.get(operator);
                                        if (operatorCfg.regex != null && !rawValue.match(operatorCfg.regex))
                                            continue;
                                        if (valueIsStringNull) {
                                            if (columnAllowNullFilter) {
                                                rawValue = 'null';
                                            }
                                            else {
                                                continue;
                                            }
                                        }
                                        // set up filtering value
                                        if (filterValues.has(operator)) {
                                            filterValues.get(operator).push(rawValue);
                                        }
                                        else {
                                            filterValues.set(operator, [rawValue]);
                                        }
                                        filterOperatorValues = filterValues.get(operator);
                                        if (!operatorCfg.multiple && filterOperatorValues.length > 1)
                                            filterValues.set(operator, [filterOperatorValues[0]]);
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (rawValues_1_1 && !rawValues_1_1.done && (_a = rawValues_1.return)) _a.call(rawValues_1);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                                if (filterValues.size === 0) {
                                    filterRemoving = true;
                                }
                                else {
                                    if (!this.multiFiltering)
                                        filtering = new Map();
                                    filtering.set(columnId, filterValues);
                                }
                            }
                            var filterHeader = this.grid.GetFilterHeaders().get(columnId);
                            if (filterRemoving) {
                                filtering.delete(columnId);
                                filterHeader.SetText(null);
                            }
                            else {
                                filterHeader.SetText(filtering.get(columnId));
                            }
                            this.grid
                                .SetFiltering(filtering)
                                .SetTotalCount(null);
                            var pageMode = this.grid.GetPageMode();
                            if ((pageMode & AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_SINGLE) != 0) {
                                var gridOptions = this.grid.GetOptions().GetAgOptions();
                                gridOptions.api.onFilterChanged();
                            }
                            else if ((pageMode & AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_MULTI) != 0) {
                                var dataSourceMp = this.grid.GetDataSource();
                                dataSourceMp.Load();
                            }
                        };
                        EventsManager.prototype.HandleSortChange = function (columnId, direction) {
                            var e_4, _a;
                            var sortRemoving = direction == null, sortHeaders = this.grid.GetSortHeaders(), newSorting = [], 
                            //agColumnsState: agGrid.ColumnState[] = [],
                            oldSorting = [];
                            if (sortRemoving) {
                                oldSorting = this.grid.GetSorting();
                            }
                            else {
                                if (this.multiSorting)
                                    oldSorting = this.grid.GetSorting();
                                newSorting.push([columnId, direction]);
                            }
                            try {
                                for (var oldSorting_1 = __values(oldSorting), oldSorting_1_1 = oldSorting_1.next(); !oldSorting_1_1.done; oldSorting_1_1 = oldSorting_1.next()) {
                                    var _b = __read(oldSorting_1_1.value, 2), sortColId = _b[0], sortDir = _b[1];
                                    if (sortColId === columnId)
                                        continue;
                                    newSorting.push([sortColId, sortDir]);
                                }
                            }
                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                            finally {
                                try {
                                    if (oldSorting_1_1 && !oldSorting_1_1.done && (_a = oldSorting_1.return)) _a.call(oldSorting_1);
                                }
                                finally { if (e_4) throw e_4.error; }
                            }
                            for (var i = 0, sortColId = '', l = newSorting.length; i < l; i++) {
                                var _c = __read(newSorting[i], 2), sortColId = _c[0], sortDir = _c[1];
                                /*agColumnsState.push(<agGrid.ColumnState>{
                                    colId: sortColId,
                                    sort: sortDir === 1 ? 'asc' : 'desc',
                                    sortIndex: i
                                });*/
                                if (sortColId === columnId)
                                    continue;
                                sortHeaders.get(sortColId).SetSequence(i);
                            }
                            this.grid.SetSorting(newSorting);
                            var pageMode = this.grid.GetPageMode();
                            if ((pageMode & AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_SINGLE) != 0) {
                                var gridOptions = this.grid.GetOptions().GetAgOptions();
                                /*gridOptions.columnApi.applyColumnState(<agGrid.ApplyColumnStateParams>{
                                    state: agColumnsState,
                                    applyOrder: false,
                                    defaultState: <agGrid.ColumnStateParams>{
                                        sort: null
                                    },
                                });*/
                                gridOptions.api.onSortChanged();
                            }
                            else if ((pageMode & AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_MULTI) != 0) {
                                var dataSourceMp = this.grid.GetDataSource();
                                dataSourceMp.Load();
                            }
                        };
                        EventsManager.prototype.HandleGridSizeChanged = function (event) {
                            // get the current grids width
                            var gridElm = this.grid.GetOptions().GetElements().agGridElement, gridElmParent = gridElm.parentNode;
                            var gridWidth = gridElmParent.offsetWidth;
                            // keep track of which columns to hide/show
                            var columnsToShow = [], columnsToHide = [];
                            // iterate over all columns (visible or not) and work out
                            // now many columns can fit (based on their minWidth)
                            var totalColsWidth = 0;
                            var allColumns = event.columnApi.getColumns();
                            if (allColumns && allColumns.length > 0) {
                                for (var i = 0; i < allColumns.length; i++) {
                                    var column = allColumns[i];
                                    totalColsWidth += column.getMinWidth() || 0;
                                    if (totalColsWidth > gridWidth) {
                                        columnsToHide.push(column.getColId());
                                    }
                                    else {
                                        columnsToShow.push(column.getColId());
                                    }
                                }
                            }
                            // show/hide columns based on current grid width
                            event.columnApi.setColumnsVisible(columnsToShow, true);
                            event.columnApi.setColumnsVisible(columnsToHide, false);
                            // fill out any available space to ensure there are no gaps
                            event.api.sizeColumnsToFit();
                        };
                        EventsManager.prototype.AddUrlChangeEvent = function () {
                            var _this = this;
                            window.addEventListener('popstate', function (e) {
                                if (_this.grid.GetHelpers().IsInstanceOfIServerRequestRaw(e.state))
                                    _this.HandleUrlChange(e);
                            });
                            return this;
                        };
                        EventsManager.prototype.HandleUrlChange = function (e) {
                            var dataSource = this.grid.GetDataSource(), reqDataRaw = e.state, reqData = AgGrids.DataSource.RetypeRequestObjects2Maps(reqDataRaw);
                            this.grid
                                .SetSorting(reqData.sorting)
                                .SetFiltering(reqData.filtering);
                            this.handleUrlChangeSortsFilters(reqData);
                            dataSource.ExecRequest(reqDataRaw, false);
                        };
                        EventsManager.prototype.handleUrlChangeSortsFilters = function (reqData) {
                            var e_5, _a, e_6, _b, e_7, _c;
                            // set up sort headers:
                            var sortHeaders = this.grid.GetSortHeaders(), activeSortItems = new Map(), sequence = 0;
                            try {
                                for (var _d = __values(reqData.sorting), _e = _d.next(); !_e.done; _e = _d.next()) {
                                    var _f = __read(_e.value, 2), columnId = _f[0], sortDir = _f[1];
                                    activeSortItems.set(columnId, [sortDir, sequence++]);
                                }
                            }
                            catch (e_5_1) { e_5 = { error: e_5_1 }; }
                            finally {
                                try {
                                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                                }
                                finally { if (e_5) throw e_5.error; }
                            }
                            try {
                                for (var _g = __values(sortHeaders.entries()), _h = _g.next(); !_h.done; _h = _g.next()) {
                                    var _j = __read(_h.value, 2), columnId = _j[0], sortHeader = _j[1];
                                    if (activeSortItems.has(columnId)) {
                                        var _k = __read(activeSortItems.get(columnId), 2), sortDir = _k[0], sequence = _k[1];
                                        sortHeader.SetDirection(sortDir).SetSequence(sequence);
                                    }
                                    else {
                                        sortHeader.SetDirection(null).SetSequence(null);
                                    }
                                }
                            }
                            catch (e_6_1) { e_6 = { error: e_6_1 }; }
                            finally {
                                try {
                                    if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                                }
                                finally { if (e_6) throw e_6.error; }
                            }
                            // set up filtering inputs:
                            var filterInputs = this.grid.GetFilterHeaders();
                            try {
                                for (var _l = __values(filterInputs.entries()), _m = _l.next(); !_m.done; _m = _l.next()) {
                                    var _o = __read(_m.value, 2), columnId = _o[0], filterInput = _o[1];
                                    if (reqData.filtering.has(columnId)) {
                                        filterInput.SetText(reqData.filtering.get(columnId));
                                    }
                                    else {
                                        filterInput.SetText(null);
                                    }
                                }
                            }
                            catch (e_7_1) { e_7 = { error: e_7_1 }; }
                            finally {
                                try {
                                    if (_m && !_m.done && (_c = _l.return)) _c.call(_l);
                                }
                                finally { if (e_7) throw e_7.error; }
                            }
                            return this;
                        };
                        EventsManager.prototype.getOperatorsAndPrefixesByRawValue = function (rawValue) {
                            var operatorsAndPrefixes, containsPercentage = this.helpers.CheckFilterValueForLikeChar(rawValue, '%'), containsUnderScore = this.helpers.CheckFilterValueForLikeChar(rawValue, '_');
                            if (containsPercentage || containsUnderScore) {
                                if ((containsPercentage & 1) !== 0 || (containsUnderScore & 1) !== 0) {
                                    operatorsAndPrefixes = this.likeOperatorsAndPrefixes;
                                }
                                else {
                                    operatorsAndPrefixes = this.notLikeOperatorsAndPrefixes;
                                }
                            }
                            else {
                                operatorsAndPrefixes = this.notLikeOperatorsAndPrefixes;
                            }
                            return operatorsAndPrefixes;
                        };
                        EventsManager.prototype.getOperatorByRawValue = function (rawValue, operatorsAndPrefixes, columnFilterCfg) {
                            var e_8, _a;
                            var operator = null, columnFilterCfgInt = Number(columnFilterCfg), columnFilterCfgIsInt = columnFilterCfg === columnFilterCfgInt, columnFilterCfgIsBool = !columnFilterCfgIsInt;
                            try {
                                for (var _b = __values(operatorsAndPrefixes.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var _d = __read(_c.value, 2), operatorKey = _d[0], valuePrefix = _d[1];
                                    var valuePrefixLen = valuePrefix.length;
                                    if (valuePrefixLen > 0) {
                                        var valuePrefixChars = rawValue.substring(0, valuePrefixLen);
                                        if (valuePrefixChars === valuePrefix) {
                                            operator = operatorKey;
                                            rawValue = rawValue.substring(valuePrefixLen);
                                            break;
                                        }
                                    }
                                    else {
                                        if ((columnFilterCfgIsBool && columnFilterCfg) ||
                                            (columnFilterCfgIsInt && columnFilterCfgInt & AgGrids.Enums.FilteringMode.ALLOW_EQUALS) != 0) {
                                            operator = operatorKey;
                                        }
                                        else if ((columnFilterCfgInt & AgGrids.Enums.FilteringMode.ALLOW_LIKE_ANYWHERE) != 0 ||
                                            (columnFilterCfgInt & AgGrids.Enums.FilteringMode.ALLOW_LIKE_RIGHT_SIDE) != 0 ||
                                            (columnFilterCfgInt & AgGrids.Enums.FilteringMode.ALLOW_LIKE_LEFT_SIDE) != 0) {
                                            operator = AgGrids.Enums.Operator.LIKE;
                                        }
                                        break;
                                    }
                                }
                            }
                            catch (e_8_1) { e_8 = { error: e_8_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_8) throw e_8.error; }
                            }
                            return [rawValue, operator];
                        };
                        return EventsManager;
                    }());
                    AgGrids.EventsManager = EventsManager;
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=EventsManager.js.map