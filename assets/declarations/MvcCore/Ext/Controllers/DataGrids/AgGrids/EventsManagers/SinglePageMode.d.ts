declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.EventsManagers {
    class SinglePageMode extends MvcCore.Ext.Controllers.DataGrids.AgGrids.EventsManager {
        Static: typeof SinglePageMode;
        protected grid: AgGrid;
        constructor(grid: AgGrid);
        AddWindowPopStateChangeEvent(): this;
    }
}
