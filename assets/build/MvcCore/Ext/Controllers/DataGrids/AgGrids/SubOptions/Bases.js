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
                        var Bases = /** @class */ (function () {
                            function Bases(grid) {
                                var _newTarget = this.constructor;
                                this.Static = _newTarget;
                                this.grid = grid;
                                this.options = grid.GetOptions();
                                this.events = grid.GetEvents();
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
                                this.agOptions.onColumnResized = this.events.HandleColumnResized.bind(this.events);
                                this.agOptions.onColumnMoved = this.events.HandleColumnMoved.bind(this.events);
                                this.agOptions.onFilterChanged = this.events.HandleFilterChanged.bind(this.events);
                                this.agOptions.onSortChanged = this.events.HandleSortChanged.bind(this.events);
                                /*this.agOptions.onFirstDataRendered = (params: agGrid.FirstDataRenderedEvent) => {
                                    params.api.sizeColumnsToFit();
                                },*/
                                this.agOptions.onViewportChanged = this.events.HandleGridSizeChanged.bind(this.events);
                                /*this.agOptions.onGridReady = (params: agGrid.GridReadyEvent): void => {
                                    params.api.sizeColumnsToFit();
                                },*/
                                this.agOptions.onGridSizeChanged = this.events.HandleGridSizeChanged.bind(this.events);
                                return this;
                            };
                            return Bases;
                        }());
                        SubOptions.Bases = Bases;
                    })(SubOptions = AgGrids.SubOptions || (AgGrids.SubOptions = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Bases.js.map