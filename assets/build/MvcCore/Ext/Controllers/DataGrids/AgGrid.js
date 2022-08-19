var MvcCore;
(function (MvcCore) {
    var Ext;
    (function (Ext) {
        var Controllers;
        (function (Controllers) {
            var DataGrids;
            (function (DataGrids) {
                var AgGrid = /** @class */ (function () {
                    function AgGrid(serverConfig, initialData) {
                        var _this = this;
                        this.totalCount = null;
                        console.log(serverConfig);
                        this
                            .initSubClasses()
                            .initServerConfig(serverConfig)
                            .initData(initialData);
                        document.addEventListener('DOMContentLoaded', function () {
                            _this
                                .initOptions()
                                .initGrid();
                        });
                    }
                    AgGrid.prototype.SetHelpers = function (helpers) {
                        this.helpers = helpers;
                        return this;
                    };
                    AgGrid.prototype.GetHelpers = function () {
                        return this.helpers;
                    };
                    AgGrid.prototype.SetEvents = function (events) {
                        this.events = events;
                        return this;
                    };
                    AgGrid.prototype.GetEvents = function () {
                        return this.events;
                    };
                    AgGrid.prototype.SetOptions = function (options) {
                        this.options = options;
                        return this;
                    };
                    AgGrid.prototype.GetOptions = function () {
                        return this.options;
                    };
                    AgGrid.prototype.SetServerConfig = function (serverConfig) {
                        this.serverConfig = serverConfig;
                        return this;
                    };
                    AgGrid.prototype.GetServerConfig = function () {
                        return this.serverConfig;
                    };
                    AgGrid.prototype.SetInitialData = function (initialData) {
                        this.initialData = initialData;
                        return this;
                    };
                    AgGrid.prototype.GetInitialData = function () {
                        return this.initialData;
                    };
                    AgGrid.prototype.SetGrid = function (grid) {
                        this.grid = grid;
                        return this;
                    };
                    AgGrid.prototype.GetGrid = function () {
                        return this.grid;
                    };
                    AgGrid.prototype.SetSorting = function (sorting) {
                        this.sorting = sorting;
                        return this;
                    };
                    AgGrid.prototype.GetSorting = function () {
                        return this.sorting;
                    };
                    AgGrid.prototype.SetFiltering = function (filtering) {
                        this.filtering = filtering;
                        return this;
                    };
                    AgGrid.prototype.GetFiltering = function () {
                        return this.filtering;
                    };
                    AgGrid.prototype.SetTotalCount = function (totalCount) {
                        this.totalCount = totalCount;
                        return this;
                    };
                    AgGrid.prototype.GetTotalCount = function () {
                        return this.totalCount;
                    };
                    AgGrid.prototype.initSubClasses = function () {
                        this.helpers = new DataGrids.AgGrids.Helpers(this);
                        this.events = new DataGrids.AgGrids.Events(this);
                        this.options = new DataGrids.AgGrids.Options(this);
                        return this;
                    };
                    AgGrid.prototype.initServerConfig = function (serverConfig) {
                        this.serverConfig = this.helpers.RetypeServerConfigObjects2Maps(serverConfig);
                        return this;
                    };
                    AgGrid.prototype.initData = function (initialData) {
                        this.initialData = this.helpers.RetypeServerResponseObjects2Maps(initialData);
                        this.sorting = this.initialData.sorting;
                        this.filtering = this.initialData.filtering;
                        this.totalCount = this.initialData.totalCount;
                        return this;
                    };
                    AgGrid.prototype.initOptions = function () {
                        this.options
                            .InitElements()
                            .InitAgBases()
                            .InitAgColumns()
                            .InitAgPageModeSpecifics();
                        return this;
                    };
                    AgGrid.prototype.initGrid = function () {
                        var gridOptions = this.options.GetAgOptions();
                        this.grid = new agGrid.Grid(this.options.GetElements().agGridElement, gridOptions);
                        if ((this.serverConfig.clientPageMode & DataGrids.AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_SINGLE) != 0) {
                            gridOptions.api.setDatasource(this.options.GetAgDataSource());
                        }
                        return this;
                    };
                    return AgGrid;
                }());
                DataGrids.AgGrid = AgGrid;
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=AgGrid.js.map