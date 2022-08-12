declare namespace MvcCore.Ext.Controllers.DataGrids {
    class AgGrid {
        protected serverConfig: AgGrids.IServerConfig;
        protected initialData: AgGrids.IServerResponse;
        protected events: AgGrids.Events;
        protected initialization: AgGrids.Initializations;
        protected grid: agGrid.Grid;
        protected gridElement: HTMLDivElement;
        protected gridOptions: agGrid.GridOptions<any>;
        protected gridColumns: AgGrids.Types.GridColumn[];
        protected gridDataSource: agGrid.IDatasource;
        constructor(serverConfig: AgGrids.IServerConfig, initialData: AgGrids.IServerResponse);
        GetServerConfig(): AgGrids.IServerConfig;
        GetInitialData(): AgGrids.IServerResponse;
        SetGrid(grid: agGrid.Grid): this;
        GetGrid(): agGrid.Grid;
        SetGridElement(gridElement: HTMLDivElement): this;
        GetGridElement(): HTMLDivElement;
        SetGridOptions(gridOptions: agGrid.GridOptions<any>): this;
        GetGridOptions(): agGrid.GridOptions<any>;
        SetGridColumns(gridColumns: AgGrids.Types.GridColumn[]): this;
        GetGridColumns(): AgGrids.Types.GridColumn[];
        SetGridDataSource(gridDataSource: agGrid.IDatasource): this;
        GetGridDataSource(): agGrid.IDatasource;
    }
}
