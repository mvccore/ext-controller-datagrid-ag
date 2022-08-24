declare namespace MvcCore.Ext.Controllers.DataGrids {
    class AgGrid {
        protected serverConfig: AgGrids.Interfaces.IServerConfig;
        protected initialData: AgGrids.Interfaces.IServerResponse;
        protected grid: agGrid.Grid;
        protected helpers: AgGrids.Helpers;
        protected eventsManager: AgGrids.EventsManager;
        protected options: AgGrids.Options;
        protected dataSource: AgGrids.DataSource;
        protected sorting: [string, 0 | 1][];
        protected filtering: Map<string, Map<AgGrids.Enums.Operator, string[]>>;
        protected totalCount: number | null;
        protected offset: number;
        constructor(serverConfig: AgGrids.Interfaces.IServerConfig, initialData: AgGrids.Interfaces.IServerResponse);
        SetHelpers(helpers: AgGrids.Helpers): this;
        GetHelpers(): AgGrids.Helpers;
        SetEvents(events: AgGrids.EventsManager): this;
        GetEvents(): AgGrids.EventsManager;
        SetOptions(options: AgGrids.Options): this;
        GetOptions(): AgGrids.Options;
        SetDataSource(dataSource: AgGrids.DataSource): this;
        GetDataSource(): AgGrids.DataSource;
        SetServerConfig(serverConfig: AgGrids.Interfaces.IServerConfig): this;
        GetServerConfig(): AgGrids.Interfaces.IServerConfig;
        SetInitialData(initialData: AgGrids.Interfaces.IServerResponse): this;
        GetInitialData(): AgGrids.Interfaces.IServerResponse;
        SetGrid(grid: agGrid.Grid): this;
        GetGrid(): agGrid.Grid;
        SetSorting(sorting: [string, 0 | 1][]): this;
        GetSorting(): [string, 0 | 1][];
        SetFiltering(filtering: Map<string, Map<AgGrids.Enums.Operator, string[]>>): this;
        GetFiltering(): Map<string, Map<AgGrids.Enums.Operator, string[]>>;
        SetTotalCount(totalCount: number | null): this;
        GetTotalCount(): number | null;
        SetOffset(offset: number): this;
        GetOffset(): number;
        protected initSubClasses(): this;
        protected initPageModeSpecifics(): this;
        protected initServerConfig(serverConfig: AgGrids.Interfaces.IServerConfig): this;
        protected initData(initialData: AgGrids.Interfaces.IServerResponse): this;
        protected initAgOptions(): this;
        protected initGrid(): this;
        protected initDataSource(): this;
    }
}
