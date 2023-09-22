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
                    var DataSource = /** @class */ (function () {
                        function DataSource(grid) {
                            var _newTarget = this.constructor;
                            this.lastHistory = [null, null, null, null];
                            this.Static = _newTarget;
                            this.grid = grid;
                            this.optionsManager = grid.GetOptionsManager();
                            this.eventsManager = grid.GetEvents();
                            this.helpers = grid.GetHelpers();
                            this.initialData = grid.GetInitialData();
                            this.serverConfig = grid.GetServerConfig();
                            this.docTitleChange = this.serverConfig.clientTitleTemplate != null;
                            this.docTitlePattern = "<".concat(this.serverConfig.gridUrlParamName, ">");
                            this.autoSelectFirstRow = this.eventsManager.GetAutoSelectFirstRow();
                        }
                        DataSource.prototype.SetLastHistory = function (lastHistory) {
                            this.lastHistory = lastHistory;
                            return this;
                        };
                        DataSource.prototype.GetLastHistory = function () {
                            return this.lastHistory;
                        };
                        DataSource.prototype.BrowserHistoryReplace = function (stateData, url, page, count) {
                            if (this.serverConfig.clientChangeHistory) {
                                var title = this.docTitleChange
                                    ? this.CompleteDocumentTitle(stateData, page, count)
                                    : document.title;
                                stateData.title = title;
                                history.replaceState(stateData, title, url);
                                this.SetLastHistory([stateData, url, page, count]);
                                if (this.docTitleChange)
                                    document.title = title;
                            }
                            return this;
                        };
                        DataSource.prototype.BrowserHistoryPush = function (stateData, url, page, count) {
                            if (this.serverConfig.clientChangeHistory) {
                                var title = this.docTitleChange
                                    ? this.CompleteDocumentTitle(stateData, page, count)
                                    : document.title;
                                stateData.title = title;
                                history.pushState(stateData, title, url);
                                this.SetLastHistory([stateData, url, page, count]);
                                if (this.docTitleChange)
                                    document.title = title;
                            }
                            return this;
                        };
                        DataSource.prototype.AjaxLoad = function (url, method, data, type, success) {
                            Ajax.load({
                                url: url,
                                method: method,
                                data: data,
                                type: type,
                                success: success
                            });
                        };
                        DataSource.prototype.CompleteDocumentTitle = function (stateData, page, count) {
                            var controlsTexts = this.serverConfig.controlsTexts, docTitleReplacements = [
                                controlsTexts.get(AgGrids.Enums.ControlText.TITLE_PAGE)
                                    .replace('{0}', page.toString()),
                                controlsTexts.get(AgGrids.Enums.ControlText.TITLE_SCALE)
                                    .replace('{0}', count.toString())
                            ];
                            this.completeDocumentTitleSorting(stateData.sorting, docTitleReplacements);
                            this.completeDocumentTitleFiltering(stateData.filtering, docTitleReplacements);
                            return this.serverConfig.clientTitleTemplate.replace(this.docTitlePattern, docTitleReplacements.join(', '));
                        };
                        DataSource.prototype.completeDocumentTitleSorting = function (sorting, docTitleReplacements) {
                            var e_1, _a;
                            if (sorting.length > 0) {
                                var sortingStrItems = [], columns = this.serverConfig.columns, controlsTexts = this.serverConfig.controlsTexts;
                                try {
                                    for (var sorting_1 = __values(sorting), sorting_1_1 = sorting_1.next(); !sorting_1_1.done; sorting_1_1 = sorting_1.next()) {
                                        var _b = __read(sorting_1_1.value, 2), columnUrlName = _b[0], sortDir = _b[1];
                                        sortingStrItems.push(columns[columnUrlName].headingName + ' ' +
                                            (sortDir ? '\u2193' : '\u2191'));
                                    }
                                }
                                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                finally {
                                    try {
                                        if (sorting_1_1 && !sorting_1_1.done && (_a = sorting_1.return)) _a.call(sorting_1);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                }
                                docTitleReplacements.push(controlsTexts.get(AgGrids.Enums.ControlText.TITLE_SORT)
                                    .replace('{0}', sortingStrItems.join(', ')));
                            }
                            return this;
                        };
                        DataSource.prototype.completeDocumentTitleFiltering = function (stateDataFiltering, docTitleReplacements) {
                            var e_2, _a, e_3, _b;
                            var filteringColumnsUrlNames = Object.keys(stateDataFiltering), filteringStrItems = [], columns = this.serverConfig.columns, controlsTexts = this.serverConfig.controlsTexts, translator = this.grid.GetTranslator(), urlDelimiterValues = this.serverConfig.urlSegments.urlDelimiterValues, filteringValuesByControlType, controlText;
                            if (filteringColumnsUrlNames.length > 0) {
                                try {
                                    for (var filteringColumnsUrlNames_1 = __values(filteringColumnsUrlNames), filteringColumnsUrlNames_1_1 = filteringColumnsUrlNames_1.next(); !filteringColumnsUrlNames_1_1.done; filteringColumnsUrlNames_1_1 = filteringColumnsUrlNames_1.next()) {
                                        var columnUrlName = filteringColumnsUrlNames_1_1.value;
                                        filteringValuesByControlType = this.completeDocumentTitleFilteringItem(columnUrlName, stateDataFiltering[columnUrlName]);
                                        try {
                                            for (var _c = (e_3 = void 0, __values(filteringValuesByControlType.entries())), _d = _c.next(); !_d.done; _d = _c.next()) {
                                                var _e = __read(_d.value, 2), controlType = _e[0], values = _e[1];
                                                controlText = AgGrids.Columns.FilterOperatorsCfg.CONTROL_TYPES_TEXTS.get(controlType);
                                                controlText = translator.Translate(controlText);
                                                controlText = controlText.substring(0, 1).toLocaleLowerCase() + controlText.substring(1);
                                                filteringStrItems.push(columns[columnUrlName].headingName + ' - ' +
                                                    controlText + ': ' +
                                                    values.join(urlDelimiterValues + ' '));
                                            }
                                        }
                                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                        finally {
                                            try {
                                                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                                            }
                                            finally { if (e_3) throw e_3.error; }
                                        }
                                    }
                                }
                                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                finally {
                                    try {
                                        if (filteringColumnsUrlNames_1_1 && !filteringColumnsUrlNames_1_1.done && (_a = filteringColumnsUrlNames_1.return)) _a.call(filteringColumnsUrlNames_1);
                                    }
                                    finally { if (e_2) throw e_2.error; }
                                }
                                docTitleReplacements.push(controlsTexts.get(AgGrids.Enums.ControlText.TITLE_FILTER)
                                    .replace('{0}', filteringStrItems.join(', ')));
                            }
                            return this;
                        };
                        DataSource.prototype.completeDocumentTitleFilteringItem = function (columnUrlName, filteringItem) {
                            var e_4, _a;
                            var result = new Map(), columns = this.serverConfig.columns, operator, filteringValues, serverColumnCfg, serverType, allServerTypesControlTypesOrders, allControlTypes, currentControlType;
                            for (var operatorRaw in filteringItem) {
                                operator = operatorRaw;
                                filteringValues = filteringItem[operatorRaw];
                                try {
                                    for (var filteringValues_1 = (e_4 = void 0, __values(filteringValues)), filteringValues_1_1 = filteringValues_1.next(); !filteringValues_1_1.done; filteringValues_1_1 = filteringValues_1.next()) {
                                        var filteringValue = filteringValues_1_1.value;
                                        serverColumnCfg = columns[columnUrlName];
                                        serverType = serverColumnCfg.types[serverColumnCfg.types.length - 1];
                                        allServerTypesControlTypesOrders = AgGrids.Columns.FilterOperatorsCfg.SERVER_TYPES_CONTROL_TYPES_ORDERS;
                                        allControlTypes = allServerTypesControlTypesOrders.has(serverType)
                                            ? allServerTypesControlTypesOrders.get(serverType)
                                            : allServerTypesControlTypesOrders.get(AgGrids.Enums.ServerType.STRING);
                                        currentControlType = this.helpers.GetControlTypeByOperatorAndValue(operator, filteringValue, allControlTypes.length > 0
                                            ? allControlTypes[0]
                                            : AgGrids.Enums.FilterControlType.UNKNOWN, serverType);
                                        if (result.has(currentControlType)) {
                                            result.get(currentControlType).push(filteringValue);
                                        }
                                        else {
                                            result.set(currentControlType, [filteringValue]);
                                        }
                                    }
                                }
                                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                finally {
                                    try {
                                        if (filteringValues_1_1 && !filteringValues_1_1.done && (_a = filteringValues_1.return)) _a.call(filteringValues_1);
                                    }
                                    finally { if (e_4) throw e_4.error; }
                                }
                            }
                            return result;
                        };
                        DataSource.prototype.handleResponseControls = function (response) {
                            var elms = this.optionsManager.GetElements(), controls = response.controls;
                            if (elms.statusControl != null) {
                                if (controls.status == null) {
                                    elms.statusControl.innerHTML = '';
                                }
                                else {
                                    elms.statusControl.parentNode.replaceChild(this.helpers.GetHtmlElementFromString(controls.status), elms.statusControl);
                                }
                            }
                        };
                        DataSource.prototype.initPageReqDataAndCache = function () {
                            var grid = this.grid;
                            this.cache = new grid.Static.Classes.DataSources.Cache(grid);
                            this.pageReqData = this.helpers.RetypeRequestMaps2Objects({
                                offset: grid.GetOffset(),
                                limit: grid.GetLimit(),
                                sorting: grid.GetSorting(),
                                filtering: grid.GetFiltering(),
                            });
                        };
                        DataSource.prototype.getReqUrlMethodAndType = function () {
                            var serverCfg = this.grid.GetServerConfig(), cfgReqMethod = serverCfg.dataRequestMethod, urlData = serverCfg.urlData, reqMethod = 'GET', reqType = 'json';
                            if ((cfgReqMethod & AgGrids.Enums.AjaxDataRequestMethod.AJAX_DATA_REQUEST_METHOD_POST) != 0) {
                                reqMethod = 'POST';
                            }
                            else if ((cfgReqMethod & AgGrids.Enums.AjaxDataRequestMethod.AJAX_DATA_REQUEST_METHOD_JSONP) != 0) {
                                reqType = 'jsonp';
                            }
                            return [urlData, reqMethod, reqType];
                        };
                        return DataSource;
                    }());
                    AgGrids.DataSource = DataSource;
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=DataSource.js.map