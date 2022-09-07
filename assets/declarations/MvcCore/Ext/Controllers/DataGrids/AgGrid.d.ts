declare namespace MvcCore.Ext.Controllers.DataGrids {
    class AgGrid {
        protected serverConfig: AgGrids.Interfaces.IServerConfig;
        protected initialData: AgGrids.Interfaces.IServerResponse;
        protected grid: agGrid.Grid;
        protected agGridApi: agGrid.GridApi<any>;
        protected agColumnApi: agGrid.ColumnApi;
        protected helpers: AgGrids.Helpers;
        protected translator: AgGrids.Translator;
        protected eventsManager: AgGrids.EventsManager;
        protected options: AgGrids.Options;
        protected dataSource: AgGrids.DataSource;
        protected sortHeaders: Map<string, AgGrids.ColumnsManagers.SortHeader>;
        protected filterHeaders: Map<string, AgGrids.ColumnsManagers.FilterHeader>;
        protected filterMenus: Map<string, AgGrids.ColumnsManagers.FilterMenu>;
        protected sorting: AgGrids.Types.SortItem[];
        protected filtering: Map<string, Map<AgGrids.Enums.Operator, string[]>>;
        protected totalCount: number | null;
        protected offset: number;
        protected gridPath: string;
        protected pageMode: AgGrids.Enums.ClientPageMode;
        protected columnsMenu: AgGrids.ColumnsMenu;
        constructor(serverConfig: AgGrids.Interfaces.IServerConfig, initialData: AgGrids.Interfaces.IServerResponse);
        SetHelpers(helpers: AgGrids.Helpers): this;
        GetHelpers(): AgGrids.Helpers;
        SetEvents(events: AgGrids.EventsManager): this;
        GetEvents(): AgGrids.EventsManager;
        SetTranslator(translator: AgGrids.Translator): this;
        GetTranslator(): AgGrids.Translator;
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
        SetGridApi(agGridApi: agGrid.GridApi<any>): this;
        GetGridApi(): agGrid.GridApi<any>;
        SetGridColumnApi(agColumnApi: agGrid.ColumnApi): this;
        GetGridColumnApi(): agGrid.ColumnApi;
        SetSorting(sorting: AgGrids.Types.SortItem[]): this;
        GetSorting(): AgGrids.Types.SortItem[];
        SetFiltering(filtering: Map<string, Map<AgGrids.Enums.Operator, string[]>>): this;
        GetFiltering(): Map<string, Map<AgGrids.Enums.Operator, string[]>>;
        SetTotalCount(totalCount: number | null): this;
        GetTotalCount(): number | null;
        SetPageMode(pageMode: AgGrids.Enums.ClientPageMode): this;
        GetPageMode(): AgGrids.Enums.ClientPageMode;
        SetOffset(offset: number): this;
        GetOffset(): number;
        SetGridPath(gridPath: string): this;
        GetGridPath(): string;
        SetSortHeaders(sortHeaders: Map<string, AgGrids.ColumnsManagers.SortHeader>): this;
        GetSortHeaders(): Map<string, AgGrids.ColumnsManagers.SortHeader>;
        SetFilterHeaders(filterHeaders: Map<string, AgGrids.ColumnsManagers.FilterHeader>): this;
        GetFilterHeaders(): Map<string, AgGrids.ColumnsManagers.FilterHeader>;
        SetFilterMenus(filterMenus: Map<string, AgGrids.ColumnsManagers.FilterMenu>): this;
        GetFilterMenus(): Map<string, AgGrids.ColumnsManagers.FilterMenu>;
        SetColumnsMenu(columnsMenu: AgGrids.ColumnsMenu): this;
        GetColumnsMenu(): AgGrids.ColumnsMenu;
        AddEventListener<K extends keyof AgGrids.Interfaces.IGridEvensHandlersMap>(eventName: K, handler: (a: AgGrids.Interfaces.IGridEvensHandlersMap[K]) => void): this;
        RemoveEventListener<K extends keyof AgGrids.Interfaces.IGridEvensHandlersMap>(eventName: K, handler: (e: AgGrids.Interfaces.IGridEvensHandlersMap[K]) => void): this;
        ExecChange(offset?: number, sorting?: AgGrids.Types.SortItem[], filtering?: Map<string, Map<AgGrids.Enums.Operator, string[]>>): this;
        protected initSubClasses(): this;
        protected initPageModeSpecifics(): this;
        protected initServerConfig(serverConfig: AgGrids.Interfaces.IServerConfig): this;
        protected initTranslator(): this;
        protected initData(initialData: AgGrids.Interfaces.IServerResponse): this;
        protected initAgOptions(): this;
        protected initGrid(): this;
        protected initDataSource(): this;
        protected initColumnsMenu(): this;
    }
}
