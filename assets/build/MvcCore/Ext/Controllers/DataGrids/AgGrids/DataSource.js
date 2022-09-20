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
                    var DataSource = /** @class */ (function () {
                        function DataSource(grid) {
                            var _newTarget = this.constructor;
                            this.Static = _newTarget;
                            this.Static.grid = grid;
                            this.grid = grid;
                            this.optionsManager = grid.GetOptionsManager();
                            this.eventsManager = grid.GetEvents();
                            this.helpers = grid.GetHelpers();
                            this.initialData = grid.GetInitialData();
                        }
                        DataSource.prototype.handleResponseControls = function (response) {
                            var elms = this.optionsManager.GetElements(), controls = response.controls;
                            if (elms.statusControl != null && controls.status != null) {
                                elms.statusControl.parentNode.replaceChild(this.helpers.GetHtmlElementFromString(controls.status), elms.statusControl);
                            }
                        };
                        DataSource.prototype.initPageReqDataAndCache = function () {
                            var grid = this.Static.grid;
                            this.cache = new grid.Static.Classes.DataSources.Cache(grid);
                            this.pageReqData = this.Static.RetypeRequestMaps2Objects({
                                offset: grid.GetOffset(),
                                limit: grid.GetServerConfig().itemsPerPage,
                                sorting: grid.GetSorting(),
                                filtering: grid.GetFiltering(),
                            });
                        };
                        DataSource.prototype.getReqUrlMethodAndType = function () {
                            var serverCfg = this.Static.grid.GetServerConfig(), cfgReqMethod = serverCfg.dataRequestMethod, urlData = serverCfg.urlData, reqMethod = 'GET', reqType = 'json';
                            if ((cfgReqMethod & AgGrids.Enums.AjaxDataRequestMethod.AJAX_DATA_REQUEST_METHOD_POST) != 0) {
                                reqMethod = 'POST';
                            }
                            else if ((cfgReqMethod & AgGrids.Enums.AjaxDataRequestMethod.AJAX_DATA_REQUEST_METHOD_JSONP) != 0) {
                                reqType = 'jsonp';
                            }
                            return [urlData, reqMethod, reqType];
                        };
                        DataSource.RetypeRawServerResponse = function (serverResponse) {
                            serverResponse.filtering = this.retypeFilteringObj2Map(serverResponse.filtering);
                            return serverResponse;
                        };
                        DataSource.RetypeRequestObjects2Maps = function (serverRequest) {
                            var result = __assign({}, serverRequest);
                            result.filtering = this.retypeFilteringObj2Map(serverRequest.filtering);
                            return result;
                        };
                        DataSource.retypeFilteringObj2Map = function (filtering) {
                            var e_1, _a;
                            var columnsIds = Object.keys(filtering);
                            if (columnsIds.length > 0) {
                                var filtering = filtering;
                                var newFiltering = new Map();
                                try {
                                    for (var columnsIds_1 = __values(columnsIds), columnsIds_1_1 = columnsIds_1.next(); !columnsIds_1_1.done; columnsIds_1_1 = columnsIds_1.next()) {
                                        var idColumn = columnsIds_1_1.value;
                                        newFiltering.set(idColumn, AgGrids.Tools.Helpers.ConvertObject2Map(filtering[idColumn]));
                                    }
                                }
                                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                finally {
                                    try {
                                        if (columnsIds_1_1 && !columnsIds_1_1.done && (_a = columnsIds_1.return)) _a.call(columnsIds_1);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                }
                                return newFiltering;
                            }
                            else {
                                return new Map();
                            }
                        };
                        DataSource.RetypeFilteringMap2Obj = function (filtering) {
                            var e_2, _a;
                            var newFiltering = {};
                            try {
                                for (var _b = __values(filtering.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var _d = __read(_c.value, 2), idColumn = _d[0], filterValues = _d[1];
                                    newFiltering[idColumn] = AgGrids.Tools.Helpers.ConvertMap2Object(filterValues);
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                            return newFiltering;
                        };
                        DataSource.RetypeRequestMaps2Objects = function (serverRequest) {
                            var result = __assign({}, serverRequest);
                            if (serverRequest.filtering instanceof Map) {
                                result.filtering = this.RetypeFilteringMap2Obj(serverRequest.filtering);
                            }
                            return this.addRequestSystemData(result);
                        };
                        DataSource.addRequestSystemData = function (serverRequest) {
                            var serverConfig = this.grid.GetServerConfig();
                            serverRequest.id = serverConfig.id;
                            serverRequest.mode = serverConfig.clientPageMode;
                            serverRequest.path = this.grid.GetGridPath();
                            return serverRequest;
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