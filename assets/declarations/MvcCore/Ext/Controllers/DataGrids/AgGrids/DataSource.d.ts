declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    abstract class DataSource {
        Static: typeof DataSource;
        protected static grid: AgGrid;
        protected grid: AgGrid;
        protected optionsManager: AgGrids.Options.Manager;
        protected eventsManager: AgGrids.EventsManager;
        protected helpers: AgGrids.Tools.Helpers;
        protected initialData: Interfaces.Ajax.IResponse;
        protected cache: DataSources.Cache;
        protected pageReqData?: Interfaces.Ajax.IReqRawObj;
        constructor(grid: AgGrid);
        abstract ExecRequest(reqData: Interfaces.Ajax.IReqRawObj, changeUrl: boolean): this;
        protected handleResponseControls(response: AgGrids.Interfaces.Ajax.IResponse): void;
        protected initPageReqDataAndCache(): void;
        protected getReqUrlMethodAndType(): [string, string, string];
        static RetypeRawServerResponse(serverResponse: Interfaces.Ajax.IResponse): Interfaces.Ajax.IResponse;
        static RetypeRequestObjects2Maps(serverRequest: Interfaces.Ajax.IReqRawObj): Interfaces.Ajax.IRequest;
        protected static retypeFilteringObj2Map(filtering: any): Map<string, Map<Enums.Operator, string[]>>;
        static RetypeFilteringMap2Obj(filtering: Map<string, Map<Enums.Operator, string[]>>): any;
        static RetypeRequestMaps2Objects(serverRequest: Interfaces.Ajax.IRequest): Interfaces.Ajax.IReqRawObj;
        protected static addRequestSystemData(serverRequest: Interfaces.Ajax.IReqRawObj): Interfaces.Ajax.IReqRawObj;
    }
}
