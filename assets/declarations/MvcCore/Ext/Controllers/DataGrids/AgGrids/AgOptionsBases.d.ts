declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class AgOptionsBases {
        Static: typeof AgOptionsBases;
        protected grid: AgGrid;
        protected options: AgGrids.Options;
        protected eventsManager: AgGrids.EventsManager;
        protected helpers: AgGrids.Helpers;
        protected agOptions: agGrid.GridOptions<any>;
        constructor(grid: AgGrid);
        SetAgOptions(options: agGrid.GridOptions<any>): this;
        GetAgOptions(): agGrid.GridOptions<any>;
        Init(): this;
        protected initBases(): this;
        protected initRowSelection(): this;
        protected initEvents(): this;
    }
}
