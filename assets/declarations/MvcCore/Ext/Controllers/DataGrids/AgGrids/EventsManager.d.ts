declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class EventsManager {
        Static: typeof EventsManager;
        protected grid: AgGrid;
        protected multiSorting: boolean;
        protected multiFiltering: boolean;
        protected defaultAllowedOperators: Map<Enums.Operator, Interfaces.IAllowedOperator>;
        protected columnsAllowedOperators: Map<string, Map<Enums.Operator, Interfaces.IAllowedOperator>>;
        protected helpers: Helpers;
        protected likeOperatorsAndPrefixes: Map<Enums.Operator, string>;
        protected notLikeOperatorsAndPrefixes: Map<Enums.Operator, string>;
        constructor(grid: AgGrid);
        HandleColumnResized(event: agGrid.ColumnResizedEvent<any>): void;
        HandleColumnMoved(event: agGrid.ColumnMovedEvent<any>): void;
        HandleFilterMenuChange(columnId: string, filteringItem: Map<Enums.Operator, string[]> | null): void;
        HandleFilterHeaderChange(columnId: string, rawInputValue: string): void;
        firefiltering(filtering: Map<string, Map<Enums.Operator, string[]>>): this;
        HandleSortChange(columnId: string, direction: AgGrids.Types.SortDirNullable): void;
        HandleGridSizeChanged(event: agGrid.ViewportChangedEvent<any> | agGrid.GridSizeChangedEvent<any>): void;
        AddUrlChangeEvent(): this;
        HandleUrlChange(e: PopStateEvent): void;
        HandleResponseLoaded(response: AgGrids.Interfaces.IServerResponse): void;
        protected handleUrlChangeSortsFilters(reqData: Interfaces.IServerRequest): this;
        protected getOperatorsAndPrefixesByRawValue(rawValue: string): Map<Enums.Operator, string>;
        protected getOperatorByRawValue(rawValue: string, operatorsAndPrefixes: Map<Enums.Operator, string>, columnFilterCfg: number | boolean): [string, Enums.Operator | null];
    }
}
