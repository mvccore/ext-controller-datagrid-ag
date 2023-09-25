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
                        var SinglePageMode = /** @class */ (function (_super) {
                            __extends(SinglePageMode, _super);
                            function SinglePageMode(grid) {
                                var _this = _super.call(this, grid) || this;
                                _this.refreshOffsets = [];
                                return _this;
                            }
                            SinglePageMode.prototype.HandleBodyScroll = function (event) {
                                var dataSource = this.grid.GetDataSource();
                                if (event.direction === 'vertical')
                                    dataSource.SetBodyScrolled(event.top > 0);
                                _super.prototype.HandleBodyScroll.call(this, event);
                            };
                            SinglePageMode.prototype.HandleResponseLoaded = function (response, selectFirstRow) {
                                if (selectFirstRow === void 0) { selectFirstRow = false; }
                                _super.prototype.HandleResponseLoaded.call(this, response, selectFirstRow);
                                if (this.refreshOffsets.length > 0) {
                                    var offsetIndex = this.refreshOffsets.indexOf(response.offset);
                                    if (offsetIndex !== -1)
                                        this.refreshOffsets.splice(offsetIndex, 1);
                                    if (this.refreshOffsets.length === 0)
                                        this.handleRefreshResponse();
                                }
                            };
                            SinglePageMode.prototype.handleRefreshClick = function (refreshAnchor, loadingCls, e) {
                                var exec = _super.prototype.handleRefreshClick.call(this, refreshAnchor, loadingCls, e);
                                if (!exec)
                                    return false;
                                var api = this.grid.GetOptionsManager().GetAgOptions().api, limit = this.grid.GetLimit(), firstRowIndex = api.getFirstDisplayedRow(), lastRowIndex = api.getLastDisplayedRow(), start = Math.floor(firstRowIndex / limit) * limit, end = Math.ceil(lastRowIndex / limit) * limit;
                                for (var i = start, l = end; i < l; i += limit)
                                    this.refreshOffsets.push(i);
                                this.grid.GetOptionsManager().GetAgOptions().api.purgeInfiniteCache();
                                return true;
                            };
                            return SinglePageMode;
                        }(MvcCore.Ext.Controllers.DataGrids.AgGrids.EventsManager));
                        EventsManagers.SinglePageMode = SinglePageMode;
                    })(EventsManagers = AgGrids.EventsManagers || (AgGrids.EventsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=SinglePageMode.js.map