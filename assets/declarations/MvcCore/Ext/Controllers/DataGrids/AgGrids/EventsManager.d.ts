declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class EventsManager {
        Static: typeof EventsManager;
        protected grid: AgGrid;
        constructor(grid: AgGrid);
        HandleColumnResized(event: agGrid.ColumnResizedEvent<any>): void;
        HandleColumnMoved(event: agGrid.ColumnMovedEvent<any>): void;
        HandleFilterChanged(event: agGrid.FilterChangedEvent<any>): void;
        HandleSortChange(columnId: string, direction: 1 | 0 | null): void;
        HandleGridSizeChanged(event: agGrid.ViewportChangedEvent<any> | agGrid.GridSizeChangedEvent<any>): void;
    }
}
