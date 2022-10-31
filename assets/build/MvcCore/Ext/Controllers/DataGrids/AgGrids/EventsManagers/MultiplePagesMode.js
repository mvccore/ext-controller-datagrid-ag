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
                        var MultiplePagesMode = /** @class */ (function (_super) {
                            __extends(MultiplePagesMode, _super);
                            function MultiplePagesMode(grid) {
                                return _super.call(this, grid) || this;
                            }
                            MultiplePagesMode.prototype.HandleGridReady = function (event) {
                                this.SelectRowByIndex(0);
                                _super.prototype.HandleGridReady.call(this, event);
                            };
                            MultiplePagesMode.prototype.AddCountScalesEvents = function () {
                                var _this = this;
                                this.countScalesHandlers = new Map();
                                this.grid.GetOptionsManager().GetElements().countScalesAnchors.forEach(function (countScaleAnchor) {
                                    var countInt = parseInt(countScaleAnchor.dataset.count, 10), handler = _this.handleCountScalesClick.bind(_this, countInt);
                                    _this.countScalesHandlers.set(countInt, handler);
                                    countScaleAnchor.addEventListener('click', handler, true);
                                });
                                return this;
                            };
                            MultiplePagesMode.prototype.RemoveCountScalesEvents = function () {
                                var _this = this;
                                this.grid.GetOptionsManager().GetElements().countScalesAnchors.forEach(function (countScaleAnchor) {
                                    var countInt = parseInt(countScaleAnchor.dataset.count, 10), handler = _this.countScalesHandlers.get(countInt);
                                    countScaleAnchor.removeEventListener('click', handler, true);
                                });
                                this.countScalesHandlers = new Map();
                                return this;
                            };
                            MultiplePagesMode.prototype.AddPagingEvents = function () {
                                var _this = this;
                                this.pagingHandlers = new Map();
                                this.grid.GetOptionsManager().GetElements().pagingAnchors.forEach(function (pagingAnchor) {
                                    var ofsetInt = parseInt(pagingAnchor.dataset.offset, 10), handler = _this.handlePagingClick.bind(_this, ofsetInt);
                                    _this.pagingHandlers.set(ofsetInt, handler);
                                    pagingAnchor.addEventListener('click', handler, true);
                                });
                                return this;
                            };
                            MultiplePagesMode.prototype.RemovePagingEvents = function () {
                                var _this = this;
                                this.grid.GetOptionsManager().GetElements().pagingAnchors.forEach(function (pagingAnchor) {
                                    var ofsetInt = parseInt(pagingAnchor.dataset.offset, 10), handler = _this.pagingHandlers.get(ofsetInt);
                                    pagingAnchor.removeEventListener('click', handler, true);
                                });
                                this.pagingHandlers = new Map();
                                return this;
                            };
                            MultiplePagesMode.prototype.handleCountScalesClick = function (countAfter, e) {
                                var continueToBrowserActions = this.FireHandlers("beforeCountScaleChange", new EventsManagers.Events.CountScaleChange(this.grid.GetServerConfig().count, countAfter, e.target));
                                if (continueToBrowserActions === false) {
                                    e.cancelBubble = true;
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                            };
                            MultiplePagesMode.prototype.handlePagingClick = function (offsetAfter, e) {
                                e.cancelBubble = true;
                                e.preventDefault();
                                e.stopPropagation();
                                var offsetBefore = this.grid.GetOffset();
                                var continueToNextEvent = this.FireHandlers("beforePageChange", new EventsManagers.Events.PageChange(offsetBefore, offsetAfter, e.target));
                                if (continueToNextEvent === false)
                                    return;
                                var dataSource = this.grid.GetDataSource();
                                this.grid.SetOffset(offsetAfter);
                                dataSource.Load();
                                this.FireHandlers("pageChange", new EventsManagers.Events.PageChange(offsetBefore, offsetAfter, e.target));
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