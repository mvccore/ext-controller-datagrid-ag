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
                    var Options = /** @class */ (function () {
                        function Options(grid) {
                            var _newTarget = this.constructor;
                            this.Static = _newTarget;
                            this.grid = grid;
                            this.eventsManager = grid.GetEvents();
                            this.helpers = grid.GetHelpers();
                        }
                        Options.prototype.SetElements = function (elements) {
                            this.elements = elements;
                            return this;
                        };
                        Options.prototype.GetElements = function () {
                            return this.elements;
                        };
                        Options.prototype.SetAgOptions = function (options) {
                            this.agOptions = options;
                            return this;
                        };
                        Options.prototype.GetAgOptions = function () {
                            return this.agOptions;
                        };
                        Options.prototype.SetAgColumns = function (gridColumns) {
                            this.agColumns = gridColumns;
                            return this;
                        };
                        Options.prototype.GetAgColumns = function () {
                            return this.agColumns;
                        };
                        Options.prototype.InitElements = function () {
                            var contElementSelector = this.grid.GetServerConfig().contElementSelector, contElement = document.querySelector(contElementSelector);
                            if (contElement == null)
                                throw new Error("Element with selector '" + contElementSelector + "' not found.");
                            var sels = this.Static.SELECTORS, bcSels = sels.BOTTOM_CONTROLS, agGridElement = contElement.querySelector(sels.AG_GRID_SEL), bottomControlsElement = contElement.querySelector(sels.BOTTOM_CONTROLS.CONT_SEL);
                            this.elements = {
                                contElement: contElement,
                                agGridElement: agGridElement,
                                bottomControlsElement: bottomControlsElement,
                                countScalesControl: null,
                                pagingControl: null,
                                statusControl: null,
                                pagingAnchors: []
                            };
                            if (bottomControlsElement != null)
                                this.InitBottomControls();
                            return this;
                        };
                        Options.prototype.InitBottomControls = function () {
                            var bcSels = this.Static.SELECTORS.BOTTOM_CONTROLS, bottomControlsElement = this.elements.bottomControlsElement;
                            this.elements.countScalesControl = bottomControlsElement.querySelector(bcSels.COUNT_SCALES_SEL);
                            this.elements.pagingControl = bottomControlsElement.querySelector(bcSels.PAGING_SEL);
                            this.elements.statusControl = bottomControlsElement.querySelector(bcSels.STATUS_SEL);
                            if (this.elements.pagingControl != null) {
                                var paginationAnchors = this.elements.pagingControl.querySelectorAll(this.Static.SELECTORS.BOTTOM_CONTROLS.PAGING_ANCHOR_SEL);
                                this.elements.pagingAnchors = (paginationAnchors.length > 0)
                                    ? [].slice.apply(paginationAnchors)
                                    : [];
                            }
                            return this;
                        };
                        Options.prototype.InitAgBases = function () {
                            this.bases = new AgGrids.AgOptions.Bases(this.grid);
                            this.bases.Init();
                            this.agOptions = this.bases.GetAgOptions();
                            return this;
                        };
                        Options.prototype.InitAgColumns = function () {
                            this.columns = new AgGrids.AgOptions.Columns(this.grid);
                            this.columns.Init();
                            this.agOptions.columnDefs = this.columns.GetAgColumns();
                            this.agOptions.defaultColDef = this.columns.GetDefaultColDef();
                            return this;
                        };
                        Options.prototype.InitAgPageModeSpecifics = function () {
                            var clientPageMode = this.grid.GetServerConfig().clientPageMode;
                            if ((clientPageMode & AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_SINGLE) != 0) {
                                this.initSinglePageSpecifics();
                            }
                            else if ((clientPageMode & AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_MULTI) != 0) {
                                this.initMultiplePagesSpecifics();
                            }
                            return this;
                        };
                        Options.prototype.initSinglePageSpecifics = function () {
                            var serverConfig = this.grid.GetServerConfig();
                            // server inifinite loading:
                            this.agOptions.rowBuffer = serverConfig.clientRowBuffer;
                            // tell grid we want virtual row model type
                            this.agOptions.rowModelType = 'infinite';
                            // how big each page in our page cache will be, default is 100
                            this.agOptions.cacheBlockSize = serverConfig.itemsPerPage;
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
                            this.agOptions.maxBlocksInCache = Math.round(10000 / serverConfig.clientRowBuffer);
                            return this;
                        };
                        Options.prototype.initMultiplePagesSpecifics = function () {
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
                        Options.SELECTORS = {
                            AG_GRID_SEL: 'div.grid-table-component',
                            BOTTOM_CONTROLS: {
                                CONT_SEL: '.grid-controls-bottom',
                                COUNT_SCALES_SEL: '.grid-control-count-scales',
                                STATUS_SEL: '.grid-control-status',
                                PAGING_SEL: '.grid-control-paging',
                                PAGING_ANCHOR_SEL: '.grid-page a',
                            }
                        };
                        Options.SINGLE_PAGE_MODE = {
                            MAX_ROWS_2_SUPPRESS_ROW_VIRTUALIZATION: 500
                        };
                        return Options;
                    }());
                    AgGrids.Options = Options;
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Options.js.map