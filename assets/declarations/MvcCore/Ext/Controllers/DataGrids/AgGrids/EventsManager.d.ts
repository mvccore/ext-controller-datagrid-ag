declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class EventsManager extends AgGrids.EventsManagers.Base {
        Static: typeof EventsManager;
        protected multiSorting: boolean;
        protected multiFiltering: boolean;
        protected defaultAllowedOperators: Map<Enums.Operator, Interfaces.SortHeaders.IAllowedOperator>;
        protected columnsAllowedOperators: Map<string, Map<Enums.Operator, Interfaces.SortHeaders.IAllowedOperator>>;
        protected helpers: Tools.Helpers;
        protected likeOperatorsAndPrefixes: Map<Enums.Operator, string>;
        protected notLikeOperatorsAndPrefixes: Map<Enums.Operator, string>;
        protected columnsChanges: Map<string, Interfaces.EventArgs.IColumnChange>;
        protected columnsChangesTimeout: number;
        protected columnsChangesSending: boolean;
        protected automaticSelectionChange: boolean;
        constructor(grid: AgGrid, serverConfig?: AgGrids.Interfaces.IServerConfig);
        HandleModelUpdated(params: agGrid.ModelUpdatedEvent<any>): void;
        SelectRowByIndex(rowIndex: number, onLoadSelectionCallback?: () => void): this;
        HandleGridReady(event: agGrid.GridReadyEvent<any>): void;
        HandleSelectionChange(event: agGrid.SelectionChangedEvent<any>): void;
        HandleColumnResized(event: agGrid.ColumnResizedEvent<any>): void;
        HandleColumnMoved(event: agGrid.ColumnMovedEvent<any>): void;
        GetNewFilteringByMenu(columnId: string, filteringItem: Map<Enums.Operator, string[]> | null, clearAllOther?: boolean): [boolean, Map<string, Map<Enums.Operator, string[]>>];
        HandleFilterMenuChange(columnId: string, filterRemoving: boolean, filteringBefore: Map<string, Map<Enums.Operator, string[]>>, filteringAfter: Map<string, Map<Enums.Operator, string[]>>): void;
        GetNewFilteringByHeader(columnId: string, rawInputValue: string, clearAllOther?: boolean): [boolean, Map<string, Map<Enums.Operator, string[]>>];
        HandleFilterHeaderChange(columnId: string, filterRemoving: boolean, filteringBefore: Map<string, Map<Enums.Operator, string[]>>, filteringAfter: Map<string, Map<Enums.Operator, string[]>>): void;
        GetNewSorting(columnId: string, direction: AgGrids.Types.SortDirNullable): AgGrids.Types.SortItem[];
        HandleSortChange(sortingBefore: AgGrids.Types.SortItem[], sortingAfter: AgGrids.Types.SortItem[]): void;
        HandleGridSizeChanged(viewPort: boolean, event: agGrid.ViewportChangedEvent<any> | agGrid.GridSizeChangedEvent<any>): void;
        AddUrlChangeEvent(): this;
        HandleExecChange(offset?: number, sorting?: Types.SortItem[] | false, filtering?: Map<string, Map<Enums.Operator, string[]>> | false): void;
        HandleUrlChange(e: PopStateEvent): void;
        HandleResponseLoaded(response: AgGrids.Interfaces.Ajax.IResponse, selectFirstRow?: boolean): void;
        protected firefiltering(filteringBefore: Map<string, Map<Enums.Operator, string[]>>, filteringAfter: Map<string, Map<Enums.Operator, string[]>>): this;
        protected handleColumnChangesSent(): void;
        protected handleColumnChangesResponse(): void;
        protected handleUrlChangeSortsFilters(reqData: Interfaces.Ajax.IRequest): this;
        protected getOperatorsAndPrefixesByRawValue(rawValue: string): Map<Enums.Operator, string>;
    }
}
