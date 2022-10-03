declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    abstract class DataSource {
        Static: typeof DataSource;
        protected grid: AgGrid;
        protected optionsManager: AgGrids.Options.Manager;
        protected eventsManager: AgGrids.EventsManager;
        protected helpers: AgGrids.Tools.Helpers;
        protected initialData: Interfaces.Ajax.IResponse;
        protected cache: DataSources.Cache;
        protected pageReqData?: Interfaces.Ajax.IReqRawObj;
        protected serverConfig: Interfaces.IServerConfig;
        protected docTitleChange: boolean;
        protected docTitlePattern: string;
        constructor(grid: AgGrid);
        abstract ExecRequest(reqData: Interfaces.Ajax.IReqRawObj, changeUrl: boolean): this;
        protected browserHistoryReplace(stateData: Interfaces.Ajax.IReqRawObj, url: string, page: number, count: number): this;
        protected browserHistoryPush(stateData: Interfaces.Ajax.IReqRawObj, url: string, page: number, count: number): this;
        protected completeDocumentTitle(stateData: Interfaces.Ajax.IReqRawObj, page: number, count: number): string;
        protected completeDocumentTitleSorting(sorting: Types.SortItem[], docTitleReplacements: string[]): this;
        protected completeDocumentTitleFiltering(stateDataFiltering: any, docTitleReplacements: string[]): this;
        protected completeDocumentTitleFilteringItem(columnUrlName: string, filteringItem: any): Map<Enums.FilterControlType, string[]>;
        protected handleResponseControls(response: AgGrids.Interfaces.Ajax.IResponse): void;
        protected initPageReqDataAndCache(): void;
        protected getReqUrlMethodAndType(): [string, string, string];
    }
}
