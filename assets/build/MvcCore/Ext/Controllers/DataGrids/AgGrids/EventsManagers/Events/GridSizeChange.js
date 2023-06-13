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
                            var GridSizeChange = /** @class */ (function (_super) {
                                __extends(GridSizeChange, _super);
                                function GridSizeChange(gridWidth, gridHeight, agEvent) {
                                    var _this = _super.call(this) || this;
                                    _this.gridWidth = gridWidth;
                                    _this.gridHeight = gridHeight;
                                    _this.agEvent = agEvent;
                                    return _this;
                                }
                                GridSizeChange.prototype.GetGridWidth = function () {
                                    return this.gridWidth;
                                };
                                GridSizeChange.prototype.GetGridHeight = function () {
                                    return this.gridHeight;
                                };
                                GridSizeChange.prototype.GetAgEvent = function () {
                                    return this.agEvent;
                                };
                                return GridSizeChange;
                            }(Events.Base));
                            Events.GridSizeChange = GridSizeChange;
                        })(Events = EventsManagers.Events || (EventsManagers.Events = {}));
                    })(EventsManagers = AgGrids.EventsManagers || (AgGrids.EventsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=GridSizeChange.js.map