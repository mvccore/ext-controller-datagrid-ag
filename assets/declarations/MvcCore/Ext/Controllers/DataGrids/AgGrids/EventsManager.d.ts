declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class EventsManager {
        Static: typeof EventsManager;
        protected grid: AgGrid;
        constructor(grid: AgGrid);
        HandleColumnResized(params: agGrid.ColumnResizedEvent): void;
        HandleColumnMoved(params: agGrid.ColumnMovedEvent): void;
        HandleFilterChanged(params: agGrid.FilterChangedEvent): void;
        HandleSortChanged(params: agGrid.SortChangedEvent): void;
        HandleGridSizeChanged(params: agGrid.ViewportChangedEvent<any> | agGrid.GridSizeChangedEvent<any>): void;
    }
}
