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
                        var _newTarget = this.constructor;
                        var _this = this;
                        this.totalCount = null;
                        this.offset = 0;
                        this.limit = 0;
                        this.gridPath = '';
                        //console.log("AgGrid.ctor - serverConfig", serverConfig);
                        //console.log("AgGrid.ctor - initialData", initialData);
                        this.Static = _newTarget;
                        this
                            .initSubClasses()
                            .initServerConfig(serverConfig)
                            .initTranslator();
                        this.optionsManager.InitElements();
                        this
                            .initPageModeSpecifics()
                            .initData(initialData);
                        document.addEventListener('DOMContentLoaded', function () {
                            _this
                                .initAgOptions()
                                .initGrid()
                                .initDataSource()
                                .initColumnsMenu();
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
                    AgGrid.prototype.SetOptionsManager = function (optionsManager) {
                        this.optionsManager = optionsManager;
                        return this;
                    };
                    AgGrid.prototype.GetOptionsManager = function () {
                        return this.optionsManager;
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
                    AgGrid.prototype.SetLimit = function (limit) {
                        this.limit = limit;
                        return this;
                    };
                    AgGrid.prototype.GetLimit = function () {
                        return this.limit;
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
                    AgGrid.prototype.SetFilterHeaders = function (filterHeaders) {
                        this.filterHeaders = filterHeaders;
                        return this;
                    };
                    AgGrid.prototype.GetFilterHeaders = function () {
                        return this.filterHeaders;
                    };
                    AgGrid.prototype.SetFilterMenus = function (filterMenus) {
                        this.filterMenus = filterMenus;
                        return this;
                    };
                    AgGrid.prototype.GetFilterMenus = function () {
                        return this.filterMenus;
                    };
                    AgGrid.prototype.SetColumnsVisibilityMenu = function (columnsVisibilityMenu) {
                        this.columnsVisibilityMenu = columnsVisibilityMenu;
                        return this;
                    };
                    AgGrid.prototype.GetColumnsVisibilityMenu = function () {
                        return this.columnsVisibilityMenu;
                    };
                    AgGrid.prototype.AddEventListener = function (eventName, handler) {
                        this.eventsManager.AddEventListener(eventName, handler);
                        return this;
                    };
                    AgGrid.prototype.RemoveEventListener = function (eventName, handler) {
                        this.eventsManager.RemoveEventListener(eventName, handler);
                        return this;
                    };
                    AgGrid.prototype.ExecChange = function (offset, sorting, filtering) {
                        this.eventsManager.HandleExecChange(offset, sorting, filtering);
                        return this;
                    };
                    AgGrid.prototype.initSubClasses = function () {
                        var _a, _b;
                        var extendedClasses = this.Static.Classes, origClasses = AgGrid.Classes, helpersType = (_b = (_a = extendedClasses === null || extendedClasses === void 0 ? void 0 : extendedClasses.Tools) === null || _a === void 0 ? void 0 : _a.Helpers) !== null && _b !== void 0 ? _b : origClasses.Tools.Helpers;
                        this.helpers = new helpersType(this);
                        var classes = this.helpers.MergeObjectsRecursively({}, origClasses, extendedClasses);
                        this.Static.Classes = classes;
                        this.optionsManager = new classes.Options.Manager(this);
                        return this;
                    };
                    AgGrid.prototype.initServerConfig = function (serverConfig) {
                        this.serverConfig = this.helpers.RetypeRawServerConfig(serverConfig);
                        this.pageMode = this.serverConfig.clientPageMode;
                        return this;
                    };
                    AgGrid.prototype.initTranslator = function () {
                        this.translator = new this.Static.Classes.Tools.Translator(this);
                        return this;
                    };
                    AgGrid.prototype.initPageModeSpecifics = function () {
                        if ((this.pageMode & DataGrids.AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_SINGLE) != 0) {
                            var emSinglePage = new this.Static.Classes.EventsManager.SinglePageMode(this);
                            this.eventsManager = emSinglePage;
                            emSinglePage
                                .AddUrlChangeEvent();
                            this.limit = this.serverConfig.clientRequestBlockSize;
                        }
                        else if ((this.pageMode & DataGrids.AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_MULTI) != 0) {
                            var emMultiplePages = new this.Static.Classes.EventsManager.MultiplePagesMode(this);
                            this.eventsManager = emMultiplePages;
                            emMultiplePages
                                .AddPagingEvents()
                                .AddUrlChangeEvent();
                            this.limit = this.serverConfig.count;
                        }
                        return this;
                    };
                    AgGrid.prototype.initData = function (initialData) {
                        this.initialData = this.helpers.RetypeRawServerResponse(initialData);
                        this.sorting = this.initialData.sorting;
                        this.filtering = this.initialData.filtering;
                        this.totalCount = this.initialData.totalCount;
                        this.offset = this.initialData.offset;
                        this.gridPath = this.initialData.path;
                        return this;
                    };
                    AgGrid.prototype.initAgOptions = function () {
                        this.optionsManager
                            .InitAgBases()
                            .InitAgColumns()
                            .InitAgPageModeSpecifics();
                        return this;
                    };
                    AgGrid.prototype.initGrid = function () {
                        var e_1, _a;
                        var gridOptions = this.optionsManager.GetAgOptions();
                        this.grid = new agGrid.Grid(this.optionsManager.GetElements().agGridElement, gridOptions);
                        this.optionsManager.GetColumnManager().SetAgColumnsConfigs(null); // frees memory
                        this.agGridApi = gridOptions.api;
                        this.agColumnApi = gridOptions.columnApi;
                        try {
                            for (var _b = __values(this.sortHeaders.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var sortHeader = _c.value;
                                sortHeader.OnReady();
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return this;
                    };
                    AgGrid.prototype.initDataSource = function () {
                        if ((this.pageMode & DataGrids.AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_SINGLE) != 0) {
                            this.dataSource = new this.Static.Classes.DataSources.SinglePageMode(this);
                            var gridOptions = this.optionsManager.GetAgOptions();
                            gridOptions.api.setDatasource(this.dataSource);
                        }
                        else if ((this.pageMode & DataGrids.AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_MULTI) != 0) {
                            this.dataSource = new this.Static.Classes.DataSources.MultiplePagesMode(this);
                        }
                        return this;
                    };
                    AgGrid.prototype.initColumnsMenu = function () {
                        this.columnsVisibilityMenu = new this.Static.Classes.Columns.VisibilityMenu(this);
                        return this;
                    };
                    AgGrid.Classes = {
                        Columns: {
                            FilterMenus: {
                                Date: DataGrids.AgGrids.Columns.FilterMenus.Date,
                                DateTime: DataGrids.AgGrids.Columns.FilterMenus.DateTime,
                                Time: DataGrids.AgGrids.Columns.FilterMenus.Time,
                                Int: DataGrids.AgGrids.Columns.FilterMenus.Int,
                                Float: DataGrids.AgGrids.Columns.FilterMenus.Float,
                                Money: DataGrids.AgGrids.Columns.FilterMenus.Money,
                            },
                            FilterHeader: DataGrids.AgGrids.Columns.FilterHeader,
                            FilterMenu: DataGrids.AgGrids.Columns.FilterMenu,
                            Manager: DataGrids.AgGrids.Columns.Manager,
                            SortHeader: DataGrids.AgGrids.Columns.SortHeader,
                            ViewHelper: DataGrids.AgGrids.Columns.ViewHelper,
                            VisibilityMenu: DataGrids.AgGrids.Columns.VisibilityMenu,
                        },
                        DataSources: {
                            MultiplePagesMode: DataGrids.AgGrids.DataSources.MultiplePagesMode,
                            SinglePageMode: DataGrids.AgGrids.DataSources.SinglePageMode,
                            Cache: DataGrids.AgGrids.DataSources.Cache,
                        },
                        EventsManager: {
                            MultiplePagesMode: DataGrids.AgGrids.EventsManagers.MultiplePagesMode,
                            SinglePageMode: DataGrids.AgGrids.EventsManagers.SinglePageMode,
                        },
                        Options: {
                            AgBases: DataGrids.AgGrids.Options.AgBases,
                            Manager: DataGrids.AgGrids.Options.Manager,
                        },
                        Tools: {
                            Helpers: DataGrids.AgGrids.Tools.Helpers,
                            Translator: DataGrids.AgGrids.Tools.Translator,
                        },
                    };
                    return AgGrid;
                }());
                DataGrids.AgGrid = AgGrid;
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=AgGrid.js.map