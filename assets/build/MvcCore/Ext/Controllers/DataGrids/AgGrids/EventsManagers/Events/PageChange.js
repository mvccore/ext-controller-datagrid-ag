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
                            var PageChange = /** @class */ (function (_super) {
                                __extends(PageChange, _super);
                                function PageChange(offsetBefore, offsetAfter, anchor) {
                                    if (anchor === void 0) { anchor = null; }
                                    var _this = _super.call(this) || this;
                                    _this.anchor = null;
                                    _this.offsetBefore = offsetBefore;
                                    _this.offsetAfter = offsetAfter;
                                    _this.anchor = anchor;
                                    return _this;
                                }
                                PageChange.prototype.SetOffsetBefore = function (offsetBefore) {
                                    this.offsetBefore = offsetBefore;
                                    return this;
                                };
                                PageChange.prototype.GetOffsetBefore = function () {
                                    return this.offsetBefore;
                                };
                                PageChange.prototype.SetOffsetAfter = function (offsetAfter) {
                                    this.offsetAfter = offsetAfter;
                                    return this;
                                };
                                PageChange.prototype.GetOffsetAfter = function () {
                                    return this.offsetAfter;
                                };
                                PageChange.prototype.SetAnchor = function (anchor) {
                                    this.anchor = anchor;
                                    return this;
                                };
                                PageChange.prototype.GetAnchor = function () {
                                    return this.anchor;
                                };
                                return PageChange;
                            }(Events.Base));
                            Events.PageChange = PageChange;
                        })(Events = EventsManagers.Events || (EventsManagers.Events = {}));
                    })(EventsManagers = AgGrids.EventsManagers || (AgGrids.EventsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=PageChange.js.map