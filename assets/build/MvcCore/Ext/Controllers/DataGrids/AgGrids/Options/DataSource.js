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
                    var Options;
                    (function (Options) {
                        var DataSource = /** @class */ (function () {
                            function DataSource(grid, events, helpers) {
                                var _newTarget = this.constructor;
                                this.Static = _newTarget;
                                this.grid = grid;
                                this.events = events;
                                this.helpers = helpers;
                            }
                            DataSource.prototype.Init = function () {
                                var _this = this;
                                var pageLoaded = false;
                                var firstData = this.grid.GetInitialData();
                                var dataSource = {
                                    rowCount: undefined,
                                    getRows: function (params) {
                                        debugger;
                                        console.log('asking for ' + params.startRow + ' to ' + params.endRow + ' by collection from ' + firstData.offset + ' to ' + (firstData.offset + firstData.dataCount));
                                        var totalCount = _this.grid.GetTotalCount();
                                        if (totalCount != null &&
                                            params.startRow >= firstData.offset &&
                                            (params.endRow <= firstData.offset + firstData.dataCount || totalCount < params.endRow)) {
                                            console.log("resolving by initial data");
                                            params.successCallback(firstData.data.slice(params.startRow - firstData.offset, params.endRow - firstData.offset), totalCount);
                                            if (!pageLoaded) {
                                                pageLoaded = true;
                                                var serverCfg = _this.grid.GetServerConfig();
                                                console.log("page", serverCfg.page);
                                                if (serverCfg.page > 1) {
                                                    var scrollOffset = (serverCfg.page - 1) * serverCfg.clientRowBuffer;
                                                    console.log("scrolling top", scrollOffset);
                                                    _this.grid.GetGridOptions().api.ensureIndexVisible(scrollOffset, "top");
                                                }
                                            }
                                            return;
                                        }
                                        console.log("resolving by ajax request");
                                        var startTime = +new Date;
                                        Ajax.get(_this.grid.GetServerConfig().dataUrl, _this.helpers.RetypeServerRequestMaps2Objects({
                                            offset: params.startRow,
                                            limit: params.endRow - params.startRow,
                                            sorting: _this.grid.GetSorting(),
                                            filtering: _this.grid.GetFiltering(),
                                        }), function (response) {
                                            var responseTime = +new Date;
                                            params.successCallback(response.data, response.totalCount);
                                            /*var renderedTime = +new Date;
                                            console.log(
                                                responseTime - startTime,
                                                renderedTime - responseTime,
                                                renderedTime - startTime
                                            );*/
                                        }, 'jsonp');
                                    }
                                };
                                console.log(firstData);
                                this.grid.GetGridOptions().api.setDatasource(dataSource);
                                this.grid.SetGridDataSource(dataSource);
                            };
                            DataSource.prototype.isTouchDevice = function () {
                                return (('ontouchstart' in window) ||
                                    (navigator.maxTouchPoints > 0) ||
                                    ///@ts-ignore
                                    (navigator['msMaxTouchPoints'] > 0));
                            };
                            return DataSource;
                        }());
                        Options.DataSource = DataSource;
                    })(Options = AgGrids.Options || (AgGrids.Options = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=DataSource.js.map