declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class Helpers {
        protected grid: AgGrid;
        constructor(grid: AgGrid);
        RetypeServerConfigObjects2Maps(serverConfig: Interfaces.IServerConfig): Interfaces.IServerConfig;
        RetypeServerResponseObjects2Maps(serverResponse: Interfaces.IServerResponse): Interfaces.IServerResponse;
        RetypeServerRequestMaps2Objects(serverRequest: Interfaces.IServerRequest): Interfaces.IServerRequest;
        protected convertObject2Map<TKey, TValue>(obj: any): Map<TKey, TValue>;
        protected convertMap2Object<TKey, TValue>(map: Map<TKey, TValue>): object;
    }
}
