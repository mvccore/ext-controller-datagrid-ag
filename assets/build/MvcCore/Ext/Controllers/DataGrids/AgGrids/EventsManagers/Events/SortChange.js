var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
                    var EventsManagers;
                    (function (EventsManagers) {
                        var Events;
                        (function (Events) {
                            var SortChange = /** @class */ (function (_super) {
                                __extends(SortChange, _super);
                                function SortChange(sortingBefore, sortingAfter) {
                                    var _this = _super.call(this) || this;
                                    _this.sortingBefore = sortingBefore;
                                    _this.sortingAfter = sortingAfter;
                                    return _this;
                                }
                                SortChange.prototype.SetSortingBefore = function (sortingBefore) {
                                    this.sortingBefore = sortingBefore;
                                    return this;
                                };
                                SortChange.prototype.GetSortingBefore = function () {
                                    return this.sortingBefore;
                                };
                                SortChange.prototype.SetSortingAfter = function (sortingAfter) {
                                    this.sortingAfter = sortingAfter;
                                    return this;
                                };
                                SortChange.prototype.GetSortingAfter = function () {
                                    return this.sortingAfter;
                                };
                                return SortChange;
                            }(Events.Base));
                            Events.SortChange = SortChange;
                        })(Events = EventsManagers.Events || (EventsManagers.Events = {}));
                    })(EventsManagers = AgGrids.EventsManagers || (AgGrids.EventsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=SortChange.js.map