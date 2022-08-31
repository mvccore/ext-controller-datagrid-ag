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
                            this.grid = grid;
                            this.options = grid.GetOptions();
                            this.eventsManager = grid.GetEvents();
                            this.helpers = grid.GetHelpers();
                            this.initialData = grid.GetInitialData();
                        }
                        DataSource.prototype.initPageReqDataAndCache = function () {
                            this.cache = new AgGrids.DataSources.MultiplePagesModes.Cache(this.grid);
                            this.pageReqData = this.helpers.RetypeRequest2RawRequest({
                                offset: this.grid.GetOffset(),
                                limit: this.grid.GetServerConfig().itemsPerPage,
                                sorting: this.grid.GetSorting(),
                                filtering: this.grid.GetFiltering(),
                            });
                        };
                        DataSource.prototype.getReqUrlMethodAndType = function () {
                            var serverCfg = this.grid.GetServerConfig(), cfgReqMethod = serverCfg.dataRequestMethod, dataUrl = serverCfg.dataUrl, reqMethod = 'GET', reqType = 'json';
                            if ((cfgReqMethod & AgGrids.Enums.AjaxDataRequestMethod.AJAX_DATA_REQUEST_METHOD_POST) != 0) {
                                reqMethod = 'POST';
                            }
                            else if ((cfgReqMethod & AgGrids.Enums.AjaxDataRequestMethod.AJAX_DATA_REQUEST_METHOD_JSONP) != 0) {
                                reqType = 'jsonp';
                            }
                            return [dataUrl, reqMethod, reqType];
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