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
                        var AgBases = /** @class */ (function () {
                            function AgBases(grid) {
                                var _newTarget = this.constructor;
                                this.Static = _newTarget;
                                this.grid = grid;
                                this.optionsManager = grid.GetOptionsManager();
                                this.eventsManager = grid.GetEvents();
                                this.helpers = grid.GetHelpers();
                            }
                            AgBases.prototype.SetAgOptions = function (options) {
                                this.agOptions = options;
                                return this;
                            };
                            AgBases.prototype.GetAgOptions = function () {
                                return this.agOptions;
                            };
                            AgBases.prototype.Init = function () {
                                this
                                    .initBases()
                                    .initRowSelection()
                                    .initEvents();
                                return this;
                            };
                            AgBases.prototype.initBases = function () {
                                this.agOptions = {
                                    //debug: true,
                                    suppressMenuHide: true,
                                    tooltipShowDelay: 0,
                                    tooltipHideDelay: 2000,
                                    animateRows: false,
                                    suppressColumnVirtualisation: true,
                                    debounceVerticalScrollbar: true,
                                    alwaysShowVerticalScroll: true,
                                    suppressCellFocus: true,
                                };
                                if (this.helpers.IsChromeBrowser())
                                    this.agOptions.suppressAnimationFrame = true;
                                this.agOptions.localeText = this.grid.GetTranslator().GetStore();
                                return this;
                            };
                            AgBases.prototype.initRowSelection = function () {
                                var rowSel = this.grid.GetServerConfig().rowSelection;
                                var rowSelectionNone = (rowSel & AgGrids.Enums.RowSelection.ROW_SELECTION_NONE) != 0;
                                if (!rowSelectionNone) {
                                    if ((rowSel & AgGrids.Enums.RowSelection.ROW_SELECTION_SINGLE) != 0) {
                                        this.agOptions.rowSelection = 'single';
                                    }
                                    else if ((rowSel & AgGrids.Enums.RowSelection.ROW_SELECTION_MULTIPLE) != 0) {
                                        this.agOptions.rowSelection = 'multiple';
                                        if (this.helpers.IsTouchDevice())
                                            this.agOptions.rowMultiSelectWithClick = true;
                                    }
                                    if ((rowSel & AgGrids.Enums.RowSelection.ROW_SELECTION_NOT_DESELECT) != 0) {
                                        this.agOptions.suppressRowDeselection = true;
                                    }
                                }
                                return this;
                            };
                            AgBases.prototype.initEvents = function () {
                                this.agOptions.onGridReady = this.eventsManager.HandleGridReady.bind(this.eventsManager);
                                this.agOptions.onColumnResized = this.eventsManager.HandleColumnResized.bind(this.eventsManager);
                                this.agOptions.onColumnMoved = this.eventsManager.HandleColumnMoved.bind(this.eventsManager);
                                this.agOptions.onViewportChanged = this.eventsManager.HandleGridSizeChanged.bind(this.eventsManager, true);
                                this.agOptions.onGridSizeChanged = this.eventsManager.HandleGridSizeChanged.bind(this.eventsManager, false);
                                this.agOptions.onSelectionChanged = this.eventsManager.HandleSelectionChange.bind(this.eventsManager);
                                this.agOptions.onModelUpdated = this.eventsManager.HandleModelUpdated.bind(this.eventsManager);
                                if ((this.grid.GetPageMode() & AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_SINGLE) != 0) {
                                    var eventsManagerSpm = this.eventsManager;
                                    this.agOptions.onBodyScroll = eventsManagerSpm.HandleBodyScroll.bind(this.eventsManager);
                                }
                                return this;
                            };
                            return AgBases;
                        }());
                        Options.AgBases = AgBases;
                    })(Options = AgGrids.Options || (AgGrids.Options = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=AgBases.js.map