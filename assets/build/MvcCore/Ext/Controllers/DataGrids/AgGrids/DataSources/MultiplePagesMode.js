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
                        var MultiplePagesMode = /** @class */ (function (_super) {
                            __extends(MultiplePagesMode, _super);
                            function MultiplePagesMode(grid) {
                                var _this = _super.call(this, grid) || this;
                                _this.eventsManager = grid.GetEvents();
                                _this.initPageReqDataAndCache();
                                _this.BrowserHistoryReplace(_this.pageReqData, location.href, _this.initialData.page, _this.initialData.count);
                                _this.pageReqData = null;
                                return _this;
                            }
                            MultiplePagesMode.prototype.initPageReqDataAndCache = function () {
                                _super.prototype.initPageReqDataAndCache.call(this);
                                var elms = this.grid.GetOptionsManager().GetElements();
                                if (elms.bottomControlsElement != null) {
                                    this.initialData.controls = {};
                                    if (elms.pagingControl != null)
                                        this.initialData.controls.paging = elms.pagingControl.outerHTML;
                                    if (elms.statusControl != null)
                                        this.initialData.controls.status = elms.statusControl.outerHTML;
                                    if (elms.countScalesControl != null)
                                        this.initialData.controls.countScales = elms.countScalesControl.outerHTML;
                                }
                                this.cache.Add(this.cache.Key(this.pageReqData), this.initialData);
                            };
                            MultiplePagesMode.prototype.Load = function () {
                                var reqData = this.helpers.RetypeRequestMaps2Objects({
                                    offset: this.grid.GetOffset(),
                                    limit: this.grid.GetLimit(),
                                    sorting: this.grid.GetSorting(),
                                    filtering: this.grid.GetFiltering(),
                                });
                                return this.ExecRequest(reqData, true);
                            };
                            MultiplePagesMode.prototype.ExecRequest = function (reqData, changeUrl) {
                                if (changeUrl === void 0) { changeUrl = true; }
                                var agGridApi = this.optionsManager.GetAgOptions().api;
                                agGridApi.showLoadingOverlay();
                                var _a = __read(this.getReqUrlMethodAndType(), 3), reqDataUrl = _a[0], reqMethod = _a[1], reqType = _a[2];
                                var cacheKey = this.cache.Key(reqData);
                                if (this.cache.Has(cacheKey)) {
                                    this.handleResponse(reqData, changeUrl, cacheKey, true, this.cache.Get(cacheKey));
                                }
                                else {
                                    Ajax.load({
                                        url: reqDataUrl,
                                        method: reqMethod,
                                        data: reqData,
                                        type: reqType,
                                        success: this.handleResponse.bind(this, reqData, changeUrl, cacheKey, false)
                                    });
                                }
                                return this;
                            };
                            MultiplePagesMode.prototype.handleResponse = function (reqData, changeUrl, cacheKey, cached, rawResponse) {
                                var response;
                                if (cached) {
                                    response = rawResponse;
                                }
                                else {
                                    response = this.helpers.RetypeRawServerResponse(rawResponse);
                                    this.cache.Add(cacheKey, response);
                                    //this.grid.GetEvents().HandleResponseLoaded(response);
                                }
                                var agGridApi = this.optionsManager.GetAgOptions().api;
                                agGridApi.setRowData(response.data);
                                agGridApi.hideOverlay();
                                if (cached) {
                                    this.grid.GetEvents().SelectRowByIndex(0);
                                }
                                else {
                                    this.grid.GetEvents().HandleResponseLoaded(response, true);
                                }
                                if (response.controls != null) {
                                    this.optionsManager.InitBottomControls();
                                    this.handleResponseControls(response);
                                }
                                if (changeUrl) {
                                    reqData.path = response.path;
                                    this.BrowserHistoryPush(reqData, response.url, response.page, response.count);
                                    this.grid.GetColumnsVisibilityMenu().UpdateFormAction(response.path);
                                }
                            };
                            MultiplePagesMode.prototype.handleResponseControls = function (response) {
                                _super.prototype.handleResponseControls.call(this, response);
                                var elms = this.optionsManager.GetElements(), controls = response.controls;
                                if (elms.countScalesControl != null) {
                                    if (controls.countScales == null) {
                                        this.eventsManager.RemoveCountScalesEvents();
                                        elms.countScalesControl.innerHTML = '';
                                        this.optionsManager.InitBottomControlsCountScales();
                                    }
                                    else {
                                        this.eventsManager.RemoveCountScalesEvents();
                                        elms.countScalesControl.parentNode.replaceChild(this.helpers.GetHtmlElementFromString(controls.countScales), elms.countScalesControl);
                                        this.optionsManager.InitBottomControlsCountScales();
                                        this.eventsManager.AddCountScalesEvents();
                                    }
                                }
                                if (elms.pagingControl != null) {
                                    if (controls.paging == null) {
                                        this.eventsManager.RemovePagingEvents();
                                        elms.pagingControl.innerHTML = '';
                                        this.optionsManager.InitBottomControlsPaging();
                                    }
                                    else {
                                        this.eventsManager.RemovePagingEvents();
                                        elms.pagingControl.parentNode.replaceChild(this.helpers.GetHtmlElementFromString(controls.paging), elms.pagingControl);
                                        this.optionsManager.InitBottomControlsPaging();
                                        this.eventsManager.AddPagingEvents();
                                    }
                                }
                            };
                            return MultiplePagesMode;
                        }(MvcCore.Ext.Controllers.DataGrids.AgGrids.DataSource));
                        DataSources.MultiplePagesMode = MultiplePagesMode;
                    })(DataSources = AgGrids.DataSources || (AgGrids.DataSources = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=MultiplePagesMode.js.map