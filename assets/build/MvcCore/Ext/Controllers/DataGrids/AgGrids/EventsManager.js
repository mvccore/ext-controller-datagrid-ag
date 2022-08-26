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
                    var EventsManager = /** @class */ (function () {
                        function EventsManager(grid) {
                            this.grid = grid;
                        }
                        EventsManager.prototype.HandleColumnResized = function (event) {
                            //console.log(event);
                        };
                        EventsManager.prototype.HandleColumnMoved = function (event) {
                            //console.log(event);
                        };
                        EventsManager.prototype.HandleFilterChanged = function (event) {
                            this.grid.SetTotalCount(null);
                            //console.log(event);
                        };
                        EventsManager.prototype.HandleSortChanged = function (event) {
                            console.log(event, event.source);
                            //event.columnApi.
                        };
                        EventsManager.prototype.HandleGridSizeChanged = function (event) {
                            // get the current grids width
                            var gridElm = this.grid.GetOptions().GetElements().agGridElement, gridElmParent = gridElm.parentNode;
                            var gridWidth = gridElmParent.offsetWidth;
                            // keep track of which columns to hide/show
                            var columnsToShow = [], columnsToHide = [];
                            // iterate over all columns (visible or not) and work out
                            // now many columns can fit (based on their minWidth)
                            var totalColsWidth = 0;
                            var allColumns = event.columnApi.getColumns();
                            if (allColumns && allColumns.length > 0) {
                                for (var i = 0; i < allColumns.length; i++) {
                                    var column = allColumns[i];
                                    totalColsWidth += column.getMinWidth() || 0;
                                    if (totalColsWidth > gridWidth) {
                                        columnsToHide.push(column.getColId());
                                    }
                                    else {
                                        columnsToShow.push(column.getColId());
                                    }
                                }
                            }
                            // show/hide columns based on current grid width
                            event.columnApi.setColumnsVisible(columnsToShow, true);
                            event.columnApi.setColumnsVisible(columnsToHide, false);
                            // fill out any available space to ensure there are no gaps
                            event.api.sizeColumnsToFit();
                        };
                        return EventsManager;
                    }());
                    AgGrids.EventsManager = EventsManager;
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=EventsManager.js.map