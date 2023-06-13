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
                            var ColumnMove = /** @class */ (function (_super) {
                                __extends(ColumnMove, _super);
                                function ColumnMove(columnId, toIndex, agEvent) {
                                    var _this = _super.call(this) || this;
                                    _this.columnId = columnId;
                                    _this.toIndex = toIndex;
                                    _this.agEvent = agEvent;
                                    return _this;
                                }
                                ColumnMove.prototype.GetColumnId = function () {
                                    return this.columnId;
                                };
                                ColumnMove.prototype.SetToIndex = function (toIndex) {
                                    this.toIndex = toIndex;
                                    return this;
                                };
                                ColumnMove.prototype.GetToIndex = function () {
                                    return this.toIndex;
                                };
                                ColumnMove.prototype.SetAgEvent = function (agEvent) {
                                    this.agEvent = agEvent;
                                    return this;
                                };
                                ColumnMove.prototype.GetAgEvent = function () {
                                    return this.agEvent;
                                };
                                return ColumnMove;
                            }(Events.Base));
                            Events.ColumnMove = ColumnMove;
                        })(Events = EventsManagers.Events || (EventsManagers.Events = {}));
                    })(EventsManagers = AgGrids.EventsManagers || (AgGrids.EventsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=ColumnMove.js.map