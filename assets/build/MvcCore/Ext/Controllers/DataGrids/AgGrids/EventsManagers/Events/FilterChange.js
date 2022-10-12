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
                            var FilterChange = /** @class */ (function (_super) {
                                __extends(FilterChange, _super);
                                function FilterChange(filteringBefore, filteringAfter) {
                                    var _this = _super.call(this) || this;
                                    _this.filteringBefore = filteringBefore;
                                    _this.filteringAfter = filteringAfter;
                                    return _this;
                                }
                                FilterChange.prototype.SetFilteringBefore = function (filteringBefore) {
                                    this.filteringBefore = filteringBefore;
                                    return this;
                                };
                                FilterChange.prototype.GetFilteringBefore = function () {
                                    return this.filteringBefore;
                                };
                                FilterChange.prototype.SetFilteringAfter = function (filteringAfter) {
                                    this.filteringAfter = filteringAfter;
                                    return this;
                                };
                                FilterChange.prototype.GetFilteringAfter = function () {
                                    return this.filteringAfter;
                                };
                                return FilterChange;
                            }(Events.Base));
                            Events.FilterChange = FilterChange;
                        })(Events = EventsManagers.Events || (EventsManagers.Events = {}));
                    })(EventsManagers = AgGrids.EventsManagers || (AgGrids.EventsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=FilterChange.js.map