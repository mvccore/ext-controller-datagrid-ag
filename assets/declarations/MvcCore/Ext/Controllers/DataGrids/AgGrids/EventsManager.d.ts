declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class EventsManager {
        static readonly COLUMN_CHANGES_TIMEOUT = 500;
        Static: typeof EventsManager;
        protected grid: AgGrid;
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
        protected handlers: Map<Types.GridEventName, Types.GridEventHandler[]>;
        protected autoSelectFirstRow: boolean;
        protected onLoadSelectionIndex: number | null;
        protected onLoadSelectionCallback: () => void;
        constructor(grid: AgGrid);
        SetAutoSelectFirstRow(autoSelectFirstRow: boolean): this;
        GetAutoSelectFirstRow(): boolean;
        SetOnLoadSelectionIndex(rowIndexToSelectAfterLoad: number, onLoadSelectionCallback?: () => void): this;
        AddEventListener<K extends keyof Interfaces.Events.IHandlersMap>(eventName: Types.GridEventName, handler: (e: Interfaces.Events.IHandlersMap[K]) => void): this;
        RemoveEventListener<K extends keyof Interfaces.Events.IHandlersMap>(eventName: Types.GridEventName, handler: (e: Interfaces.Events.IHandlersMap[K]) => void): this;
        FireHandlers(eventName: Types.GridEventName, event: Interfaces.Events.IBase): this;
        HandleModelUpdated(params: agGrid.ModelUpdatedEvent<any>): void;
        SelectRowByIndex(rowIndex: number, onLoadSelectionCallback?: () => void): this;
        HandleGridReady(event: agGrid.GridReadyEvent<any>): void;
        HandleSelectionChange(event: agGrid.SelectionChangedEvent<any>): void;
        HandleColumnResized(event: agGrid.ColumnResizedEvent<any>): void;
        HandleColumnMoved(event: agGrid.ColumnMovedEvent<any>): void;
        protected handleColumnChangesSent(): void;
        protected handleColumnChangesResponse(): void;
        HandleFilterMenuChange(columnId: string, filteringItem: Map<Enums.Operator, string[]> | null, clearAllOther?: boolean): void;
        HandleFilterHeaderChange(columnId: string, rawInputValue: string, clearAllOther?: boolean): void;
        firefiltering(filtering: Map<string, Map<Enums.Operator, string[]>>): this;
        HandleSortChange(columnId: string, direction: AgGrids.Types.SortDirNullable): void;
        HandleGridSizeChanged(viewPort: boolean, event: agGrid.ViewportChangedEvent<any> | agGrid.GridSizeChangedEvent<any>): void;
        AddUrlChangeEvent(): this;
        HandleExecChange(offset?: number, sorting?: Types.SortItem[] | false, filtering?: Map<string, Map<Enums.Operator, string[]>> | false): void;
        HandleUrlChange(e: PopStateEvent): void;
        HandleResponseLoaded(response: AgGrids.Interfaces.Ajax.IResponse, selectFirstRow?: boolean): void;
        protected handleUrlChangeSortsFilters(reqData: Interfaces.Ajax.IRequest): this;
        protected getOperatorsAndPrefixesByRawValue(rawValue: string): Map<Enums.Operator, string>;
        protected getOperatorByRawValue(rawValue: string, operatorsAndPrefixes: Map<Enums.Operator, string>, columnFilterCfg: number | boolean): [string, Enums.Operator | null];
    }
}
