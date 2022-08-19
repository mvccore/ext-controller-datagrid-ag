declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.SubOptions {
    class DataSource implements agGrid.IDatasource {
        Static: typeof DataSource;
        /** If you know up front how many rows are in the dataset, set it here. Otherwise leave blank. */
        rowCount?: number;
        protected grid: AgGrid;
        protected options: AgGrids.Options;
        protected events: AgGrids.Events;
        protected helpers: AgGrids.Helpers;
        protected initialData: Interfaces.IServerResponse;
        protected pageLoaded: boolean;
        constructor(grid: AgGrid);
        /** Callback the grid calls that you implement to fetch rows from the server. */
        getRows(params: agGrid.IGetRowsParams): void;
        /** Optional destroy method, if your datasource has state it needs to clean up. */
        destroy(): void;
    }
}
