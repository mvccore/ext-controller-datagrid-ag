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
                        this.serverConfig = serverConfig;
                        this.initialData = initialData;
                        this.events = new DataGrids.AgGrids.Events(this);
                        this.initialization = new DataGrids.AgGrids.Initializations(this, this.events);
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
                    return AgGrid;
                }());
                DataGrids.AgGrid = AgGrid;
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=AgGrid.js.map