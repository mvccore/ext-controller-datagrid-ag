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
                            var CountScaleChange = /** @class */ (function (_super) {
                                __extends(CountScaleChange, _super);
                                function CountScaleChange(countBefore, countAfter, anchor) {
                                    var _this = _super.call(this) || this;
                                    _this.countBefore = countBefore;
                                    _this.countAfter = countAfter;
                                    _this.anchor = anchor;
                                    return _this;
                                }
                                CountScaleChange.prototype.SetCountBefore = function (countBefore) {
                                    this.countBefore = countBefore;
                                    return this;
                                };
                                CountScaleChange.prototype.GetCountBefore = function () {
                                    return this.countBefore;
                                };
                                CountScaleChange.prototype.SetCountAfter = function (countAfter) {
                                    this.countAfter = countAfter;
                                    return this;
                                };
                                CountScaleChange.prototype.GetCountAfter = function () {
                                    return this.countAfter;
                                };
                                CountScaleChange.prototype.SetAnchor = function (anchor) {
                                    this.anchor = anchor;
                                    return this;
                                };
                                CountScaleChange.prototype.GetAnchor = function () {
                                    return this.anchor;
                                };
                                return CountScaleChange;
                            }(Events.Base));
                            Events.CountScaleChange = CountScaleChange;
                        })(Events = EventsManagers.Events || (EventsManagers.Events = {}));
                    })(EventsManagers = AgGrids.EventsManagers || (AgGrids.EventsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=CountScaleChange.js.map