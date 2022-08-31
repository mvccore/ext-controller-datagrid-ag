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
                                _this.pageLoaded = false;
                                _this.initDataCache = _this.grid.GetServerConfig().clientMaxRowsInCache > 0;
                                _this.initPageReqDataAndCache();
                                _this.pageReqData = null;
                                return _this;
                            }
                            SinglePageMode.prototype.initPageReqDataAndCache = function () {
                                _super.prototype.initPageReqDataAndCache.call(this);
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
                            SinglePageMode.prototype.possibleToResolveByInitData = function (params, totalCount) {
                                var result = (this.initDataCache &&
                                    totalCount != null &&
                                    params.startRow >= this.initialData.offset &&
                                    (params.endRow <= this.initialData.offset + this.initialData.dataCount || totalCount < params.endRow));
                                if (!result)
                                    return false;
                                var reqData = this.helpers.RetypeRequest2RawRequest({
                                    offset: this.grid.GetOffset(),
                                    limit: this.grid.GetServerConfig().itemsPerPage,
                                    sorting: this.grid.GetSorting(),
                                    filtering: this.grid.GetFiltering(),
                                });
                                var cacheKey = this.cache.Key(reqData);
                                if (this.cache.Has(cacheKey))
                                    return true;
                                return false;
                            };
                            SinglePageMode.prototype.resolveByInitData = function (params, totalCount) {
                                //console.log("resolving by initial data");
                                params.successCallback(this.initialData.data.slice(params.startRow - this.initialData.offset, params.endRow - this.initialData.offset), totalCount);
                                if (this.pageLoaded)
                                    return;
                                this.pageLoaded = true;
                                var serverCfg = this.grid.GetServerConfig();
                                //console.log("page", serverCfg.page);
                                if (serverCfg.page > 1) {
                                    var scrollOffset = (serverCfg.page - 1) * serverCfg.clientRowBuffer;
                                    //console.log("scrolling top", scrollOffset);
                                    this.options.GetAgOptions().api.ensureIndexVisible(scrollOffset, "top");
                                }
                            };
                            SinglePageMode.prototype.resolveByAjaxRequest = function (params) {
                                var agGridApi = this.options.GetAgOptions().api;
                                agGridApi.showLoadingOverlay();
                                var _a = __read(this.getReqUrlMethodAndType(), 3), reqDataUrl = _a[0], reqMethod = _a[1], reqType = _a[2];
                                Ajax.load({
                                    url: reqDataUrl,
                                    method: reqMethod,
                                    data: this.helpers.RetypeRequest2RawRequest({
                                        offset: params.startRow,
                                        limit: params.endRow - params.startRow,
                                        sorting: this.grid.GetSorting(),
                                        filtering: this.grid.GetFiltering(),
                                    }),
                                    type: reqType,
                                    success: function (response) {
                                        agGridApi.hideOverlay();
                                        params.successCallback(response.data, response.totalCount);
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