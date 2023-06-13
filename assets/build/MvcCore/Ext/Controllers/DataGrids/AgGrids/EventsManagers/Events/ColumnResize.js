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
                            var ColumnResize = /** @class */ (function (_super) {
                                __extends(ColumnResize, _super);
                                function ColumnResize(columnId, newWidth, agEvent) {
                                    var _this = _super.call(this) || this;
                                    _this.columnId = columnId;
                                    _this.newWidth = newWidth;
                                    _this.agEvent = agEvent;
                                    return _this;
                                }
                                ColumnResize.prototype.GetColumnId = function () {
                                    return this.columnId;
                                };
                                ColumnResize.prototype.SetNewWidth = function (newWidth) {
                                    this.newWidth = newWidth;
                                    return this;
                                };
                                ColumnResize.prototype.GetNewWidth = function () {
                                    return this.newWidth;
                                };
                                ColumnResize.prototype.SetAgEvent = function (agEvent) {
                                    this.agEvent = agEvent;
                                    return this;
                                };
                                ColumnResize.prototype.GetAgEvent = function () {
                                    return this.agEvent;
                                };
                                return ColumnResize;
                            }(Events.Base));
                            Events.ColumnResize = ColumnResize;
                        })(Events = EventsManagers.Events || (EventsManagers.Events = {}));
                    })(EventsManagers = AgGrids.EventsManagers || (AgGrids.EventsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=ColumnResize.js.map