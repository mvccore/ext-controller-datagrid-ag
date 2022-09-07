declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    abstract class DataSource {
        Static: typeof DataSource;
        protected static grid: AgGrid;
        protected grid: AgGrid;
        protected options: AgGrids.Options;
        protected eventsManager: AgGrids.EventsManager;
        protected helpers: AgGrids.Helpers;
        protected initialData: Interfaces.IServerResponse;
        protected cache: DataSources.Cache;
        protected pageReqData?: Interfaces.IServerRequestRaw;
        constructor(grid: AgGrid);
        abstract ExecRequest(reqData: Interfaces.IServerRequestRaw, changeUrl: boolean): this;
        protected initPageReqDataAndCache(): void;
        protected getReqUrlMethodAndType(): [string, string, string];
        static RetypeRawServerResponse(serverResponse: Interfaces.IServerResponse): Interfaces.IServerResponse;
        static RetypeRequestObjects2Maps(serverRequest: Interfaces.IServerRequestRaw): Interfaces.IServerRequest;
        protected static retypeFilteringObj2Map(filtering: any): Map<string, Map<Enums.Operator, string[]>>;
        static RetypeFilteringMap2Obj(filtering: Map<string, Map<Enums.Operator, string[]>>): any;
        protected static retypeRequestMaps2Objects(serverRequest: Interfaces.IServerRequest): Interfaces.IServerRequestRaw;
        protected static addRequestSystemData(serverRequest: Interfaces.IServerRequestRaw): Interfaces.IServerRequestRaw;
    }
}
