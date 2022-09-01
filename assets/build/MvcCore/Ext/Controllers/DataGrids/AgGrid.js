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
                        this.offset = 0;
                        this.gridPath = '';
                        console.log("AgGrid.ctor - serverConfig", serverConfig);
                        console.log("AgGrid.ctor - initialData", initialData);
                        this
                            .initSubClasses()
                            .initServerConfig(serverConfig)
                            .initTranslator();
                        this.options.InitElements();
                        this
                            .initPageModeSpecifics()
                            .initData(initialData);
                        document.addEventListener('DOMContentLoaded', function () {
                            _this
                                .initAgOptions()
                                .initGrid()
                                .initDataSource();
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
                        this.eventsManager = events;
                        return this;
                    };
                    AgGrid.prototype.GetEvents = function () {
                        return this.eventsManager;
                    };
                    AgGrid.prototype.SetTranslator = function (translator) {
                        this.translator = translator;
                        return this;
                    };
                    AgGrid.prototype.GetTranslator = function () {
                        return this.translator;
                    };
                    AgGrid.prototype.SetOptions = function (options) {
                        this.options = options;
                        return this;
                    };
                    AgGrid.prototype.GetOptions = function () {
                        return this.options;
                    };
                    AgGrid.prototype.SetDataSource = function (dataSource) {
                        this.dataSource = dataSource;
                        return this;
                    };
                    AgGrid.prototype.GetDataSource = function () {
                        return this.dataSource;
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
                    AgGrid.prototype.SetGridApi = function (agGridApi) {
                        this.agGridApi = agGridApi;
                        return this;
                    };
                    AgGrid.prototype.GetGridApi = function () {
                        return this.agGridApi;
                    };
                    AgGrid.prototype.SetGridColumnApi = function (agColumnApi) {
                        this.agColumnApi = agColumnApi;
                        return this;
                    };
                    AgGrid.prototype.GetGridColumnApi = function () {
                        return this.agColumnApi;
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
                    AgGrid.prototype.SetPageMode = function (pageMode) {
                        this.pageMode = pageMode;
                        return this;
                    };
                    AgGrid.prototype.GetPageMode = function () {
                        return this.pageMode;
                    };
                    AgGrid.prototype.SetOffset = function (offset) {
                        this.offset = offset;
                        return this;
                    };
                    AgGrid.prototype.GetOffset = function () {
                        return this.offset;
                    };
                    AgGrid.prototype.SetGridPath = function (gridPath) {
                        this.gridPath = gridPath;
                        return this;
                    };
                    AgGrid.prototype.GetGridPath = function () {
                        return this.gridPath;
                    };
                    AgGrid.prototype.SetSortHeaders = function (sortHeaders) {
                        this.sortHeaders = sortHeaders;
                        return this;
                    };
                    AgGrid.prototype.GetSortHeaders = function () {
                        return this.sortHeaders;
                    };
                    AgGrid.prototype.SetFilterInputs = function (filterInputs) {
                        this.filterInputs = filterInputs;
                        return this;
                    };
                    AgGrid.prototype.GetFilterInputs = function () {
                        return this.filterInputs;
                    };
                    AgGrid.prototype.initSubClasses = function () {
                        this.helpers = new DataGrids.AgGrids.Helpers(this);
                        this.options = new DataGrids.AgGrids.Options(this);
                        return this;
                    };
                    AgGrid.prototype.initPageModeSpecifics = function () {
                        if ((this.pageMode & DataGrids.AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_SINGLE) != 0) {
                            var emSinglePage = new DataGrids.AgGrids.EventsManagers.SinglePageMode(this);
                            this.eventsManager = emSinglePage;
                            emSinglePage
                                .AddWindowPopStateChangeEvent();
                        }
                        else if ((this.pageMode & DataGrids.AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_MULTI) != 0) {
                            var emMultiplePages = new DataGrids.AgGrids.EventsManagers.MultiplePagesMode(this);
                            this.eventsManager = emMultiplePages;
                            emMultiplePages
                                .AddPagingEvents()
                                .AddWindowPopStateChangeEvent();
                        }
                        return this;
                    };
                    AgGrid.prototype.initServerConfig = function (serverConfig) {
                        this.serverConfig = this.helpers.RetypeRawServerConfig(serverConfig);
                        this.pageMode = this.serverConfig.clientPageMode;
                        return this;
                    };
                    AgGrid.prototype.initTranslator = function () {
                        this.translator = new DataGrids.AgGrids.Translator(this);
                        return this;
                    };
                    AgGrid.prototype.initData = function (initialData) {
                        this.initialData = DataGrids.AgGrids.DataSource.RetypeRawServerResponse(initialData);
                        this.sorting = this.initialData.sorting;
                        this.filtering = this.initialData.filtering;
                        this.totalCount = this.initialData.totalCount;
                        this.offset = this.initialData.offset;
                        this.gridPath = this.initialData.path;
                        return this;
                    };
                    AgGrid.prototype.initAgOptions = function () {
                        this.options
                            .InitAgBases()
                            .InitAgColumns()
                            .InitAgPageModeSpecifics();
                        return this;
                    };
                    AgGrid.prototype.initGrid = function () {
                        var gridOptions = this.options.GetAgOptions();
                        this.grid = new agGrid.Grid(this.options.GetElements().agGridElement, gridOptions);
                        this.options.GetColumnManager().SetAgColumnsConfigs(null); // frees memory
                        this.agGridApi = gridOptions.api;
                        this.agColumnApi = gridOptions.columnApi;
                        return this;
                    };
                    AgGrid.prototype.initDataSource = function () {
                        if ((this.pageMode & DataGrids.AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_SINGLE) != 0) {
                            this.dataSource = new DataGrids.AgGrids.DataSources.SinglePageMode(this);
                            var gridOptions = this.options.GetAgOptions();
                            gridOptions.api.setDatasource(this.dataSource);
                        }
                        else if ((this.pageMode & DataGrids.AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_MULTI) != 0) {
                            this.dataSource = new DataGrids.AgGrids.DataSources.MultiplePagesMode(this);
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