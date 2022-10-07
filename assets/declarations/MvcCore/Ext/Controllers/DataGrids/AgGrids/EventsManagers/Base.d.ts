declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.EventsManagers {
    class Base {
        static readonly COLUMN_CHANGES_TIMEOUT = 500;
        Static: typeof Base;
        protected grid: AgGrid;
        protected autoSelectFirstRow: boolean;
        protected handlers: Map<Types.GridEventName, Types.GridEventHandler[]>;
        protected onLoadSelectionIndex: number | null;
        protected onLoadSelectionCallback: () => void;
        constructor(grid: AgGrid, serverConfig: AgGrids.Interfaces.IServerConfig);
        SetAutoSelectFirstRow(autoSelectFirstRow: boolean): this;
        GetAutoSelectFirstRow(): boolean;
        AddEventListener<K extends keyof Interfaces.Events.IHandlersMap>(eventName: Types.GridEventName, handler: (e: Interfaces.Events.IHandlersMap[K]) => void): this;
        RemoveEventListener<K extends keyof Interfaces.Events.IHandlersMap>(eventName: Types.GridEventName, handler: (e: Interfaces.Events.IHandlersMap[K]) => void): this;
        FireHandlers(eventName: Types.GridEventName, event: Interfaces.Events.IBase): this;
        SetOnLoadSelectionIndex(rowIndexToSelectAfterLoad: number, onLoadSelectionCallback?: () => void): this;
        protected static getOperatorByRawValue(rawValue: string, operatorsAndPrefixes: Map<Enums.Operator, string>, columnFilterCfg: number | boolean): [string, Enums.Operator | null];
    }
}
