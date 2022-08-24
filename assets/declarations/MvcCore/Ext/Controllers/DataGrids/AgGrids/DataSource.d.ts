declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class DataSource {
        Static: typeof DataSource;
        protected grid: AgGrid;
        protected options: AgGrids.Options;
        protected eventsManager: AgGrids.EventsManager;
        protected helpers: AgGrids.Helpers;
        protected initialData: Interfaces.IServerResponse;
        constructor(grid: AgGrid);
        protected getReqUrlMethodAndType(): [string, string, string];
    }
}
