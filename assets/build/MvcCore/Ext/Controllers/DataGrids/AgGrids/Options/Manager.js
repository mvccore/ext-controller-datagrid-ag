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
                var AgGrids;
                (function (AgGrids) {
                    var Options;
                    (function (Options) {
                        var Manager = /** @class */ (function () {
                            function Manager(grid) {
                                var _newTarget = this.constructor;
                                this.Static = _newTarget;
                                this.grid = grid;
                                this.eventsManager = grid.GetEvents();
                                this.helpers = grid.GetHelpers();
                            }
                            Manager.prototype.SetElements = function (elements) {
                                this.elements = elements;
                                return this;
                            };
                            Manager.prototype.GetElements = function () {
                                return this.elements;
                            };
                            Manager.prototype.SetAgBases = function (agBases) {
                                this.agBases = agBases;
                                return this;
                            };
                            Manager.prototype.GetAgBases = function () {
                                return this.agBases;
                            };
                            Manager.prototype.SetAgOptions = function (options) {
                                this.agOptions = options;
                                return this;
                            };
                            Manager.prototype.GetAgOptions = function () {
                                return this.agOptions;
                            };
                            Manager.prototype.SetColumnManager = function (columnManager) {
                                this.columnManager = columnManager;
                                return this;
                            };
                            Manager.prototype.GetColumnManager = function () {
                                return this.columnManager;
                            };
                            Manager.prototype.InitElements = function () {
                                var contElementSelector = this.grid.GetServerConfig().contElementSelector, contElement = document.querySelector(contElementSelector);
                                if (contElement == null)
                                    throw new Error("Element with selector '" + contElementSelector + "' not found.");
                                var sels = this.Static.SELECTORS, agGridElement = contElement.querySelector(sels.AG_GRID_SEL), bottomControlsElement = contElement.querySelector(sels.BOTTOM_CONTROLS.CONT_SEL);
                                this.elements = {
                                    contElement: contElement,
                                    agGridElement: agGridElement,
                                    bottomControlsElement: bottomControlsElement,
                                    countScalesControl: null,
                                    pagingControl: null,
                                    statusControl: null,
                                    pagingAnchors: [],
                                    pagingAnchorsMaps: new Map(),
                                    countScalesAnchors: []
                                };
                                this.InitBottomControls();
                                return this;
                            };
                            Manager.prototype.InitBottomControls = function () {
                                var bcSels = this.Static.SELECTORS.BOTTOM_CONTROLS, bottomControlsElement = this.elements.bottomControlsElement;
                                if (bottomControlsElement == null)
                                    return this;
                                this.elements.statusControl = bottomControlsElement.querySelector(bcSels.STATUS_SEL);
                                this
                                    .InitBottomControlsCountScales()
                                    .InitBottomControlsPaging();
                                return this;
                            };
                            Manager.prototype.InitBottomControlsCountScales = function () {
                                var bcSels = this.Static.SELECTORS.BOTTOM_CONTROLS, bottomControlsElement = this.elements.bottomControlsElement;
                                if (bottomControlsElement == null)
                                    return this;
                                this.elements.countScalesControl = bottomControlsElement.querySelector(bcSels.COUNT_SCALES_SEL);
                                if (this.elements.countScalesControl != null) {
                                    var countScalesAnchors = this.elements.countScalesControl.querySelectorAll(this.Static.SELECTORS.BOTTOM_CONTROLS.COUNT_SCALES_ANCHOR_SEL);
                                    this.elements.countScalesAnchors = (countScalesAnchors.length > 0)
                                        ? [].slice.apply(countScalesAnchors)
                                        : [];
                                }
                                return this;
                            };
                            Manager.prototype.InitBottomControlsPaging = function () {
                                var e_1, _a;
                                var bcSels = this.Static.SELECTORS.BOTTOM_CONTROLS, bottomControlsElement = this.elements.bottomControlsElement;
                                if (bottomControlsElement == null)
                                    return this;
                                this.elements.pagingControl = bottomControlsElement.querySelector(bcSels.PAGING_SEL);
                                if (this.elements.pagingControl != null) {
                                    var paginationAnchors = this.elements.pagingControl.querySelectorAll(this.Static.SELECTORS.BOTTOM_CONTROLS.PAGING_ANCHOR_SEL);
                                    if (paginationAnchors.length > 0) {
                                        this.elements.pagingAnchors = [].slice.apply(paginationAnchors);
                                        var paginationAnchorsMaps = new Map(), pagingAnchorOffset;
                                        try {
                                            for (var paginationAnchors_1 = __values(paginationAnchors), paginationAnchors_1_1 = paginationAnchors_1.next(); !paginationAnchors_1_1.done; paginationAnchors_1_1 = paginationAnchors_1.next()) {
                                                var paginationAnchor = paginationAnchors_1_1.value;
                                                pagingAnchorOffset = parseInt(paginationAnchor.dataset.offset, 10);
                                                if (paginationAnchorsMaps.has(pagingAnchorOffset)) {
                                                    paginationAnchorsMaps.get(pagingAnchorOffset).push(paginationAnchor);
                                                }
                                                else {
                                                    paginationAnchorsMaps.set(pagingAnchorOffset, [paginationAnchor]);
                                                }
                                            }
                                        }
                                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                        finally {
                                            try {
                                                if (paginationAnchors_1_1 && !paginationAnchors_1_1.done && (_a = paginationAnchors_1.return)) _a.call(paginationAnchors_1);
                                            }
                                            finally { if (e_1) throw e_1.error; }
                                        }
                                        this.elements.pagingAnchorsMaps = paginationAnchorsMaps;
                                    }
                                }
                                return this;
                            };
                            Manager.prototype.InitAgBases = function () {
                                this.agBases = new this.grid.Static.Classes.Options.AgBases(this.grid);
                                this.agBases.Init();
                                this.agOptions = this.agBases.GetAgOptions();
                                return this;
                            };
                            Manager.prototype.InitAgColumns = function () {
                                this.columnManager = new this.grid.Static.Classes.Columns.Manager(this.grid);
                                this.columnManager.Init();
                                this.agOptions.columnDefs = Array.from(this.columnManager.GetAgColumnsConfigs().values());
                                this.agOptions.defaultColDef = this.columnManager.GetAgColumnDefaults();
                                return this;
                            };
                            Manager.prototype.InitAgPageModeSpecifics = function () {
                                var clientPageMode = this.grid.GetServerConfig().clientPageMode;
                                if ((clientPageMode & AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_SINGLE) != 0) {
                                    this.initSinglePageSpecifics();
                                }
                                else if ((clientPageMode & AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_MULTI) != 0) {
                                    this.initMultiplePagesSpecifics();
                                }
                                return this;
                            };
                            Manager.prototype.initSinglePageSpecifics = function () {
                                var serverConfig = this.grid.GetServerConfig();
                                // server inifinite loading:
                                this.agOptions.rowBuffer = serverConfig.clientRowBuffer;
                                // tell grid we want virtual row model type
                                this.agOptions.rowModelType = 'infinite';
                                // how big each page in our page cache will be, default is 100
                                this.agOptions.cacheBlockSize = serverConfig.clientRequestBlockSize;
                                // how many extra blank rows to display to the user at the end of the dataset,
                                // which sets the vertical scroll and then allows the grid to request viewing more rows of data.
                                // default is 1, ie show 1 row.
                                this.agOptions.cacheOverflowSize = 1;
                                // how many server side requests to send at a time. if user is scrolling lots, then the requests
                                // are throttled down
                                this.agOptions.maxConcurrentDatasourceRequests = 2;
                                // how many rows to initially show in the grid. having 1 shows a blank row, so it looks like
                                // the grid is loading from the users perspective (as we have a spinner in the first col)
                                this.agOptions.infiniteInitialRowCount = Math.round(serverConfig.clientRowBuffer / 2);
                                // how many pages to store in cache. default is undefined, which allows an infinite sized cache,
                                // pages are never purged. this should be set for large data to stop your browser from getting
                                // full of data
                                if (serverConfig.clientMaxRowsInCache > 0) {
                                    this.agOptions.maxBlocksInCache = Math.round(serverConfig.clientMaxRowsInCache / serverConfig.clientRequestBlockSize);
                                }
                                else {
                                    this.agOptions.maxBlocksInCache = 1;
                                }
                                return this;
                            };
                            Manager.prototype.initMultiplePagesSpecifics = function () {
                                var serverConfig = this.grid.GetServerConfig(), initialData = this.grid.GetInitialData();
                                this.agOptions.rowModelType = 'clientSide';
                                this.agOptions.rowData = initialData.data;
                                var spm = this.Static.SINGLE_PAGE_MODE;
                                //console.log(initialData);
                                if (initialData.dataCount >= serverConfig.clientRowBufferMax) {
                                    // large single page - enable row buffer with 10 by default:
                                    this.agOptions.rowBuffer = serverConfig.clientRowBuffer;
                                    this.agOptions.suppressRowVirtualisation = false;
                                }
                                else {
                                    // small single page - fill row buffer with all rows:
                                    this.agOptions.rowBuffer = initialData.dataCount;
                                    if (initialData.dataCount > spm.MAX_ROWS_2_SUPPRESS_ROW_VIRTUALIZATION) {
                                        // disable row virtualization if necessary:
                                        this.agOptions.suppressRowVirtualisation = true;
                                    }
                                }
                                return this;
                            };
                            Manager.SELECTORS = {
                                AG_GRID_SEL: 'div.grid-table-component',
                                BOTTOM_CONTROLS: {
                                    CONT_SEL: '.grid-controls-bottom',
                                    COUNT_SCALES_SEL: '.grid-control-count-scales',
                                    STATUS_SEL: '.grid-control-status',
                                    PAGING_SEL: '.grid-control-paging',
                                    COUNT_SCALES_ANCHOR_SEL: '.grid-count a',
                                    PAGING_ANCHOR_SEL: '.grid-page a',
                                }
                            };
                            Manager.SYSTEM_LOCALE_SEPARATOR = '-';
                            Manager.SINGLE_PAGE_MODE = {
                                MAX_ROWS_2_SUPPRESS_ROW_VIRTUALIZATION: 500
                            };
                            return Manager;
                        }());
                        Options.Manager = Manager;
                    })(Options = AgGrids.Options || (AgGrids.Options = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Manager.js.map