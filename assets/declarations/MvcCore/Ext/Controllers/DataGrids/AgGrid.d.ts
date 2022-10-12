declare namespace MvcCore.Ext.Controllers.DataGrids {
    class AgGrid {
        static Classes: AgGrids.Interfaces.IClasses;
        Static: typeof AgGrid;
        protected serverConfig: AgGrids.Interfaces.IServerConfig;
        protected initialData: AgGrids.Interfaces.Ajax.IResponse;
        protected grid: agGrid.Grid;
        protected agGridApi: agGrid.GridApi<any>;
        protected agColumnApi: agGrid.ColumnApi;
        protected helpers: AgGrids.Tools.Helpers;
        protected translator: AgGrids.Tools.Translator;
        protected eventsManager: AgGrids.EventsManager;
        protected optionsManager: AgGrids.Options.Manager;
        protected dataSource: AgGrids.DataSource;
        protected sortHeaders: Map<string, AgGrids.Columns.SortHeader>;
        protected filterHeaders: Map<string, AgGrids.Columns.FilterHeader>;
        protected filterMenus: Map<string, AgGrids.Columns.FilterMenu>;
        protected sorting: AgGrids.Types.SortItem[];
        protected filtering: Map<string, Map<AgGrids.Enums.Operator, string[]>>;
        protected totalCount: number | null;
        protected offset: number;
        protected limit: number;
        protected gridPath: string;
        protected selectedRowNodes: agGrid.RowNode<any>[];
        protected pageMode: AgGrids.Enums.ClientPageMode;
        protected columnsVisibilityMenu: AgGrids.Columns.VisibilityMenu;
        protected internalSelectionChange: boolean;
        constructor(serverConfig: AgGrids.Interfaces.IServerConfig, initialData: AgGrids.Interfaces.Ajax.IResponse);
        SetHelpers(helpers: AgGrids.Tools.Helpers): this;
        GetHelpers(): AgGrids.Tools.Helpers;
        SetEvents(events: AgGrids.EventsManager): this;
        GetEvents(): AgGrids.EventsManager;
        SetTranslator(translator: AgGrids.Tools.Translator): this;
        GetTranslator(): AgGrids.Tools.Translator;
        SetOptionsManager(optionsManager: AgGrids.Options.Manager): this;
        GetOptionsManager(): AgGrids.Options.Manager;
        SetDataSource(dataSource: AgGrids.DataSource): this;
        GetDataSource(): AgGrids.DataSource;
        SetServerConfig(serverConfig: AgGrids.Interfaces.IServerConfig): this;
        GetServerConfig(): AgGrids.Interfaces.IServerConfig;
        SetInitialData(initialData: AgGrids.Interfaces.Ajax.IResponse): this;
        GetInitialData(): AgGrids.Interfaces.Ajax.IResponse;
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
        SetLimit(limit: number): this;
        GetLimit(): number;
        SetGridPath(gridPath: string): this;
        GetGridPath(): string;
        SetSelectedRowNodes(selectedRowNodes: agGrid.RowNode<any>[], fireChangeEvent?: boolean): this;
        GetSelectedRowNodes(): agGrid.RowNode<any>[];
        GetInternalSelectionChange(): boolean;
        SetSortHeaders(sortHeaders: Map<string, AgGrids.Columns.SortHeader>): this;
        GetSortHeaders(): Map<string, AgGrids.Columns.SortHeader>;
        SetFilterHeaders(filterHeaders: Map<string, AgGrids.Columns.FilterHeader>): this;
        GetFilterHeaders(): Map<string, AgGrids.Columns.FilterHeader>;
        SetFilterMenus(filterMenus: Map<string, AgGrids.Columns.FilterMenu>): this;
        GetFilterMenus(): Map<string, AgGrids.Columns.FilterMenu>;
        SetColumnsVisibilityMenu(columnsVisibilityMenu: AgGrids.Columns.VisibilityMenu): this;
        GetColumnsVisibilityMenu(): AgGrids.Columns.VisibilityMenu;
        AddEventListener<TEventName extends keyof AgGrids.Interfaces.IHandlersMap>(eventName: TEventName, handler: (a: AgGrids.Interfaces.IHandlersMap[TEventName]) => void): this;
        RemoveEventListener<TEventName extends keyof AgGrids.Interfaces.IHandlersMap>(eventName: TEventName, handler: (e: AgGrids.Interfaces.IHandlersMap[TEventName]) => void): this;
        ExecChange(offset?: number, sorting?: AgGrids.Types.SortItem[] | false, filtering?: Map<string, Map<AgGrids.Enums.Operator, string[]>> | false): this;
        protected initSubClasses(): this;
        protected initServerConfig(serverConfig: AgGrids.Interfaces.IServerConfig): this;
        protected initTranslator(): this;
        protected initPageModeSpecifics(): this;
        protected initData(initialData: AgGrids.Interfaces.Ajax.IResponse): this;
        protected initAgOptions(): this;
        protected initGrid(): this;
        protected initDataSource(): this;
        protected initColumnsMenu(): this;
    }
}
