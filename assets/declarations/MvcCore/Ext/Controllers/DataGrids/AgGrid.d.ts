declare namespace MvcCore.Ext.Controllers.DataGrids {
    class AgGrid {
        protected serverConfig: AgGrids.Interfaces.IServerConfig;
        protected initialData: AgGrids.Interfaces.IServerResponse;
        protected events: AgGrids.Events;
        protected initialization: AgGrids.Initializations;
        protected grid: agGrid.Grid;
        protected gridElement: HTMLDivElement;
        protected gridOptions: agGrid.GridOptions<any>;
        protected gridColumns: AgGrids.Types.GridColumn[];
        protected gridDataSource: agGrid.IDatasource;
        protected helpers: AgGrids.Helpers;
        protected sorting: [string, 0 | 1][];
        protected filtering: Map<string, Map<AgGrids.Enums.Operator, string[]>>;
        protected totalCount: number | null;
        constructor(serverConfig: AgGrids.Interfaces.IServerConfig, initialData: AgGrids.Interfaces.IServerResponse);
        GetServerConfig(): AgGrids.Interfaces.IServerConfig;
        GetInitialData(): AgGrids.Interfaces.IServerResponse;
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
        SetSorting(sorting: [string, 0 | 1][]): this;
        GetSorting(): [string, 0 | 1][];
        SetFiltering(filtering: Map<string, Map<AgGrids.Enums.Operator, string[]>>): this;
        GetFiltering(): Map<string, Map<AgGrids.Enums.Operator, string[]>>;
        SetTotalCount(totalCount: number | null): this;
        GetTotalCount(): number | null;
    }
}
