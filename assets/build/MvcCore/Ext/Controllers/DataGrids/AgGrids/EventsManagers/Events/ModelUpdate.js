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
                            var ModelUpdate = /** @class */ (function (_super) {
                                __extends(ModelUpdate, _super);
                                function ModelUpdate(newData, newPage, animate, keepRenderedRows, keepUndoRedoStack, agEvent) {
                                    var _this = _super.call(this) || this;
                                    _this.newData = newData;
                                    _this.newPage = newPage;
                                    _this.animate = animate;
                                    _this.keepRenderedRows = keepRenderedRows;
                                    _this.keepUndoRedoStack = keepUndoRedoStack;
                                    _this.agEvent = agEvent;
                                    return _this;
                                }
                                ModelUpdate.prototype.GetNewData = function () {
                                    return this.newData;
                                };
                                ModelUpdate.prototype.GetNewPage = function () {
                                    return this.newPage;
                                };
                                ModelUpdate.prototype.GetAnimate = function () {
                                    return this.animate;
                                };
                                ModelUpdate.prototype.GetKeepRenderedRows = function () {
                                    return this.keepRenderedRows;
                                };
                                ModelUpdate.prototype.GetKeepUndoRedoStack = function () {
                                    return this.keepUndoRedoStack;
                                };
                                ModelUpdate.prototype.SetNewData = function (newData) {
                                    this.newData = newData;
                                    return this;
                                };
                                ModelUpdate.prototype.SetNewPage = function (newPage) {
                                    this.newPage = newPage;
                                    return this;
                                };
                                ModelUpdate.prototype.SetAnimate = function (animate) {
                                    this.animate = animate;
                                    return this;
                                };
                                ModelUpdate.prototype.SetKeepRenderedRows = function (keepRenderedRows) {
                                    this.keepRenderedRows = keepRenderedRows;
                                    return this;
                                };
                                ModelUpdate.prototype.SetKeepUndoRedoStack = function (keepUndoRedoStack) {
                                    this.keepUndoRedoStack = keepUndoRedoStack;
                                    return this;
                                };
                                ModelUpdate.prototype.GetAgEvent = function () {
                                    return this.agEvent;
                                };
                                return ModelUpdate;
                            }(Events.Base));
                            Events.ModelUpdate = ModelUpdate;
                        })(Events = EventsManagers.Events || (EventsManagers.Events = {}));
                    })(EventsManagers = AgGrids.EventsManagers || (AgGrids.EventsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=ModelUpdate.js.map