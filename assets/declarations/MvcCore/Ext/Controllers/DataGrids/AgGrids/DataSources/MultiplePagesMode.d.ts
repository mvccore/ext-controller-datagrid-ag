declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.DataSources {
    class MultiplePagesMode extends MvcCore.Ext.Controllers.DataGrids.AgGrids.DataSource {
        Static: typeof MultiplePagesMode;
        protected eventsManager: AgGrids.EventsManagers.MultiplePagesMode;
        constructor(grid: AgGrid);
        protected initPageReqDataAndCache(): void;
        Load(): this;
        ExecRequest(reqData: Interfaces.IServerRequestRaw, changeUrl?: boolean): this;
        protected handleResponse(reqData: Interfaces.IServerRequestRaw, changeUrl: boolean, cacheKey: string, cached: boolean, response: AgGrids.Interfaces.IServerResponse): void;
    }
}
