declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.DataSources {
    class SinglePageMode extends MvcCore.Ext.Controllers.DataGrids.AgGrids.DataSource implements agGrid.IDatasource {
        Static: typeof SinglePageMode;
        /** If you know up front how many rows are in the dataset, set it here. Otherwise leave blank. */
        rowCount?: number;
        protected pageLoaded: boolean;
        protected initDataCache: boolean;
        protected requestCounter: number;
        protected changeUrlSwitches: Map<string, boolean>;
        protected initLocationHref: string;
        constructor(grid: AgGrid);
        protected initPageReqDataAndCache(): void;
        /** Callback the grid calls that you implement to fetch rows from the server. */
        getRows(params: agGrid.IGetRowsParams): void;
        ExecRequest(reqData: Interfaces.Ajax.IReqRawObj, changeUrl: boolean): this;
        protected possibleToResolveByInitData(params: agGrid.IGetRowsParams, totalCount: number): boolean;
        protected resolveByInitData(params: agGrid.IGetRowsParams, totalCount: number): void;
        protected resolveByAjaxRequest(params: agGrid.IGetRowsParams): void;
    }
}
