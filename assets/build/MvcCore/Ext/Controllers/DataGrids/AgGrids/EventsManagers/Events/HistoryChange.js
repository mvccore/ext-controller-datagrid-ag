var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
                            var HistoryChange = /** @class */ (function (_super) {
                                __extends(HistoryChange, _super);
                                function HistoryChange(offsetBefore, offsetAfter, sortingBefore, sortingAfter, filteringBefore, filteringAfter) {
                                    var _this = _super.call(this) || this;
                                    _this.offsetBefore = offsetBefore;
                                    _this.offsetAfter = offsetAfter;
                                    _this.sortingBefore = sortingBefore;
                                    _this.sortingAfter = sortingAfter;
                                    _this.filteringBefore = filteringBefore;
                                    _this.filteringAfter = filteringAfter;
                                    return _this;
                                }
                                HistoryChange.prototype.SetOffsetBefore = function (offsetBefore) {
                                    this.offsetBefore = offsetBefore;
                                    return this;
                                };
                                HistoryChange.prototype.GetOffsetBefore = function () {
                                    return this.offsetBefore;
                                };
                                HistoryChange.prototype.SetOffsetAfter = function (offsetAfter) {
                                    this.offsetAfter = offsetAfter;
                                    return this;
                                };
                                HistoryChange.prototype.GetOffsetAfter = function () {
                                    return this.offsetAfter;
                                };
                                HistoryChange.prototype.SetSortingBefore = function (sortingBefore) {
                                    this.sortingBefore = sortingBefore;
                                    return this;
                                };
                                HistoryChange.prototype.GetSortingBefore = function () {
                                    return this.sortingBefore;
                                };
                                HistoryChange.prototype.SetSortingAfter = function (sortingAfter) {
                                    this.sortingAfter = sortingAfter;
                                    return this;
                                };
                                HistoryChange.prototype.GetSortingAfter = function () {
                                    return this.sortingAfter;
                                };
                                HistoryChange.prototype.SetFilteringBefore = function (filteringBefore) {
                                    this.filteringBefore = filteringBefore;
                                    return this;
                                };
                                HistoryChange.prototype.GetFilteringBefore = function () {
                                    return this.filteringBefore;
                                };
                                HistoryChange.prototype.SetFilteringAfter = function (filteringAfter) {
                                    this.filteringAfter = filteringAfter;
                                    return this;
                                };
                                HistoryChange.prototype.GetFilteringAfter = function () {
                                    return this.filteringAfter;
                                };
                                return HistoryChange;
                            }(Events.Base));
                            Events.HistoryChange = HistoryChange;
                        })(Events = EventsManagers.Events || (EventsManagers.Events = {}));
                    })(EventsManagers = AgGrids.EventsManagers || (AgGrids.EventsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=HistoryChange.js.map