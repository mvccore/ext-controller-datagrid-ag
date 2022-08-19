declare namespace MvcCore.Ext.Controllers.DataGrids {
    class AgGrid {
        protected serverConfig: AgGrids.Interfaces.IServerConfig;
        protected initialData: AgGrids.Interfaces.IServerResponse;
        protected grid: agGrid.Grid;
        protected helpers: AgGrids.Helpers;
        protected events: AgGrids.Events;
        protected options: AgGrids.Options;
        protected sorting: [string, 0 | 1][];
        protected filtering: Map<string, Map<AgGrids.Enums.Operator, string[]>>;
        protected totalCount: number | null;
        constructor(serverConfig: AgGrids.Interfaces.IServerConfig, initialData: AgGrids.Interfaces.IServerResponse);
        SetHelpers(helpers: AgGrids.Helpers): this;
        GetHelpers(): AgGrids.Helpers;
        SetEvents(events: AgGrids.Events): this;
        GetEvents(): AgGrids.Events;
        SetOptions(options: AgGrids.Options): this;
        GetOptions(): AgGrids.Options;
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
        protected initSubClasses(): this;
        protected initServerConfig(serverConfig: AgGrids.Interfaces.IServerConfig): this;
        protected initData(initialData: AgGrids.Interfaces.IServerResponse): this;
        protected initOptions(): this;
        protected initGrid(): this;
    }
}
