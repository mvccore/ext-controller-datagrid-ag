declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class Helpers {
        protected grid: AgGrid;
        protected touchDevice: boolean;
        protected isChromeBrowser: boolean;
        constructor(grid: AgGrid);
        IsTouchDevice(): boolean;
        IsChromeBrowser(): boolean;
        GetHtmlElementFromString(htmlCode: string): HTMLElement;
        RetypeRawServerConfig(serverConfig: Interfaces.IServerConfig): Interfaces.IServerConfig;
        RetypeRawServerResponse(serverResponse: Interfaces.IServerResponse): Interfaces.IServerResponse;
        RetypeRequest2RawRequest(serverRequest: Interfaces.IServerRequest): Interfaces.IServerRequestRaw;
        IsInstanceOfIServerRequestRaw(obj: any): boolean;
        protected convertObject2Map<TKey, TValue>(obj: any): Map<TKey, TValue>;
        protected convertMap2Object<TKey, TValue>(map: Map<TKey, TValue>): object;
    }
}
