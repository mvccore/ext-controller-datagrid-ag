var MvcCore;
(function (MvcCore) {
    var Ext;
    (function (Ext) {
        var Controllers;
        (function (Controllers) {
            var DataGrids;
            (function (DataGrids) {
                var AgGrid = /** @class */ (function () {
                    function AgGrid(serverConfig, initialData) {
                        this.totalCount = null;
                        this.helpers = new DataGrids.AgGrids.Helpers(this);
                        this.serverConfig = this.helpers.RetypeServerConfigObjects2Maps(serverConfig);
                        this.initialData = this.helpers.RetypeServerResponseObjects2Maps(initialData);
                        this.events = new DataGrids.AgGrids.Events(this);
                        this.initialization = new DataGrids.AgGrids.Initializations(this, this.events, this.helpers);
                        this.sorting = this.initialData.sorting;
                        this.filtering = this.initialData.filtering;
                        this.totalCount = this.initialData.totalCount;
                    }
                    AgGrid.prototype.GetServerConfig = function () {
                        return this.serverConfig;
                    };
                    AgGrid.prototype.GetInitialData = function () {
                        return this.initialData;
                    };
                    AgGrid.prototype.SetGrid = function (grid) {
                        this.grid = grid;
                        return this;
                    };
                    AgGrid.prototype.GetGrid = function () {
                        return this.grid;
                    };
                    AgGrid.prototype.SetGridElement = function (gridElement) {
                        this.gridElement = gridElement;
                        return this;
                    };
                    AgGrid.prototype.GetGridElement = function () {
                        return this.gridElement;
                    };
                    AgGrid.prototype.SetGridOptions = function (gridOptions) {
                        this.gridOptions = gridOptions;
                        return this;
                    };
                    AgGrid.prototype.GetGridOptions = function () {
                        return this.gridOptions;
                    };
                    AgGrid.prototype.SetGridColumns = function (gridColumns) {
                        this.gridColumns = gridColumns;
                        return this;
                    };
                    AgGrid.prototype.GetGridColumns = function () {
                        return this.gridColumns;
                    };
                    AgGrid.prototype.SetGridDataSource = function (gridDataSource) {
                        this.gridDataSource = gridDataSource;
                        return this;
                    };
                    AgGrid.prototype.GetGridDataSource = function () {
                        return this.gridDataSource;
                    };
                    AgGrid.prototype.SetSorting = function (sorting) {
                        this.sorting = sorting;
                        return this;
                    };
                    AgGrid.prototype.GetSorting = function () {
                        return this.sorting;
                    };
                    AgGrid.prototype.SetFiltering = function (filtering) {
                        this.filtering = filtering;
                        return this;
                    };
                    AgGrid.prototype.GetFiltering = function () {
                        return this.filtering;
                    };
                    AgGrid.prototype.SetTotalCount = function (totalCount) {
                        this.totalCount = totalCount;
                        return this;
                    };
                    AgGrid.prototype.GetTotalCount = function () {
                        return this.totalCount;
                    };
                    return AgGrid;
                }());
                DataGrids.AgGrid = AgGrid;
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=AgGrid.js.map