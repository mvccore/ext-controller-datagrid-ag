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
                            var SelectionChange = /** @class */ (function (_super) {
                                __extends(SelectionChange, _super);
                                function SelectionChange(userChange, selectedRowNodesBefore, selectedRowNodesAfter) {
                                    var _this = _super.call(this) || this;
                                    _this.userChange = userChange;
                                    _this.selectedRowNodesBefore = selectedRowNodesBefore;
                                    _this.selectedRowNodesAfter = selectedRowNodesAfter;
                                    return _this;
                                }
                                SelectionChange.prototype.SetUserChange = function (userChange) {
                                    this.userChange = userChange;
                                    return this;
                                };
                                SelectionChange.prototype.GetUserChange = function () {
                                    return this.userChange;
                                };
                                SelectionChange.prototype.SetSelectedRowNodesBefore = function (selectedRowNodesBefore) {
                                    this.selectedRowNodesBefore = selectedRowNodesBefore;
                                    return this;
                                };
                                SelectionChange.prototype.GetSelectedRowNodesBefore = function () {
                                    return this.selectedRowNodesBefore;
                                };
                                SelectionChange.prototype.SetSelectedRowNodesAfter = function (selectedRowNodesAfter) {
                                    this.selectedRowNodesAfter = selectedRowNodesAfter;
                                    return this;
                                };
                                SelectionChange.prototype.GetSelectedRowNodesAfter = function () {
                                    return this.selectedRowNodesAfter;
                                };
                                return SelectionChange;
                            }(Events.Base));
                            Events.SelectionChange = SelectionChange;
                        })(Events = EventsManagers.Events || (EventsManagers.Events = {}));
                    })(EventsManagers = AgGrids.EventsManagers || (AgGrids.EventsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=SelectionChange.js.map