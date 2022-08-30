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
                        var FilterMenu = /** @class */ (function () {
                            function FilterMenu() {
                            }
                            // Mandatory methods
                            /**
                             * The init(params) method is called on the filter once. See below for details on the
                             * parameters.
                             */
                            FilterMenu.prototype.init = function (params) {
                                this.eGui = document.createElement('div');
                                this.eGui.innerHTML =
                                    "<div style=\"display: inline-block; width: 400px;\">\n\t\t\t\t\t<div style=\"padding: 10px; background-color: #d3d3d3; text-align: center;\">This is a very wide filter</div>\n\t\t\t\t\t<label style=\"margin: 10px; padding: 50px; display: inline-block; background-color: #999999\">  \n\t\t\t\t\t\t<input type=\"radio\" name=\"yearFilter\" checked=\"true\" id=\"rbAllYears\" filter-checkbox=\"true\"/> All\n\t\t\t\t\t</label>\n\t\t\t\t\t<label style=\"margin: 10px; padding: 50px; display: inline-block; background-color: #999999\">  \n\t\t\t\t\t\t<input type=\"radio\" name=\"yearFilter\" id=\"rbSince2010\" filter-checkbox=\"true\"/> Since 2010\n\t\t\t\t\t</label>\n\t\t\t\t</div>";
                                this.rbAllYears = this.eGui.querySelector('#rbAllYears');
                                this.rbSince2010 = this.eGui.querySelector('#rbSince2010');
                                this.rbAllYears.addEventListener('change', this.onRbChanged.bind(this));
                                this.rbSince2010.addEventListener('change', this.onRbChanged.bind(this));
                                this.filterActive = true;
                                this.filterChangedCallback = params.filterChangedCallback;
                                //var fieldId = params.colDef.field;
                            };
                            FilterMenu.prototype.onRbChanged = function () {
                                this.filterActive = true || this.rbSince2010.checked;
                                this.filterChangedCallback();
                            };
                            /** Returns the DOM element for this filter */
                            FilterMenu.prototype.getGui = function () {
                                return this.eGui;
                            };
                            /**
                             * Return true if the filter is active. If active then 1) the grid will show the filter icon in the column
                             * header and 2) the filter will be included in the filtering of the data.
                             */
                            FilterMenu.prototype.isFilterActive = function () {
                                return this.filterActive;
                            };
                            /**
                             * The grid will ask each active filter, in turn, whether each row in the grid passes. If any
                             * filter fails, then the row will be excluded from the final set. A params object is supplied
                             * containing attributes of node (the rowNode the grid creates that wraps the data) and data (the data
                             * object that you provided to the grid for that row).
                             */
                            FilterMenu.prototype.doesFilterPass = function (params) {
                                return false; // for server filtering
                                return params.data.year >= 2010;
                            };
                            /**
                             * Gets the filter state. If filter is not active, then should return null/undefined.
                             * The grid calls getModel() on all active filters when gridApi.getFilterModel() is called.
                             */
                            FilterMenu.prototype.getModel = function () {
                                debugger;
                            };
                            /**
                             * Restores the filter state. Called by the grid after gridApi.setFilterModel(model) is called.
                             * The grid will pass undefined/null to clear the filter.
                             */
                            FilterMenu.prototype.setModel = function () {
                                debugger;
                            };
                            // Optional methods
                            /**
                             * Gets called every time the popup is shown, after the GUI returned in
                             * getGui is attached to the DOM. If the filter popup is closed and re-opened, this method is
                             * called each time the filter is shown. This is useful for any logic that requires attachment
                             * before executing, such as putting focus on a particular DOM element. The params has a
                             * callback method 'hidePopup', which you can call at any later point to hide the popup - good
                             * if you have an 'Apply' button and you want to hide the popup after it is pressed.
                             */
                            FilterMenu.prototype.afterGuiAttached = function (params) {
                            };
                            /**
                             * Gets called when new rows are inserted into the grid. If the filter needs to change its
                             * state after rows are loaded, it can do it here. For example the set filters uses this
                             * to update the list of available values to select from (e.g. 'Ireland', 'UK' etc for
                             * Country filter). To get the list of available values from within this method from the
                             * Client Side Row Model, use gridApi.forEachLeafNode(callback)
                             */
                            FilterMenu.prototype.onNewRowsLoaded = function () {
                            };
                            /** Called whenever any filter is changed. */
                            FilterMenu.prototype.onAnyFilterChanged = function () {
                            };
                            /**
                             * Gets called when the column is destroyed. If your custom filter needs to do
                             * any resource cleaning up, do it here. A filter is NOT destroyed when it is
                             * made 'not visible', as the GUI is kept to be shown again if the user selects
                             * that filter again. The filter is destroyed when the column it is associated with is
                             * destroyed, either when new columns are set into the grid, or the grid itself is destroyed.
                             */
                            FilterMenu.prototype.destroy = function () {
                            };
                            /**
                             * If floating filters are turned on for the grid, but you have no floating filter
                             * configured for this column, then the grid will check for this method. If this
                             * method exists, then the grid will provide a read-only floating filter for you
                             * and display the results of this method. For example, if your filter is a simple
                             * filter with one string input value, you could just return the simple string
                             * value here.
                             */
                            FilterMenu.prototype.getModelAsString = function (model) {
                                return '';
                            };
                            return FilterMenu;
                        }());
                        ColumnsManagers.FilterMenu = FilterMenu;
                    })(ColumnsManagers = AgGrids.ColumnsManagers || (AgGrids.ColumnsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=FilterMenu.js.map