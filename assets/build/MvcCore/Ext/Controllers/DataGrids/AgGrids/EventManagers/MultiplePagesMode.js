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
                        var MultiplePagesMode = /** @class */ (function (_super) {
                            __extends(MultiplePagesMode, _super);
                            function MultiplePagesMode(grid) {
                                return _super.call(this, grid) || this;
                            }
                            MultiplePagesMode.prototype.AddPagingEvents = function () {
                                var _this = this;
                                this.grid.GetOptions().GetElements().pagingAnchors.forEach(function (pagingAnchor) {
                                    var ofsetInt = parseInt(pagingAnchor.dataset.offset, 10);
                                    pagingAnchor.addEventListener('click', _this.handlePagingClick.bind(_this, ofsetInt), true);
                                });
                                return this;
                            };
                            MultiplePagesMode.prototype.RemovePagingEvents = function () {
                                var _this = this;
                                this.grid.GetOptions().GetElements().pagingAnchors.forEach(function (pagingAnchor) {
                                    var ofsetInt = parseInt(pagingAnchor.dataset.offset, 10);
                                    pagingAnchor.removeEventListener('click', _this.handlePagingClick.bind(_this, ofsetInt), true);
                                });
                                return this;
                            };
                            MultiplePagesMode.prototype.handlePagingClick = function (offset, e) {
                                var dataSource = this.grid.GetDataSource();
                                dataSource.LoadPageData(offset);
                                e.cancelBubble = true;
                                e.preventDefault();
                            };
                            return MultiplePagesMode;
                        }(MvcCore.Ext.Controllers.DataGrids.AgGrids.EventsManager));
                        EventsManagers.MultiplePagesMode = MultiplePagesMode;
                    })(EventsManagers = AgGrids.EventsManagers || (AgGrids.EventsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=MultiplePagesMode.js.map