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
                    var Events = /** @class */ (function () {
                        function Events(grid) {
                            this.grid = grid;
                        }
                        Events.prototype.AddPagingEvents = function () {
                            var _this = this;
                            this.grid.GetOptions().GetElements().pagingAnchors.forEach(function (pagingAnchor) {
                                var ofsetInt = parseInt(pagingAnchor.dataset.offset, 10);
                                pagingAnchor.addEventListener('click', _this.handlePagingClick.bind(_this, ofsetInt), true);
                            });
                            return this;
                        };
                        Events.prototype.RemovePagingEvents = function () {
                            var _this = this;
                            this.grid.GetOptions().GetElements().pagingAnchors.forEach(function (pagingAnchor) {
                                var ofsetInt = parseInt(pagingAnchor.dataset.offset, 10);
                                pagingAnchor.removeEventListener('click', _this.handlePagingClick.bind(_this, ofsetInt), true);
                            });
                            return this;
                        };
                        Events.prototype.handlePagingClick = function (offset, e) {
                            console.log(offset);
                            //this.grid.GetOptions().GetAgDataSource().LoadPageData(offset);
                            e.cancelBubble = true;
                            e.preventDefault();
                        };
                        Events.prototype.HandleColumnResized = function (params) {
                            //console.log(params);
                        };
                        Events.prototype.HandleColumnMoved = function (params) {
                            //console.log(params);
                        };
                        Events.prototype.HandleFilterChanged = function (params) {
                            this.grid.SetTotalCount(null);
                            //console.log(params);
                        };
                        Events.prototype.HandleSortChanged = function (params) {
                            //console.log(params);
                        };
                        Events.prototype.HandleGridSizeChanged = function (params) {
                            // get the current grids width
                            var gridElm = this.grid.GetOptions().GetElements().agGridElement, gridElmParent = gridElm.parentNode;
                            var gridWidth = gridElmParent.offsetWidth;
                            // keep track of which columns to hide/show
                            var columnsToShow = [];
                            var columnsToHide = [];
                            // iterate over all columns (visible or not) and work out
                            // now many columns can fit (based on their minWidth)
                            var totalColsWidth = 0;
                            var allColumns = params.columnApi.getColumns();
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
                            params.columnApi.setColumnsVisible(columnsToShow, true);
                            params.columnApi.setColumnsVisible(columnsToHide, false);
                            // fill out any available space to ensure there are no gaps
                            params.api.sizeColumnsToFit();
                        };
                        return Events;
                    }());
                    AgGrids.Events = Events;
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=EventHandler.js.map