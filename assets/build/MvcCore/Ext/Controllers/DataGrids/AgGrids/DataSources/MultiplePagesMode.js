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
                        var MultiplePagesMode = /** @class */ (function (_super) {
                            __extends(MultiplePagesMode, _super);
                            function MultiplePagesMode(grid) {
                                var _this = _super.call(this, grid) || this;
                                _this.eventsManager = grid.GetEvents();
                                var reqData = _this.helpers.RetypeRequest2RawRequest({
                                    offset: _this.grid.GetOffset(),
                                    limit: _this.grid.GetServerConfig().count,
                                    sorting: _this.grid.GetSorting(),
                                    filtering: _this.grid.GetFiltering(),
                                });
                                history.replaceState(reqData, document.title, location.href);
                                _this.initCache(reqData);
                                return _this;
                            }
                            MultiplePagesMode.prototype.initCache = function (reqData) {
                                this.cache = new DataSources.MultiplePagesModes.Cache(this.grid);
                                var initialData = this.grid.GetInitialData(), elms = this.grid.GetOptions().GetElements(), bottomControlsElement = elms.bottomControlsElement;
                                if (bottomControlsElement != null) {
                                    initialData.controls = {};
                                    if (elms.pagingControl != null)
                                        initialData.controls.paging = elms.pagingControl.outerHTML;
                                    if (elms.statusControl != null)
                                        initialData.controls.status = elms.statusControl.outerHTML;
                                    if (elms.countScalesControl != null)
                                        initialData.controls.countScales = elms.countScalesControl.outerHTML;
                                }
                                this.cache.Add(this.cache.Key(reqData), initialData);
                            };
                            MultiplePagesMode.prototype.Load = function () {
                                var reqData = this.helpers.RetypeRequest2RawRequest({
                                    offset: this.grid.GetOffset(),
                                    limit: this.grid.GetServerConfig().count,
                                    sorting: this.grid.GetSorting(),
                                    filtering: this.grid.GetFiltering(),
                                });
                                return this.ExecRequest(reqData, true);
                            };
                            MultiplePagesMode.prototype.ExecRequest = function (reqData, changeUrl) {
                                if (changeUrl === void 0) { changeUrl = true; }
                                var agGridApi = this.options.GetAgOptions().api;
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
                            MultiplePagesMode.prototype.handleResponse = function (reqData, changeUrl, cacheKey, cached, response) {
                                if (!cached) {
                                    response = this.helpers.RetypeRawServerResponse(response);
                                    this.cache.Add(cacheKey, response);
                                }
                                var agGridApi = this.options.GetAgOptions().api;
                                agGridApi.setRowData(response.data);
                                agGridApi.hideOverlay();
                                if (response.controls != null) {
                                    this.options.InitBottomControls();
                                    var elms = this.options.GetElements(), controls = response.controls;
                                    if (elms.countScalesControl != null && controls.countScales != null) {
                                        elms.countScalesControl.parentNode.replaceChild(this.helpers.GetHtmlElementFromString(controls.countScales), elms.countScalesControl);
                                    }
                                    if (elms.statusControl != null && controls.status != null) {
                                        elms.statusControl.parentNode.replaceChild(this.helpers.GetHtmlElementFromString(controls.status), elms.statusControl);
                                    }
                                    if (elms.pagingControl != null && controls.paging != null) {
                                        this.eventsManager.RemovePagingEvents();
                                        elms.pagingControl.parentNode.replaceChild(this.helpers.GetHtmlElementFromString(controls.paging), elms.pagingControl);
                                        this.options.InitBottomControls();
                                        this.eventsManager.AddPagingEvents();
                                    }
                                }
                                if (changeUrl)
                                    history.pushState(reqData, document.title, response.url);
                                // TODO: set up sorting and filtering from server
                                // TODO: change url
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