declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.DataSources {
    class Cache {
        Static: typeof Cache;
        protected maxRows: number;
        protected enabled: boolean;
        protected store: Map<string, Interfaces.IServerResponse>;
        protected keys: string[];
        protected rowsCount: number;
        constructor(grid: AgGrid);
        SetEnabled(enabled: boolean): this;
        Key(obj: any): string;
        Has(key: string): boolean;
        Get(key: string): Interfaces.IServerResponse;
        Add(key: string, response: Interfaces.IServerResponse): this;
        protected removeOldestRecord(): this;
    }
}
