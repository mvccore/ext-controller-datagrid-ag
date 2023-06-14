var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
                    var EventsManager = /** @class */ (function (_super) {
                        __extends(EventsManager, _super);
                        function EventsManager(grid, serverConfig) {
                            var e_1, _a, e_2, _b;
                            if (serverConfig === void 0) { serverConfig = null; }
                            var _this = _super.call(this, grid, serverConfig = grid.GetServerConfig()) || this;
                            _this.automaticSelectionChange = false;
                            _this.internalColumnMove = false;
                            _this.gridWidth = null;
                            _this.gridHeight = null;
                            _this.multiSorting = ((serverConfig.sortingMode & AgGrids.Enums.SortingMode.SORT_MULTIPLE_COLUMNS) != 0);
                            _this.multiFiltering = ((serverConfig.filteringMode & AgGrids.Enums.FilteringMode.MULTIPLE_COLUMNS) != 0);
                            _this.helpers = grid.GetHelpers();
                            _this.defaultAllowedOperators = _this.helpers.GetAllowedOperators(serverConfig.filteringMode);
                            _this.columnsAllowedOperators = new Map();
                            var columnConfig, columnFilterCfg;
                            try {
                                for (var _c = __values(Object.keys(serverConfig.columns)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var columnId = _d.value;
                                    columnConfig = serverConfig.columns[columnId];
                                    columnFilterCfg = columnConfig.filter;
                                    if (typeof (columnFilterCfg) === 'number' && columnFilterCfg !== 0)
                                        _this.columnsAllowedOperators.set(columnId, _this.helpers.GetAllowedOperators(columnFilterCfg));
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
                            _this.likeOperatorsAndPrefixes = new Map();
                            _this.notLikeOperatorsAndPrefixes = new Map();
                            try {
                                for (var _e = __values(serverConfig.filterOperatorPrefixes.entries()), _f = _e.next(); !_f.done; _f = _e.next()) {
                                    var _g = __read(_f.value, 2), operator = _g[0], prefix = _g[1];
                                    if (likeOperatorsArrFilter.has(operator)) {
                                        _this.likeOperatorsAndPrefixes.set(operator, prefix);
                                    }
                                    else {
                                        _this.notLikeOperatorsAndPrefixes.set(operator, prefix);
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
                            _this.handlers = new Map();
                            _this.columnsChanges = new Map();
                            _this.columnsChangesSending = false;
                            return _this;
                        }
                        EventsManager.prototype.HandleBodyScroll = function (event) {
                            this.FireHandlers("bodyScroll", new AgGrids.EventsManagers.Events.GridBodyScroll(event.left, event.top, event.direction, event));
                        };
                        EventsManager.prototype.HandleModelUpdated = function (event) {
                            //console.log("onModelUpdated", this.onLoadSelectionIndex)
                            if (this.onLoadSelectionIndex != null) {
                                var nextIndex = this.onLoadSelectionIndex, nextRow = event.api.getDisplayedRowAtIndex(nextIndex);
                                this.grid.SetSelectedRowNodes([nextRow], null);
                                if (nextRow.data == null) {
                                    //console.log("onModelUpdated1", nextIndex, nextRow.data);
                                }
                                else {
                                    //console.log("onModelUpdated2", nextIndex, nextRow.data);
                                    this.automaticSelectionChange = true;
                                    nextRow.setSelected(true);
                                    if (this.onLoadSelectionCallback) {
                                        this.onLoadSelectionCallback();
                                        this.onLoadSelectionCallback = null;
                                    }
                                    this.onLoadSelectionIndex = null;
                                }
                            }
                            this.FireHandlers('modelUpdate', new AgGrids.EventsManagers.Events.ModelUpdate(event.newData, event.newPage, event.animate, event.keepRenderedRows, event.keepUndoRedoStack, event));
                        };
                        EventsManager.prototype.SelectRowByIndex = function (rowIndex, onLoadSelectionCallback) {
                            if (onLoadSelectionCallback === void 0) { onLoadSelectionCallback = null; }
                            var gridApi = this.grid.GetGridApi();
                            if (this.autoSelectFirstRow) {
                                var row = gridApi.getDisplayedRowAtIndex(rowIndex);
                                if (row != null) {
                                    this.grid.SetSelectedRowNodes([row], null);
                                    if (row.data == null) {
                                        this.SetOnLoadSelectionIndex(rowIndex, onLoadSelectionCallback);
                                    }
                                    else {
                                        this.automaticSelectionChange = true;
                                        row.setSelected(true);
                                    }
                                }
                                else {
                                    var selectedRowNodesBefore = this.grid.GetSelectedRowNodes();
                                    if (selectedRowNodesBefore.length > 0) {
                                        this.grid.SetSelectedRowNodes([], null);
                                        this.FireHandlers("selectionChange", new AgGrids.EventsManagers.Events.SelectionChange(false, selectedRowNodesBefore, []));
                                    }
                                }
                            }
                            else {
                                var selectedRowNodesBefore = this.grid.GetSelectedRowNodes();
                                if (selectedRowNodesBefore.length > 0) {
                                    this.grid.SetSelectedRowNodes([], null);
                                    this.FireHandlers("selectionChange", new AgGrids.EventsManagers.Events.SelectionChange(false, selectedRowNodesBefore, []));
                                }
                            }
                            return this;
                        };
                        EventsManager.prototype.HandleGridReady = function (event) {
                            this.FireHandlers("gridReady", new AgGrids.EventsManagers.Events.Base());
                        };
                        EventsManager.prototype.HandleSelectionChange = function (event) {
                            if (this.grid.GetInternalSelectionChange())
                                return;
                            var userChange = !this.automaticSelectionChange;
                            this.automaticSelectionChange = false;
                            var gridApi = this.grid.GetGridApi(), selectedRowsBefore = this.grid.GetSelectedRowNodes(), selectedRowsAfter = gridApi.getSelectedNodes(), selectionchangeEvent = new AgGrids.EventsManagers.Events.SelectionChange(userChange, selectedRowsBefore, selectedRowsAfter);
                            var continueToNextEvent = this.FireHandlers("beforeSelectionChange", selectionchangeEvent);
                            if (continueToNextEvent) {
                                this.grid.SetSelectedRowNodes(selectedRowsAfter, null);
                                this.FireHandlers("selectionChange", selectionchangeEvent);
                            }
                            else {
                                this.grid.SetSelectedRowNodes(selectedRowsBefore, false);
                            }
                        };
                        EventsManager.prototype.HandleColumnResized = function (event) {
                            if (event.source !== 'uiColumnDragged' || !event.finished)
                                return;
                            var columnId = event.column.getColId(), newWidth = event.column.getActualWidth(), resizeEvent = new AgGrids.EventsManagers.Events.ColumnResize(columnId, newWidth, event);
                            var continueToNextEvent = this.FireHandlers("beforeColumnResize", resizeEvent);
                            if (continueToNextEvent === false) {
                                event.column.setActualWidth(this.columnsActualWidths.get(columnId), "uiColumnResized", false);
                                event.api.sizeColumnsToFit();
                                return;
                            }
                            this.columnsActualWidths.set(columnId, newWidth);
                            if (this.columnsChangesTimeout)
                                clearTimeout(this.columnsChangesTimeout);
                            newWidth = resizeEvent.GetNewWidth();
                            if (this.columnsChanges.has(columnId)) {
                                this.columnsChanges.get(columnId).width = newWidth;
                            }
                            else {
                                this.columnsChanges.set(columnId, {
                                    width: newWidth
                                });
                            }
                            this.columnsChangesTimeout = setTimeout(this.handleColumnChangesSent.bind(this), this.Static.COLUMN_CHANGES_TIMEOUT);
                            this.FireHandlers("columnResize", resizeEvent);
                        };
                        EventsManager.prototype.HandleColumnMoved = function (event) {
                            if (this.internalColumnMove) {
                                this.internalColumnMove = false;
                                return;
                            }
                            var columnId = event.column.getColId(), columnConfig = this.grid.GetServerConfig().columns[columnId], moveEvent = new AgGrids.EventsManagers.Events.ColumnMove(columnId, event.toIndex, event);
                            var continueToNextEvent = this.FireHandlers("beforeColumnMove", moveEvent);
                            if (continueToNextEvent === false) {
                                this.internalColumnMove = true;
                                event.columnApi.moveColumnByIndex(event.toIndex, columnConfig.columnIndexActive);
                                return;
                            }
                            if (this.columnsChangesTimeout)
                                clearTimeout(this.columnsChangesTimeout);
                            var columnsManager = this.grid.GetOptionsManager().GetColumnManager(), activeColumnsSorted = columnsManager.GetServerColumnsSortedActive(), allColumnsSorted = columnsManager.GetServerColumnsUserSortedAll(), activeIndexOld = columnConfig.columnIndexActive, activeIndexNext = moveEvent.GetToIndex(), allIndexOld = columnConfig.columnIndexUser, allIndexNew = 0;
                            if (activeIndexNext < activeIndexOld) {
                                allIndexNew = allIndexOld - 1;
                            }
                            else {
                                allIndexNew = allIndexOld + 1;
                            }
                            var _a = __read(allColumnsSorted.splice(allIndexOld, 1), 1), allColumnCfg = _a[0];
                            allColumnsSorted.splice(allIndexNew, 0, allColumnCfg);
                            var _b = __read(activeColumnsSorted.splice(activeIndexOld, 1), 1), activeColumnCfg = _b[0];
                            activeColumnsSorted.splice(activeIndexNext, 0, activeColumnCfg);
                            for (var i = 0, l = allColumnsSorted.length; i < l; i++) {
                                columnConfig = allColumnsSorted[i];
                                columnConfig.columnIndexUser = i;
                                columnId = columnConfig.urlName;
                                if (this.columnsChanges.has(columnId)) {
                                    this.columnsChanges.get(columnId).index = i;
                                }
                                else {
                                    this.columnsChanges.set(columnId, {
                                        index: i
                                    });
                                }
                            }
                            for (var i = 0, l = activeColumnsSorted.length; i < l; i++)
                                activeColumnsSorted[i].columnIndexActive = i;
                            columnsManager.SetServerColumnsSortedActive(activeColumnsSorted);
                            columnsManager.SetServerColumnsSortedAll(allColumnsSorted);
                            this.grid.GetColumnsVisibilityMenu().RedrawControls();
                            this.columnsChangesTimeout = setTimeout(this.handleColumnChangesSent.bind(this), this.Static.COLUMN_CHANGES_TIMEOUT);
                            this.FireHandlers("columnMove", moveEvent);
                        };
                        EventsManager.prototype.GetNewFilteringByMenu = function (columnId, filteringItem, clearAllOther) {
                            if (clearAllOther === void 0) { clearAllOther = false; }
                            var filteringBefore = this.grid.GetFiltering(), filteringAfter = this.helpers.CloneFiltering(filteringBefore), filterRemoving = filteringItem == null || filteringItem.size === 0;
                            if (filterRemoving) {
                                if (clearAllOther) {
                                    filteringAfter = new Map();
                                }
                                else {
                                    filteringAfter.delete(columnId);
                                }
                            }
                            else {
                                if (!this.multiFiltering || clearAllOther)
                                    filteringAfter = new Map();
                                filteringAfter.set(columnId, filteringItem);
                            }
                            return [filterRemoving, filteringAfter];
                        };
                        EventsManager.prototype.HandleFilterMenuChange = function (columnId, filterRemoving, filteringBefore, filteringAfter) {
                            var filterHeader = this.grid.GetFilterHeaders().get(columnId), filterMenu = this.grid.GetFilterMenus().get(columnId);
                            if (filterRemoving) {
                                filterHeader === null || filterHeader === void 0 ? void 0 : filterHeader.SetText(null);
                                filterMenu === null || filterMenu === void 0 ? void 0 : filterMenu.SetUpControls(null);
                            }
                            else {
                                var filteringItem = filteringAfter.get(columnId);
                                filterHeader === null || filterHeader === void 0 ? void 0 : filterHeader.SetText(filteringItem);
                                filterMenu === null || filterMenu === void 0 ? void 0 : filterMenu.SetUpControls(filteringItem);
                            }
                            this.firefiltering(filteringBefore, filteringAfter);
                        };
                        EventsManager.prototype.GetNewFilteringByHeader = function (columnId, rawInputValue, clearAllOther) {
                            var e_3, _a, _b;
                            if (clearAllOther === void 0) { clearAllOther = false; }
                            var rawInputIsNull = rawInputValue == null, rawInputValue = rawInputIsNull ? '' : rawInputValue.trim(), filterRemoving = rawInputValue === '', serverConfig = this.grid.GetServerConfig(), valuesDelimiter = serverConfig.urlSegments.urlDelimiterValues, rawValues = filterRemoving ? [] : rawInputValue.split(valuesDelimiter), serverColumnCfg = serverConfig.columns[columnId], columnFilterCfg = serverColumnCfg.filter, columnFilterCfgInt = Number(columnFilterCfg), columnFilterCfgIsInt = columnFilterCfg === columnFilterCfgInt, allowedOperators = (columnFilterCfgIsInt && this.columnsAllowedOperators.has(columnId)
                                ? this.columnsAllowedOperators.get(columnId)
                                : this.defaultAllowedOperators), columnAllowNullFilter = columnFilterCfgIsInt && ((columnFilterCfgInt & AgGrids.Enums.FilteringMode.ALLOW_NULL) != 0), filterValues, filterOperatorValues, operatorsAndPrefixes, filteringBefore = this.grid.GetFiltering(), filteringAfter = this.helpers.CloneFiltering(filteringBefore), valueIsStringNull, operator, operatorCfg;
                            if (!filterRemoving) {
                                filterValues = new Map();
                                try {
                                    for (var rawValues_1 = __values(rawValues), rawValues_1_1 = rawValues_1.next(); !rawValues_1_1.done; rawValues_1_1 = rawValues_1.next()) {
                                        var rawValue = rawValues_1_1.value;
                                        valueIsStringNull = rawValue.toLowerCase() === 'null';
                                        // complete possible operator prefixes from submitted value
                                        operatorsAndPrefixes = this.getOperatorsAndPrefixesByRawValue(rawValue);
                                        // complete operator value from submitted value
                                        _b = __read(this.Static.getOperatorByRawValue(rawValue, operatorsAndPrefixes, columnFilterCfg), 2), rawValue = _b[0], operator = _b[1];
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
                                    if (!this.multiFiltering || clearAllOther)
                                        filteringAfter = new Map();
                                    filteringAfter.set(columnId, filterValues);
                                }
                            }
                            if (filterRemoving) {
                                if (clearAllOther) {
                                    filteringAfter = new Map();
                                }
                                else {
                                    filteringAfter.delete(columnId);
                                }
                            }
                            return [filterRemoving, filteringAfter];
                        };
                        EventsManager.prototype.HandleFilterHeaderChange = function (columnId, filterRemoving, filteringBefore, filteringAfter) {
                            var filterHeader = this.grid.GetFilterHeaders().get(columnId), filterMenu = this.grid.GetFilterMenus().get(columnId), filteringItem;
                            if (filterRemoving) {
                                filterHeader === null || filterHeader === void 0 ? void 0 : filterHeader.SetText(null);
                                filterMenu === null || filterMenu === void 0 ? void 0 : filterMenu.SetUpControls(null);
                            }
                            else {
                                filteringItem = filteringAfter.get(columnId);
                                filterHeader === null || filterHeader === void 0 ? void 0 : filterHeader.SetText(filteringItem);
                                filterMenu === null || filterMenu === void 0 ? void 0 : filterMenu.SetUpControls(filteringItem);
                            }
                            this.firefiltering(filteringBefore, filteringAfter);
                        };
                        EventsManager.prototype.GetNewSorting = function (columnId, direction) {
                            var e_4, _a;
                            var sortRemoving = direction == null, newSorting = [], oldSorting = [];
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
                            return newSorting;
                        };
                        EventsManager.prototype.HandleSortChange = function (sortingBefore, sortingAfter) {
                            var sortHeaders = this.grid.GetSortHeaders(), columnId;
                            for (var i = 0, sortColId = '', l = sortingAfter.length; i < l; i++) {
                                var _a = __read(sortingAfter[i], 1), sortColId = _a[0];
                                if (sortColId === columnId)
                                    continue;
                                sortHeaders.get(sortColId).SetSequence(i);
                            }
                            this.grid.SetSorting(sortingAfter);
                            var pageMode = this.grid.GetPageMode();
                            if ((pageMode & AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_SINGLE) != 0) {
                                var gridOptionsManager = this.grid.GetOptionsManager().GetAgOptions();
                                gridOptionsManager.api.onSortChanged();
                            }
                            else if ((pageMode & AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_MULTI) != 0) {
                                var dataSourceMp = this.grid.GetDataSource();
                                dataSourceMp.Load();
                            }
                            this.FireHandlers("sortChange", new AgGrids.EventsManagers.Events.SortChange(sortingBefore, sortingAfter));
                        };
                        EventsManager.prototype.HandleGridSizeChanged = function (viewPort, event) {
                            // get the current grids width
                            var gridElm = this.grid.GetOptionsManager().GetElements().agGridElement, gridElmParent = gridElm.parentNode, gridWidth = gridElmParent.offsetWidth, gridHeight = gridElmParent.offsetHeight, gridSizeChange = this.gridWidth !== gridWidth || this.gridHeight !== gridHeight;
                            /*if (this.gridWidth == null && this.gridHeight == null) {
                                this.gridWidth = gridWidth;
                                this.gridHeight = gridHeight;
                                return;
                            }*/
                            if (!gridSizeChange)
                                return;
                            this.gridWidth = gridWidth;
                            this.gridHeight = gridHeight;
                            // keep track of which columns to hide/show
                            var columnsToShow = [], columnsToHide = [], totalColsWidth = 0, allColumns = event.columnApi.getColumns(), column, columnId;
                            // iterate over all columns (visible or not) and work out
                            // now many columns can fit (based on their minWidth)
                            this.columnsActualWidths = new Map();
                            if (allColumns && allColumns.length > 0) {
                                for (var i = 0; i < allColumns.length; i++) {
                                    column = allColumns[i];
                                    columnId = column.getColId();
                                    this.columnsActualWidths.set(columnId, column.getActualWidth());
                                    totalColsWidth += column.getMinWidth() || 0;
                                    if (totalColsWidth > this.gridWidth) {
                                        columnsToHide.push(columnId);
                                    }
                                    else {
                                        columnsToShow.push(columnId);
                                    }
                                }
                            }
                            // show/hide columns based on current grid width
                            event.columnApi.setColumnsVisible(columnsToShow, true);
                            event.columnApi.setColumnsVisible(columnsToHide, false);
                            // fill out any available space to ensure there are no gaps
                            event.api.sizeColumnsToFit();
                            this.grid.GetColumnsVisibilityMenu().ResizeControls();
                            this.FireHandlers("gridSizeChange", new AgGrids.EventsManagers.Events.GridSizeChange(gridWidth, gridHeight, event));
                        };
                        EventsManager.prototype.AddUrlChangeEvent = function () {
                            var _this = this;
                            window.addEventListener('popstate', function (e) {
                                if (_this.grid.GetHelpers().IsInstanceOfIServerRequestRaw(e.state))
                                    _this.HandleUrlChange(e);
                            }, true);
                            return this;
                        };
                        EventsManager.prototype.HandleExecChange = function (offset, sorting, filtering) {
                            if (offset === void 0) { offset = 0; }
                            var dataSource = this.grid.GetDataSource(), sortingBefore = this.grid.GetSorting(), sortingAfter, filteringBefore = this.grid.GetFiltering(), filteringAfter;
                            if (sorting === false) {
                                sortingAfter = [];
                            }
                            else if (sorting == null) {
                                sortingAfter = [].slice.apply(sortingBefore);
                            }
                            else {
                                sortingAfter = sorting;
                            }
                            if (filtering === false) {
                                filteringAfter = new Map();
                            }
                            else if (filtering == null) {
                                filteringAfter = this.helpers.CloneFiltering(filteringBefore);
                            }
                            else {
                                filteringAfter = filtering;
                            }
                            var reqData = {
                                offset: offset,
                                limit: this.grid.GetLimit(),
                                sorting: sortingAfter,
                                filtering: filteringAfter,
                            }, reqDataRaw = this.helpers.RetypeRequestMaps2Objects(reqData), offsetBefore = this.grid.GetOffset(), oldFilteringStr = JSON.stringify(this.helpers.RetypeFilteringMap2Obj(filteringBefore)), oldSortingStr = JSON.stringify(sortingBefore), newFilteringStr = JSON.stringify(reqDataRaw.filtering), newSortingStr = JSON.stringify(sortingAfter), offsetChange = offsetBefore !== offset, filteringChange = oldFilteringStr !== newFilteringStr, sortingChange = oldSortingStr !== newSortingStr;
                            if (offsetChange) {
                                var pagingAnchorsMaps = this.grid.GetOptionsManager().GetElements().pagingAnchorsMaps;
                                var offsetPagingAnchor = pagingAnchorsMaps.has(offset)
                                    ? pagingAnchorsMaps.get(offset)[0]
                                    : null;
                                var continueToNextEvents = this.FireHandlers("beforePageChange", new AgGrids.EventsManagers.Events.PageChange(offsetBefore, offset, offsetPagingAnchor));
                                if (continueToNextEvents === false)
                                    return;
                            }
                            if (filteringChange) {
                                var continueToNextEvents = this.FireHandlers("beforeFilterChange", new AgGrids.EventsManagers.Events.FilterChange(filteringBefore, filteringAfter));
                                if (continueToNextEvents === false)
                                    return;
                            }
                            if (sortingChange) {
                                var continueToNextEvents = this.FireHandlers("beforeSortChange", new AgGrids.EventsManagers.Events.SortChange(sortingBefore, sortingAfter));
                                if (continueToNextEvents === false)
                                    return;
                            }
                            this.grid
                                .SetOffset(offset)
                                .SetSorting(sortingAfter)
                                .SetFiltering(filteringAfter);
                            this.handleUrlChangeSortsFilters(reqData);
                            dataSource.ExecRequest(reqDataRaw, true);
                            if (offsetChange)
                                this.FireHandlers("pageChange", new AgGrids.EventsManagers.Events.PageChange(offsetBefore, offset, offsetPagingAnchor));
                            if (filteringChange)
                                this.FireHandlers("filterChange", new AgGrids.EventsManagers.Events.FilterChange(filteringBefore, filteringAfter));
                            if (sortingChange)
                                this.FireHandlers("sortChange", new AgGrids.EventsManagers.Events.SortChange(sortingBefore, sortingAfter));
                        };
                        EventsManager.prototype.HandleUrlChange = function (e) {
                            var dataSource = this.grid.GetDataSource(), sortingBefore = this.grid.GetSorting(), filteringBefore = this.grid.GetFiltering(), reqDataRaw = e.state, reqData = this.helpers.RetypeRequestObjects2Maps(reqDataRaw), offsetBefore = this.grid.GetOffset(), offsetAfter = reqData.offset, oldFilteringStr = JSON.stringify(this.helpers.RetypeFilteringMap2Obj(filteringBefore)), oldSortingStr = JSON.stringify(sortingBefore), sortingAfter = reqData.sorting, filteringAfter = reqData.filtering, newFilteringStr = JSON.stringify(reqDataRaw.filtering), newSortingStr = JSON.stringify(sortingAfter), offsetChange = offsetBefore !== offsetAfter, filteringChange = oldFilteringStr !== newFilteringStr, sortingChange = oldSortingStr !== newSortingStr;
                            var continueToNextEvents = this.FireHandlers("beforeHistoryChange", new AgGrids.EventsManagers.Events.HistoryChange(offsetBefore, offsetAfter, sortingBefore, sortingAfter, filteringBefore, filteringAfter));
                            if (continueToNextEvents === false) {
                                var dataSource = this.grid.GetDataSource();
                                var _a = __read(dataSource.GetLastHistory(), 4), stateData = _a[0], url = _a[1], page = _a[2], count = _a[3];
                                dataSource.BrowserHistoryPush(stateData, url, page, count);
                                e.preventDefault();
                                e.stopPropagation();
                                return;
                            }
                            if (offsetChange) {
                                var pagingAnchorsMaps = this.grid.GetOptionsManager().GetElements().pagingAnchorsMaps;
                                var offsetPagingAnchor = pagingAnchorsMaps.has(offsetAfter)
                                    ? pagingAnchorsMaps.get(offsetAfter)[0]
                                    : null;
                                var continueToNextEvents = this.FireHandlers("beforePageChange", new AgGrids.EventsManagers.Events.PageChange(offsetBefore, offsetAfter, offsetPagingAnchor));
                                if (continueToNextEvents === false)
                                    return;
                            }
                            if (filteringChange) {
                                var continueToNextEvents = this.FireHandlers("beforeFilterChange", new AgGrids.EventsManagers.Events.FilterChange(filteringBefore, filteringAfter));
                                if (continueToNextEvents === false)
                                    return;
                            }
                            if (sortingChange) {
                                var continueToNextEvents = this.FireHandlers("beforeSortChange", new AgGrids.EventsManagers.Events.SortChange(sortingBefore, sortingAfter));
                                if (continueToNextEvents === false)
                                    return;
                            }
                            this.grid
                                .SetOffset(offsetAfter)
                                .SetSorting(sortingAfter)
                                .SetFiltering(filteringAfter);
                            this.handleUrlChangeSortsFilters(reqData);
                            dataSource.ExecRequest(reqDataRaw, false);
                            this.grid.GetColumnsVisibilityMenu().UpdateFormAction(reqDataRaw.path);
                            var continueToNextEvents = this.FireHandlers("historyChange", new AgGrids.EventsManagers.Events.HistoryChange(offsetBefore, offsetAfter, sortingBefore, sortingAfter, filteringBefore, filteringAfter));
                            if (continueToNextEvents === false)
                                return;
                            if (offsetChange)
                                this.FireHandlers("pageChange", new AgGrids.EventsManagers.Events.PageChange(offsetBefore, offsetAfter, offsetPagingAnchor));
                            if (filteringChange)
                                this.FireHandlers("filterChange", new AgGrids.EventsManagers.Events.FilterChange(filteringBefore, filteringAfter));
                            if (sortingChange)
                                this.FireHandlers("sortChange", new AgGrids.EventsManagers.Events.SortChange(sortingBefore, sortingAfter));
                        };
                        EventsManager.prototype.HandleResponseLoaded = function (response, selectFirstRow) {
                            var e_5, _a, e_6, _b, e_7, _c;
                            if (selectFirstRow === void 0) { selectFirstRow = false; }
                            this.grid
                                .SetGridPath(response.path)
                                .SetOffset(response.offset)
                                .SetTotalCount(response.totalCount)
                                .SetSorting(response.sorting)
                                .SetFiltering(response.filtering);
                            try {
                                for (var _d = __values(this.grid.GetFilterHeaders().entries()), _e = _d.next(); !_e.done; _e = _d.next()) {
                                    var _f = __read(_e.value, 2), columnId = _f[0], filterHeader = _f[1];
                                    if (response.filtering.has(columnId)) {
                                        filterHeader.SetText(response.filtering.get(columnId));
                                    }
                                    else {
                                        filterHeader.SetText(null);
                                    }
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
                                for (var _g = __values(this.grid.GetFilterMenus().entries()), _h = _g.next(); !_h.done; _h = _g.next()) {
                                    var _j = __read(_h.value, 2), columnId = _j[0], filterMenu = _j[1];
                                    if (response.filtering.has(columnId)) {
                                        filterMenu.SetUpControls(response.filtering.get(columnId));
                                    }
                                    else {
                                        filterMenu.SetUpControls(null);
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
                            var sortHeaders = this.grid.GetSortHeaders(), index = 0;
                            try {
                                for (var _k = __values(response.sorting), _l = _k.next(); !_l.done; _l = _k.next()) {
                                    var _m = __read(_l.value, 2), columnId = _m[0], sortDir = _m[1];
                                    if (sortHeaders.has(columnId)) {
                                        sortHeaders.get(columnId)
                                            .SetDirection(sortDir)
                                            .SetSequence(index);
                                    }
                                    index++;
                                }
                            }
                            catch (e_7_1) { e_7 = { error: e_7_1 }; }
                            finally {
                                try {
                                    if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                                }
                                finally { if (e_7) throw e_7.error; }
                            }
                            if (selectFirstRow)
                                this.SelectRowByIndex(0);
                        };
                        EventsManager.prototype.firefiltering = function (filteringBefore, filteringAfter) {
                            this.grid
                                .SetOffset(0)
                                .SetFiltering(filteringAfter)
                                .SetTotalCount(null);
                            var pageMode = this.grid.GetPageMode();
                            if ((pageMode & AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_SINGLE) != 0) {
                                var dataSource = this.grid.GetDataSource();
                                dataSource.SetBodyScrolled(false);
                                var gridOptionsManager = this.grid.GetOptionsManager().GetAgOptions();
                                gridOptionsManager.api.onFilterChanged();
                            }
                            else if ((pageMode & AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_MULTI) != 0) {
                                var dataSourceMp = this.grid.GetDataSource();
                                dataSourceMp.Load();
                            }
                            this.FireHandlers("filterChange", new AgGrids.EventsManagers.Events.FilterChange(filteringBefore, filteringAfter));
                            return this;
                        };
                        EventsManager.prototype.handleColumnChangesSent = function () {
                            if (this.columnsChangesSending)
                                return;
                            var plainObj = AgGrids.Tools.Helpers.ConvertMap2Object(this.columnsChanges);
                            this.columnsChanges = new Map();
                            Ajax.load({
                                url: this.grid.GetServerConfig().urlColumnsChanges,
                                data: { changes: plainObj },
                                type: 'json',
                                method: 'POST',
                                success: this.handleColumnChangesResponse.bind(this),
                                error: this.handleColumnChangesResponse.bind(this)
                            });
                        };
                        EventsManager.prototype.handleColumnChangesResponse = function () {
                            this.columnsChangesSending = false;
                            if (this.columnsChanges.size === 0)
                                return;
                            if (this.columnsChangesTimeout)
                                clearTimeout(this.columnsChangesTimeout);
                            this.columnsChangesTimeout = setTimeout(this.handleColumnChangesSent.bind(this), this.Static.COLUMN_CHANGES_TIMEOUT);
                        };
                        EventsManager.prototype.handleUrlChangeSortsFilters = function (reqData) {
                            var e_8, _a, e_9, _b, e_10, _c;
                            // set up sort headers:
                            var sortHeaders = this.grid.GetSortHeaders(), activeSortItems = new Map(), sequence = 0;
                            try {
                                for (var _d = __values(reqData.sorting), _e = _d.next(); !_e.done; _e = _d.next()) {
                                    var _f = __read(_e.value, 2), columnId = _f[0], sortDir = _f[1];
                                    activeSortItems.set(columnId, [sortDir, sequence++]);
                                }
                            }
                            catch (e_8_1) { e_8 = { error: e_8_1 }; }
                            finally {
                                try {
                                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                                }
                                finally { if (e_8) throw e_8.error; }
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
                            catch (e_9_1) { e_9 = { error: e_9_1 }; }
                            finally {
                                try {
                                    if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                                }
                                finally { if (e_9) throw e_9.error; }
                            }
                            // set up filtering inputs:
                            var filterInputs = this.grid.GetFilterHeaders();
                            try {
                                for (var _l = __values(filterInputs.entries()), _m = _l.next(); !_m.done; _m = _l.next()) {
                                    var _o = __read(_m.value, 2), columnId = _o[0], filterInput = _o[1];
                                    if (reqData.filtering.has(columnId)) {
                                        filterInput === null || filterInput === void 0 ? void 0 : filterInput.SetText(reqData.filtering.get(columnId));
                                    }
                                    else {
                                        filterInput === null || filterInput === void 0 ? void 0 : filterInput.SetText(null);
                                    }
                                }
                            }
                            catch (e_10_1) { e_10 = { error: e_10_1 }; }
                            finally {
                                try {
                                    if (_m && !_m.done && (_c = _l.return)) _c.call(_l);
                                }
                                finally { if (e_10) throw e_10.error; }
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
                        return EventsManager;
                    }(AgGrids.EventsManagers.Base));
                    AgGrids.EventsManager = EventsManager;
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=EventsManager.js.map