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
                            var Base = /** @class */ (function () {
                                function Base() {
                                    this.stopCurrentEventPropagation = false;
                                    this.stopNextEventsPropagation = false;
                                }
                                Base.prototype.SetGrid = function (grid) {
                                    this.grid = grid;
                                    return this;
                                };
                                Base.prototype.GetGrid = function () {
                                    return this.grid;
                                };
                                Base.prototype.SetEventName = function (eventName) {
                                    this.eventName = eventName;
                                    return this;
                                };
                                Base.prototype.GetEventName = function () {
                                    return this.eventName;
                                };
                                Base.prototype.SetStopCurrentEventPropagation = function (stopCurrentEventPropagation) {
                                    if (stopCurrentEventPropagation === void 0) { stopCurrentEventPropagation = true; }
                                    this.stopCurrentEventPropagation = stopCurrentEventPropagation;
                                    return this;
                                };
                                Base.prototype.GetStopCurrentEventPropagation = function () {
                                    return this.stopCurrentEventPropagation;
                                };
                                Base.prototype.SetStopNextEventsPropagation = function (stopNextEventsPropagation) {
                                    if (stopNextEventsPropagation === void 0) { stopNextEventsPropagation = true; }
                                    this.stopNextEventsPropagation = stopNextEventsPropagation;
                                    return this;
                                };
                                Base.prototype.GetStopNextEventsPropagation = function () {
                                    return this.stopNextEventsPropagation;
                                };
                                return Base;
                            }());
                            Events.Base = Base;
                        })(Events = EventsManagers.Events || (EventsManagers.Events = {}));
                    })(EventsManagers = AgGrids.EventsManagers || (AgGrids.EventsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Base.js.map