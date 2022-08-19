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
                    var SubOptions;
                    (function (SubOptions) {
                        var DataSource = /** @class */ (function () {
                            function DataSource(grid) {
                                var _newTarget = this.constructor;
                                /** If you know up front how many rows are in the dataset, set it here. Otherwise leave blank. */
                                this.rowCount = undefined;
                                this.Static = _newTarget;
                                this.grid = grid;
                                this.options = grid.GetOptions();
                                this.events = grid.GetEvents();
                                this.helpers = grid.GetHelpers();
                                this.initialData = grid.GetInitialData();
                                this.pageLoaded = false;
                            }
                            /** Callback the grid calls that you implement to fetch rows from the server. */
                            DataSource.prototype.getRows = function (params) {
                                // TODO: refactoring!
                                console.log('asking for ' + params.startRow + ' to ' + params.endRow + ' by collection from '
                                    + this.initialData.offset + ' to ' + (this.initialData.offset + this.initialData.dataCount));
                                var totalCount = this.grid.GetTotalCount();
                                if (totalCount != null &&
                                    params.startRow >= this.initialData.offset &&
                                    (params.endRow <= this.initialData.offset + this.initialData.dataCount || totalCount < params.endRow)) {
                                    console.log("resolving by initial data");
                                    params.successCallback(this.initialData.data.slice(params.startRow - this.initialData.offset, params.endRow - this.initialData.offset), totalCount);
                                    if (!this.pageLoaded) {
                                        this.pageLoaded = true;
                                        var serverCfg = this.grid.GetServerConfig();
                                        console.log("page", serverCfg.page);
                                        if (serverCfg.page > 1) {
                                            var scrollOffset = (serverCfg.page - 1) * serverCfg.clientRowBuffer;
                                            console.log("scrolling top", scrollOffset);
                                            this.options.GetAgOptions().api.ensureIndexVisible(scrollOffset, "top");
                                        }
                                    }
                                    return;
                                }
                                console.log("resolving by ajax request");
                                var startTime = +new Date;
                                Ajax.get(this.grid.GetServerConfig().dataUrl, this.helpers.RetypeServerRequestMaps2Objects({
                                    offset: params.startRow,
                                    limit: params.endRow - params.startRow,
                                    sorting: this.grid.GetSorting(),
                                    filtering: this.grid.GetFiltering(),
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
                            };
                            /** Optional destroy method, if your datasource has state it needs to clean up. */
                            DataSource.prototype.destroy = function () {
                            };
                            return DataSource;
                        }());
                        SubOptions.DataSource = DataSource;
                    })(SubOptions = AgGrids.SubOptions || (AgGrids.SubOptions = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=DataSource.js.map