declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.Tools {
    class Helpers {
        Static: typeof Helpers;
        protected grid: AgGrid;
        protected touchDevice: boolean;
        protected isChromeBrowser: boolean;
        constructor(grid: AgGrid);
        IsTouchDevice(): boolean;
        IsChromeBrowser(): boolean;
        GetHtmlElementFromString(htmlCode: string): HTMLElement;
        IsInstanceOfIServerRequestRaw(obj: any): boolean;
        RetypeRawServerConfig(serverConfig: Interfaces.IServerConfig): Interfaces.IServerConfig;
        GetAllowedOperators(columnFilterFlags: Enums.FilteringMode): Map<Enums.Operator, AgGrids.Interfaces.SortHeaders.IAllowedOperator>;
        SortConfigColumns(serverColumns: {
            [columnUrlName: string]: AgGrids.Interfaces.IServerConfigs.IColumn;
        }, columnIndexPropName: keyof AgGrids.Interfaces.IServerConfigs.IColumnIndexes): AgGrids.Interfaces.IServerConfigs.IColumn[];
        /**
         * Check if given value contains any LIKE/NOT LIKE special
         * character: `%` or `_` or escaped like this: `[%]` or `[_]`.
         * Returns `0` if no special char `%` or `_` matched.
         * Returns `1` if special char `%` or `_` matched in raw form only, not escaped.
         * Returns `2` if special char `%` or `_` matched in escaped form only.
         * Returns `1 | 2` if special char `%` or `_` matched in both forms.
         */
        CheckFilterValueForLikeChar(rawValue: string, specialLikeChar: '_' | '%'): number;
        static ConvertObject2Map<TKey, TValue>(obj: any): Map<TKey, TValue>;
        static ConvertMap2Object<TKey, TValue>(map: Map<TKey, TValue>): object;
        MergeObjectsRecursively(target: any, ...sources: any[]): any;
        protected isObject(item: any): boolean;
    }
}
