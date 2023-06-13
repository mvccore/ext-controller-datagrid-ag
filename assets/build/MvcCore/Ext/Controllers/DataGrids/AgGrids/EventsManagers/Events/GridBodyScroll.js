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
                            var GridBodyScroll = /** @class */ (function (_super) {
                                __extends(GridBodyScroll, _super);
                                function GridBodyScroll(left, top, direction, agEvent) {
                                    var _this = _super.call(this) || this;
                                    _this.left = left;
                                    _this.top = top;
                                    _this.direction = direction;
                                    _this.agEvent = agEvent;
                                    return _this;
                                }
                                GridBodyScroll.prototype.GetLeft = function () {
                                    return this.left;
                                };
                                GridBodyScroll.prototype.GetTop = function () {
                                    return this.top;
                                };
                                GridBodyScroll.prototype.GetDirection = function () {
                                    return this.direction;
                                };
                                GridBodyScroll.prototype.GetAgEvent = function () {
                                    return this.agEvent;
                                };
                                return GridBodyScroll;
                            }(Events.Base));
                            Events.GridBodyScroll = GridBodyScroll;
                        })(Events = EventsManagers.Events || (EventsManagers.Events = {}));
                    })(EventsManagers = AgGrids.EventsManagers || (AgGrids.EventsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=GridBodyScroll.js.map