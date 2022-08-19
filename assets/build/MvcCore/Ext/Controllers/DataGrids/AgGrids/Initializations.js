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
                    var Initializations = /** @class */ (function () {
                        function Initializations(grid, events, helpers) {
                            var _newTarget = this.constructor;
                            this.Static = _newTarget;
                            this.grid = grid;
                            this.events = events;
                            this.helpers = helpers;
                            document.addEventListener('DOMContentLoaded', this.init.bind(this));
                        }
                        Initializations.prototype.init = function () {
                            var elmSelector = this.grid.GetServerConfig().elementSelector, gridElement = document.querySelector(elmSelector);
                            if (gridElement == null)
                                throw new Error("Element with selector '" + elmSelector + "' not found.");
                            this.grid.SetGridElement(gridElement);
                            this.initGridColumns();
                            this.initGridOptions();
                            this.initGrid();
                            this.initGridDataSource();
                        };
                        Initializations.prototype.initGridColumns = function () {
                            var serverColumns = this.grid.GetServerConfig().columns;
                            var gridColumns = [];
                            var gridColumn;
                            var serverColumnCfg;
                            for (var columnUrlName in serverColumns) {
                                serverColumnCfg = serverColumns[columnUrlName];
                                if (serverColumnCfg.disabled === true)
                                    continue;
                                gridColumn = this.initGridColumn(columnUrlName, serverColumnCfg);
                                gridColumns.push(gridColumn);
                            }
                            this.grid.SetGridColumns(gridColumns);
                        };
                        Initializations.prototype.initGridColumn = function (columnUrlName, serverColumnCfg) {
                            var column = {
                                colId: columnUrlName,
                                field: serverColumnCfg.propName,
                                headerName: serverColumnCfg.headingName,
                                tooltipField: serverColumnCfg.propName,
                                resizable: true
                            };
                            var serverType = serverColumnCfg.types[0];
                            if (this.Static.types.has(serverType))
                                column.type = this.Static.types.get(serverType);
                            column.filter = !(serverColumnCfg.filter === false);
                            column.sortable = !(serverColumnCfg.sort === false);
                            if (serverColumnCfg.width != null && typeof (serverColumnCfg.width) == 'number')
                                column.width = serverColumnCfg.width;
                            if (serverColumnCfg.minWidth != null && typeof (serverColumnCfg.minWidth) == 'number')
                                column.minWidth = serverColumnCfg.minWidth;
                            if (serverColumnCfg.maxWidth != null && typeof (serverColumnCfg.maxWidth) == 'number')
                                column.maxWidth = serverColumnCfg.maxWidth;
                            return column;
                        };
                        Initializations.prototype.initGridOptions = function () {
                            var gridOptions = {
                                columnDefs: this.grid.GetGridColumns(),
                                defaultColDef: {
                                    flex: 1,
                                    //minWidth: 200,
                                    filter: true,
                                    resizable: true,
                                    sortable: true,
                                    floatingFilter: true,
                                    suppressMenu: true,
                                    editable: true,
                                    tooltipComponent: AgGrids.ToolTip
                                },
                                tooltipShowDelay: 0,
                                tooltipHideDelay: 2000,
                                animateRows: false,
                                alwaysShowVerticalScroll: true,
                                suppressColumnVirtualisation: true,
                                // suppressRowVirtualisation: true, // this will disable dynamic loading and renders all rows
                                suppressAnimationFrame: true,
                                // server inifinite loading:
                                rowBuffer: this.grid.GetServerConfig().clientRowBuffer,
                                // tell grid we want virtual row model type
                                rowModelType: 'infinite',
                                // how big each page in our page cache will be, default is 100
                                cacheBlockSize: this.grid.GetServerConfig().clientRowBuffer,
                                // how many extra blank rows to display to the user at the end of the dataset,
                                // which sets the vertical scroll and then allows the grid to request viewing more rows of data.
                                // default is 1, ie show 1 row.
                                cacheOverflowSize: 1,
                                // how many server side requests to send at a time. if user is scrolling lots, then the requests
                                // are throttled down
                                maxConcurrentDatasourceRequests: 2,
                                // how many rows to initially show in the grid. having 1 shows a blank row, so it looks like
                                // the grid is loading from the users perspective (as we have a spinner in the first col)
                                infiniteInitialRowCount: Math.round(this.grid.GetServerConfig().clientRowBuffer / 2),
                                // how many pages to store in cache. default is undefined, which allows an infinite sized cache,
                                // pages are never purged. this should be set for large data to stop your browser from getting
                                // full of data
                                maxBlocksInCache: Math.round(10000 / this.grid.GetServerConfig().clientRowBuffer),
                                debounceVerticalScrollbar: true,
                            };
                            this.initGridOptionsRowSelection(gridOptions);
                            this.initGridOptionsEvents(gridOptions);
                            this.grid.SetGridOptions(gridOptions);
                        };
                        Initializations.prototype.initGridOptionsRowSelection = function (gridOptions) {
                            var rowSel = this.grid.GetServerConfig().rowSelection;
                            var rowSelectionNone = (rowSel & AgGrids.Enums.RowSelection.ROW_SELECTION_NONE) != 0;
                            if (rowSelectionNone ||
                                (rowSel & AgGrids.Enums.RowSelection.ROW_SELECTION_SINGLE) != 0) {
                                gridOptions.rowSelection = 'single';
                                if (rowSelectionNone)
                                    gridOptions.suppressRowClickSelection = true;
                            }
                            else if ((rowSel & AgGrids.Enums.RowSelection.ROW_SELECTION_MULTIPLE) != 0) {
                                gridOptions.rowSelection = 'multiple';
                                if (this.isTouchDevice())
                                    gridOptions.rowMultiSelectWithClick = true;
                            }
                            if ((rowSel & AgGrids.Enums.RowSelection.ROW_SELECTION_NOT_DESELECT) != 0)
                                gridOptions.suppressRowDeselection = true;
                        };
                        Initializations.prototype.initGridOptionsEvents = function (gridOptions) {
                            gridOptions.onColumnResized = this.events.HandleColumnResized.bind(this.events);
                            gridOptions.onColumnMoved = this.events.HandleColumnMoved.bind(this.events);
                            gridOptions.onFilterChanged = this.events.HandleFilterChanged.bind(this.events);
                            gridOptions.onSortChanged = this.events.HandleSortChanged.bind(this.events);
                            /*gridOptions.onFirstDataRendered = (params: agGrid.FirstDataRenderedEvent) => {
                                params.api.sizeColumnsToFit();
                            },*/
                            gridOptions.onViewportChanged = this.events.HandleGridSizeChanged.bind(this.events);
                            /*gridOptions.onGridReady = (params: agGrid.GridReadyEvent): void => {
                                params.api.sizeColumnsToFit();
                            },*/
                            gridOptions.onGridSizeChanged = this.events.HandleGridSizeChanged.bind(this.events);
                        };
                        Initializations.prototype.initGrid = function () {
                            var grid = new agGrid.Grid(this.grid.GetGridElement(), this.grid.GetGridOptions());
                            this.grid.SetGrid(grid);
                        };
                        Initializations.prototype.initGridDataSource = function () {
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
                        Initializations.prototype.isTouchDevice = function () {
                            return (('ontouchstart' in window) ||
                                (navigator.maxTouchPoints > 0) ||
                                ///@ts-ignore
                                (navigator['msMaxTouchPoints'] > 0));
                        };
                        Initializations.types = new Map([
                            ["string", "textColumn"],
                            ["int", "numericColumn"],
                            ["float", "numericColumn"],
                            ["\\Date", "dateColumn"],
                            ["\\DateTime", "dateColumn"],
                        ]);
                        return Initializations;
                    }());
                    AgGrids.Initializations = Initializations;
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Initializations.js.map