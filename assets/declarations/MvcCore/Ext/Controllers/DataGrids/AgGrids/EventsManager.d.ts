declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class EventsManager {
        Static: typeof EventsManager;
        protected grid: AgGrid;
        constructor(grid: AgGrid);
        HandleColumnResized(event: agGrid.ColumnResizedEvent<any>): void;
        HandleColumnMoved(event: agGrid.ColumnMovedEvent<any>): void;
        HandleFilterChanged(event: agGrid.FilterChangedEvent<any>): void;
        HandleSortChanged(event: agGrid.SortChangedEvent<any>): void;
        HandleGridSizeChanged(event: agGrid.ViewportChangedEvent<any> | agGrid.GridSizeChangedEvent<any>): void;
    }
}
