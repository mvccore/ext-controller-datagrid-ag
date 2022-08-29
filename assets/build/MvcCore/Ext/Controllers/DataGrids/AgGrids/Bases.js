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
                    var AgOptions;
                    (function (AgOptions) {
                        var Bases = /** @class */ (function () {
                            function Bases(grid) {
                                var _newTarget = this.constructor;
                                this.Static = _newTarget;
                                this.grid = grid;
                                this.options = grid.GetOptions();
                                this.eventsManager = grid.GetEvents();
                                this.helpers = grid.GetHelpers();
                            }
                            Bases.prototype.SetAgOptions = function (options) {
                                this.agOptions = options;
                                return this;
                            };
                            Bases.prototype.GetAgOptions = function () {
                                return this.agOptions;
                            };
                            Bases.prototype.Init = function () {
                                this
                                    .initBases()
                                    .initRowSelection()
                                    .initEvents();
                                return this;
                            };
                            Bases.prototype.initBases = function () {
                                this.agOptions = {
                                    //debug: true,
                                    //localeText: agGridLocales['cs-CZ']
                                    tooltipShowDelay: 0,
                                    tooltipHideDelay: 2000,
                                    animateRows: false,
                                    suppressColumnVirtualisation: true,
                                    debounceVerticalScrollbar: true,
                                    alwaysShowVerticalScroll: true,
                                };
                                if (this.helpers.IsChromeBrowser())
                                    this.agOptions.suppressAnimationFrame = true;
                                return this;
                            };
                            Bases.prototype.initRowSelection = function () {
                                var rowSel = this.grid.GetServerConfig().rowSelection;
                                var rowSelectionNone = (rowSel & AgGrids.Enums.RowSelection.ROW_SELECTION_NONE) != 0;
                                if (rowSelectionNone ||
                                    (rowSel & AgGrids.Enums.RowSelection.ROW_SELECTION_SINGLE) != 0) {
                                    this.agOptions.rowSelection = 'single';
                                    if (rowSelectionNone)
                                        this.agOptions.suppressRowClickSelection = true;
                                }
                                else if ((rowSel & AgGrids.Enums.RowSelection.ROW_SELECTION_MULTIPLE) != 0) {
                                    this.agOptions.rowSelection = 'multiple';
                                    if (this.helpers.IsTouchDevice())
                                        this.agOptions.rowMultiSelectWithClick = true;
                                }
                                if ((rowSel & AgGrids.Enums.RowSelection.ROW_SELECTION_NOT_DESELECT) != 0)
                                    this.agOptions.suppressRowDeselection = true;
                                return this;
                            };
                            Bases.prototype.initEvents = function () {
                                this.agOptions.onColumnResized = this.eventsManager.HandleColumnResized.bind(this.eventsManager);
                                this.agOptions.onColumnMoved = this.eventsManager.HandleColumnMoved.bind(this.eventsManager);
                                this.agOptions.onFilterChanged = this.eventsManager.HandleFilterChanged.bind(this.eventsManager);
                                this.agOptions.onSortChanged = this.eventsManager.HandleSortChanged.bind(this.eventsManager);
                                /*this.agOptions.onFirstDataRendered = (params: agGrid.FirstDataRenderedEvent) => {
                                    params.api.sizeColumnsToFit();
                                },*/
                                this.agOptions.onViewportChanged = this.eventsManager.HandleGridSizeChanged.bind(this.eventsManager);
                                /*this.agOptions.onGridReady = (params: agGrid.GridReadyEvent): void => {
                                    params.api.sizeColumnsToFit();
                                },*/
                                this.agOptions.onGridSizeChanged = this.eventsManager.HandleGridSizeChanged.bind(this.eventsManager);
                                return this;
                            };
                            return Bases;
                        }());
                        AgOptions.Bases = Bases;
                    })(AgOptions = AgGrids.AgOptions || (AgGrids.AgOptions = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Bases.js.map