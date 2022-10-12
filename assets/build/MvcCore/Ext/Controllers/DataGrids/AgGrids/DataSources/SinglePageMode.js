var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
                    var DataSources;
                    (function (DataSources) {
                        var SinglePageMode = /** @class */ (function (_super) {
                            __extends(SinglePageMode, _super);
                            function SinglePageMode(grid) {
                                var _this = _super.call(this, grid) || this;
                                /** If you know up front how many rows are in the dataset, set it here. Otherwise leave blank. */
                                _this.rowCount = undefined;
                                _this.autoSelectFirstRow = false;
                                _this.scrolled = false;
                                _this.pageLoadedState = 0;
                                _this.initDataCache = _this.grid.GetServerConfig().clientMaxRowsInCache > 0;
                                _this.requestCounter = 0;
                                _this.initLocationHref = location.href;
                                _this.initPageReqDataAndCache();
                                _this.BrowserHistoryReplace(_this.pageReqData, location.href, _this.initialData.page, _this.initialData.count);
                                //this.pageReqData = null;
                                _this.changeUrlSwitches = new Map();
                                return _this;
                            }
                            SinglePageMode.prototype.SetBodyScrolled = function (scrolled) {
                                this.scrolled = scrolled;
                                return this;
                            };
                            SinglePageMode.prototype.initPageReqDataAndCache = function () {
                                _super.prototype.initPageReqDataAndCache.call(this);
                                this.cache.SetEnabled(true);
                                this.cache.Add(this.cache.Key(this.pageReqData), {});
                            };
                            /** Callback the grid calls that you implement to fetch rows from the server. */
                            SinglePageMode.prototype.getRows = function (params) {
                                /*console.log(
                                    'asking for ' + params.startRow + ' to ' + params.endRow + ' by collection from '
                                    + this.initialData.offset + ' to ' + (this.initialData.offset + this.initialData.dataCount)
                                );*/
                                var totalCount = this.grid.GetTotalCount();
                                if (this.possibleToResolveByInitData(params, totalCount)) {
                                    this.resolveByInitData(params, totalCount);
                                }
                                else {
                                    this.resolveByAjaxRequest(params);
                                }
                            };
                            SinglePageMode.prototype.ExecRequest = function (reqData, changeUrl) {
                                if (!changeUrl) {
                                    var cacheKey = this.cache.Key(reqData);
                                    this.changeUrlSwitches.set(cacheKey, true);
                                }
                                //console.log("set cache", cacheKey, reqData);
                                var gridOptionsManager = this.grid.GetOptionsManager().GetAgOptions();
                                // both triggers current grid model reload and calling `this.getRows()`:
                                //gridOptions.api.onFilterChanged();
                                gridOptionsManager.api.onFilterChanged();
                                return this;
                            };
                            SinglePageMode.prototype.possibleToResolveByInitData = function (params, totalCount) {
                                var result = ((this.requestCounter++ === 0 || this.initDataCache) &&
                                    totalCount != null &&
                                    params.startRow >= this.initialData.offset &&
                                    (params.endRow <= this.initialData.offset + this.initialData.dataCount || totalCount < params.endRow));
                                if (!result)
                                    return false;
                                var reqData = this.helpers.RetypeRequestMaps2Objects({
                                    offset: this.grid.GetOffset(),
                                    limit: this.grid.GetLimit(),
                                    sorting: this.grid.GetSorting(),
                                    filtering: this.grid.GetFiltering(),
                                });
                                var cacheKey = this.cache.Key(reqData);
                                if (this.cache.Has(cacheKey))
                                    return true;
                                return false;
                            };
                            SinglePageMode.prototype.resolveByInitData = function (params, totalCount) {
                                var _this = this;
                                //console.log("resolving by initial data");
                                params.successCallback(this.initialData.data.slice(params.startRow - this.initialData.offset, params.endRow - this.initialData.offset), totalCount);
                                if (this.pageLoadedState > 0) {
                                    var reqData = this.helpers.RetypeRequestMaps2Objects({
                                        offset: this.grid.GetOffset(),
                                        limit: this.grid.GetLimit(),
                                        sorting: this.grid.GetSorting(),
                                        filtering: this.grid.GetFiltering(),
                                    });
                                    var cacheKey = this.cache.Key(reqData);
                                    if (this.changeUrlSwitches.has(cacheKey) && this.changeUrlSwitches.get(cacheKey)) {
                                        this.changeUrlSwitches.delete(cacheKey);
                                    }
                                    else {
                                        //console.log("pushState init data", reqData);
                                        this.BrowserHistoryPush(reqData, this.initLocationHref, this.initialData.page, this.initialData.count);
                                    }
                                    if (this.autoSelectFirstRow)
                                        this.grid.GetEvents().SelectRowByIndex(0);
                                }
                                else {
                                    this.pageLoadedState++;
                                    var serverCfg = this.grid.GetServerConfig();
                                    //console.log("page", serverCfg.page);
                                    if (serverCfg.page > 1) {
                                        var scrollOffset = (serverCfg.page - 1) * this.grid.GetLimit();
                                        //console.log("scrolling top", scrollOffset);
                                        this.optionsManager.GetAgOptions().api.ensureIndexVisible(scrollOffset, "top");
                                        this.specialCase = true;
                                        this.grid.GetEvents().SelectRowByIndex(scrollOffset, function () {
                                            setTimeout(function () {
                                                _this.autoSelectFirstRow = true;
                                            }, 1000);
                                        });
                                    }
                                    else {
                                        this.grid.GetEvents().SelectRowByIndex(0, function () {
                                            setTimeout(function () {
                                                _this.autoSelectFirstRow = true;
                                            }, 1000);
                                        });
                                    }
                                }
                            };
                            SinglePageMode.prototype.resolveByAjaxRequest = function (params) {
                                var _this = this;
                                //console.log("resolveByAjaxRequest");
                                var agGridApi = this.optionsManager.GetAgOptions().api;
                                agGridApi.showLoadingOverlay();
                                var _a = __read(this.getReqUrlMethodAndType(), 3), reqDataUrl = _a[0], reqMethod = _a[1], reqType = _a[2];
                                var reqData = this.helpers.RetypeRequestMaps2Objects({
                                    offset: params.startRow,
                                    limit: params.endRow - params.startRow,
                                    sorting: this.grid.GetSorting(),
                                    filtering: this.grid.GetFiltering(),
                                });
                                Ajax.load({
                                    url: reqDataUrl,
                                    method: reqMethod,
                                    data: Object.assign({}, reqData),
                                    type: reqType,
                                    success: function (rawResponse) {
                                        agGridApi.hideOverlay();
                                        var response = _this.helpers.RetypeRawServerResponse(rawResponse);
                                        if (response.controls != null) {
                                            _this.optionsManager.InitBottomControls();
                                            _this.handleResponseControls(response);
                                        }
                                        var serverCfg = _this.grid.GetServerConfig();
                                        if (serverCfg.page > 1) {
                                            _this.pageLoadedState++;
                                        }
                                        else if (serverCfg.page === 1) {
                                            _this.pageLoadedState = 4;
                                        }
                                        var cacheKey = _this.cache.Key(reqData);
                                        if (_this.changeUrlSwitches.has(cacheKey) && _this.changeUrlSwitches.get(cacheKey)) {
                                            _this.changeUrlSwitches.delete(cacheKey);
                                        }
                                        else {
                                            if (_this.pageLoadedState > 3) {
                                                reqData.path = response.path;
                                                _this.BrowserHistoryPush(reqData, response.url, response.page, response.count);
                                                _this.grid.GetColumnsVisibilityMenu().UpdateFormAction(response.path);
                                            }
                                        }
                                        var selectFirstRow = !_this.scrolled && _this.pageLoadedState > 3;
                                        params.successCallback(response.data, response.totalCount);
                                        _this.grid.GetEvents().HandleResponseLoaded(response, selectFirstRow);
                                    }
                                });
                            };
                            return SinglePageMode;
                        }(MvcCore.Ext.Controllers.DataGrids.AgGrids.DataSource));
                        DataSources.SinglePageMode = SinglePageMode;
                    })(DataSources = AgGrids.DataSources || (AgGrids.DataSources = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=SinglePageMode.js.map