declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class EventsManager {
        static readonly COLUMN_CHANGES_TIMEOUT = 2000;
        Static: typeof EventsManager;
        protected grid: AgGrid;
        protected multiSorting: boolean;
        protected multiFiltering: boolean;
        protected defaultAllowedOperators: Map<Enums.Operator, Interfaces.IAllowedOperator>;
        protected columnsAllowedOperators: Map<string, Map<Enums.Operator, Interfaces.IAllowedOperator>>;
        protected helpers: Helpers;
        protected likeOperatorsAndPrefixes: Map<Enums.Operator, string>;
        protected notLikeOperatorsAndPrefixes: Map<Enums.Operator, string>;
        protected columnsChanges: Map<string, Interfaces.IColumnChange>;
        protected columnsChangesTimeout: number;
        protected columnsChangesSending: boolean;
        protected handlers: Map<Types.GridEventName, Types.GridEventHandler[]>;
        constructor(grid: AgGrid);
        AddEventListener<K extends keyof Interfaces.IGridEvensHandlersMap>(eventName: Types.GridEventName, handler: (e: Interfaces.IGridEvensHandlersMap[K]) => void): this;
        RemoveEventListener<K extends keyof Interfaces.IGridEvensHandlersMap>(eventName: Types.GridEventName, handler: (e: Interfaces.IGridEvensHandlersMap[K]) => void): this;
        FireHandlers(eventName: Types.GridEventName, event: Interfaces.IGridEvent): this;
        HandleSelectionChange(event: agGrid.SelectionChangedEvent<any>): void;
        HandleColumnResized(event: agGrid.ColumnResizedEvent<any>): void;
        HandleColumnMoved(event: agGrid.ColumnMovedEvent<any>): void;
        protected handleColumnChangesSent(): void;
        protected handleColumnChangesResponse(): void;
        HandleFilterMenuChange(columnId: string, filteringItem: Map<Enums.Operator, string[]> | null): void;
        HandleFilterHeaderChange(columnId: string, rawInputValue: string): void;
        firefiltering(filtering: Map<string, Map<Enums.Operator, string[]>>): this;
        HandleSortChange(columnId: string, direction: AgGrids.Types.SortDirNullable): void;
        HandleGridSizeChanged(viewPort: boolean, event: agGrid.ViewportChangedEvent<any> | agGrid.GridSizeChangedEvent<any>): void;
        AddUrlChangeEvent(): this;
        HandleExecChange(offset: number, sorting: Types.SortItem[], filtering: Map<string, Map<Enums.Operator, string[]>>): void;
        HandleUrlChange(e: PopStateEvent): void;
        HandleResponseLoaded(response: AgGrids.Interfaces.IServerResponse): void;
        protected handleUrlChangeSortsFilters(reqData: Interfaces.IServerRequest): this;
        protected getOperatorsAndPrefixesByRawValue(rawValue: string): Map<Enums.Operator, string>;
        protected getOperatorByRawValue(rawValue: string, operatorsAndPrefixes: Map<Enums.Operator, string>, columnFilterCfg: number | boolean): [string, Enums.Operator | null];
    }
}
