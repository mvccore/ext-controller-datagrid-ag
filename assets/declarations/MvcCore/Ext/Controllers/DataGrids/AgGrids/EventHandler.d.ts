declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class Events {
        protected grid: AgGrid;
        constructor(grid: AgGrid);
        AddPagingEvents(): this;
        RemovePagingEvents(): this;
        protected handlePagingClick(offset: number, e: MouseEvent): void;
        HandleColumnResized(params: agGrid.ColumnResizedEvent): void;
        HandleColumnMoved(params: agGrid.ColumnMovedEvent): void;
        HandleFilterChanged(params: agGrid.FilterChangedEvent): void;
        HandleSortChanged(params: agGrid.SortChangedEvent): void;
        HandleGridSizeChanged(params: agGrid.ViewportChangedEvent<any> | agGrid.GridSizeChangedEvent<any>): void;
    }
}
