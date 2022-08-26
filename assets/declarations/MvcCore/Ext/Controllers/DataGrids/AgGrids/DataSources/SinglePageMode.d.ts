declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.DataSources {
    class SinglePageMode extends MvcCore.Ext.Controllers.DataGrids.AgGrids.DataSource implements agGrid.IDatasource {
        Static: typeof SinglePageMode;
        /** If you know up front how many rows are in the dataset, set it here. Otherwise leave blank. */
        rowCount?: number;
        protected pageLoaded: boolean;
        protected initDataCache: boolean;
        constructor(grid: AgGrid);
        /** Optional destroy method, if your datasource has state it needs to clean up. */
        destroy(): void;
        /** Callback the grid calls that you implement to fetch rows from the server. */
        getRows(params: agGrid.IGetRowsParams): void;
        protected possibleToResolveByInitData(params: agGrid.IGetRowsParams, totalCount: number): boolean;
        protected resolveByInitData(params: agGrid.IGetRowsParams, totalCount: number): void;
        protected resolveByAjaxRequest(params: agGrid.IGetRowsParams): void;
    }
}
