declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.EventsManagers {
    class MultiplePagesMode extends MvcCore.Ext.Controllers.DataGrids.AgGrids.EventsManager {
        Static: typeof MultiplePagesMode;
        protected grid: AgGrid;
        constructor(grid: AgGrid);
        AddPagingEvents(): this;
        RemovePagingEvents(): this;
        protected handlePagingClick(offset: number, e: MouseEvent): void;
        AddWindowPopStateChangeEvent(): this;
    }
}
