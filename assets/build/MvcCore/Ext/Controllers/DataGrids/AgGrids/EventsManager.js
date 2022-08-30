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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
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
                        EventsManager.prototype.HandleSortChange = function (columnId, direction) {
                            var e_1, _a;
                            var oldSorting = this.grid.GetSorting(), sortHeaders = this.grid.GetSortHeaders(), newSorting = [], sortRemoving = direction == null;
                            if (!sortRemoving)
                                newSorting.push([columnId, direction]);
                            try {
                                for (var oldSorting_1 = __values(oldSorting), oldSorting_1_1 = oldSorting_1.next(); !oldSorting_1_1.done; oldSorting_1_1 = oldSorting_1.next()) {
                                    var _b = __read(oldSorting_1_1.value, 2), sortColId = _b[0], sortDir = _b[1];
                                    if (sortColId === columnId)
                                        continue;
                                    newSorting.push([sortColId, sortDir]);
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (oldSorting_1_1 && !oldSorting_1_1.done && (_a = oldSorting_1.return)) _a.call(oldSorting_1);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                            for (var i = 0, sortColId = '', l = newSorting.length; i < l; i++) {
                                var _c = __read(newSorting[i], 1), sortColId = _c[0];
                                if (sortColId === columnId)
                                    continue;
                                sortHeaders.get(sortColId).SetSequence(i);
                            }
                            this.grid.SetSorting(newSorting);
                            var pageMode = this.grid.GetPageMode();
                            if ((pageMode & AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_SINGLE) != 0) {
                                // for single page - TODO
                                var dataSourceSp = this.grid.GetDataSource();
                                console.log(dataSourceSp);
                            }
                            else if ((pageMode & AgGrids.Enums.ClientPageMode.CLIENT_PAGE_MODE_MULTI) != 0) {
                                // for multiple pages - call ajax with new params completed later
                                var dataSourceMp = this.grid.GetDataSource();
                                dataSourceMp.Load();
                            }
                        };
                        /*public HandleSortChanged (event: agGrid.SortChangedEvent<any>): void {
                            
                            console.log(event, event.source);
                            //event.columnApi.
                        }*/
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