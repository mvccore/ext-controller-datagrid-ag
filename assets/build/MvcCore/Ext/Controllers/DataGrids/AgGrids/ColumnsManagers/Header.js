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
                    var ColumnsManagers;
                    (function (ColumnsManagers) {
                        var Header = /** @class */ (function () {
                            function Header() {
                            }
                            Header.prototype.init = function (agParams) {
                                this.agParams = agParams;
                                this.eGui = document.createElement('div');
                                this.eGui.innerHTML = "\n\t\t\t\t<div class=\"customHeaderMenuButton\">\n\t\t\t\t\t<i class=\"fa " + this.agParams.menuIcon + "\"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"customHeaderLabel\">" + this.agParams.displayName + "</div>\n\t\t\t\t<div class=\"customSortDownLabel inactive\">\n\t\t\t\t\t<i class=\"fa fa-long-arrow-alt-down\"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"customSortUpLabel inactive\">\n\t\t\t\t\t<i class=\"fa fa-long-arrow-alt-up\"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"customSortRemoveLabel inactive\">\n\t\t\t\t\t<i class=\"fa fa-times\"></i>\n\t\t\t\t</div>\n\t\t\t";
                                this.eMenuButton = this.eGui.querySelector(".customHeaderMenuButton");
                                this.eSortDownButton = this.eGui.querySelector(".customSortDownLabel");
                                this.eSortUpButton = this.eGui.querySelector(".customSortUpLabel");
                                this.eSortRemoveButton = this.eGui.querySelector(".customSortRemoveLabel");
                                if (this.agParams.enableMenu) {
                                    this.onMenuClickListener = this.onMenuClick.bind(this);
                                    this.eMenuButton.addEventListener('click', this.onMenuClickListener);
                                }
                                else {
                                    this.eGui.removeChild(this.eMenuButton);
                                }
                                if (this.agParams.enableSorting) {
                                    this.onSortAscRequestedListener = this.onSortRequested.bind(this, 'asc');
                                    this.eSortDownButton.addEventListener('click', this.onSortAscRequestedListener);
                                    this.onSortDescRequestedListener = this.onSortRequested.bind(this, 'desc');
                                    this.eSortUpButton.addEventListener('click', this.onSortDescRequestedListener);
                                    this.onRemoveSortListener = this.onSortRequested.bind(this, '');
                                    this.eSortRemoveButton.addEventListener('click', this.onRemoveSortListener);
                                    this.onSortChangedListener = this.onSortChanged.bind(this);
                                    this.agParams.column.addEventListener('sortChanged', this.onSortChangedListener);
                                    this.onSortChanged();
                                }
                                else {
                                    this.eGui.removeChild(this.eSortDownButton);
                                    this.eGui.removeChild(this.eSortUpButton);
                                    this.eGui.removeChild(this.eSortRemoveButton);
                                }
                            };
                            Header.prototype.refresh = function (params) {
                                return true;
                            };
                            Header.prototype.onSortChanged = function () {
                                var deactivate = function (toDeactivateItems) {
                                    toDeactivateItems.forEach(function (toDeactivate) {
                                        toDeactivate.className = toDeactivate.className.split(' ')[0];
                                    });
                                };
                                var activate = function (toActivate) {
                                    toActivate.className = toActivate.className + " active";
                                };
                                if (this.agParams.column.isSortAscending()) {
                                    deactivate([this.eSortUpButton, this.eSortRemoveButton]);
                                    activate(this.eSortDownButton);
                                }
                                else if (this.agParams.column.isSortDescending()) {
                                    deactivate([this.eSortDownButton, this.eSortRemoveButton]);
                                    activate(this.eSortUpButton);
                                }
                                else {
                                    deactivate([this.eSortUpButton, this.eSortDownButton]);
                                    activate(this.eSortRemoveButton);
                                }
                            };
                            Header.prototype.getGui = function () {
                                return this.eGui;
                            };
                            Header.prototype.onMenuClick = function () {
                                this.agParams.showColumnMenu(this.eMenuButton);
                            };
                            Header.prototype.onSortRequested = function (order, event) {
                                this.agParams.setSort(order, event.shiftKey);
                            };
                            Header.prototype.destroy = function () {
                                if (this.onMenuClickListener) {
                                    this.eMenuButton.removeEventListener('click', this.onMenuClickListener);
                                }
                                this.eSortDownButton.removeEventListener('click', this.onSortAscRequestedListener);
                                this.eSortUpButton.removeEventListener('click', this.onSortDescRequestedListener);
                                this.eSortRemoveButton.removeEventListener('click', this.onRemoveSortListener);
                                this.agParams.column.removeEventListener('sortChanged', this.onSortChangedListener);
                            };
                            return Header;
                        }());
                        ColumnsManagers.Header = Header;
                    })(ColumnsManagers = AgGrids.ColumnsManagers || (AgGrids.ColumnsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Header.js.map