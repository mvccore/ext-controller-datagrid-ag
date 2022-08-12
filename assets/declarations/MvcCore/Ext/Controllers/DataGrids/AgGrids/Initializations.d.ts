declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class Initializations {
        Static: typeof Initializations;
        protected static types: Map<string, string>;
        protected grid: AgGrid;
        protected events: AgGrids.Events;
        constructor(grid: AgGrid, events: AgGrids.Events);
        protected init(): void;
        protected initGridColumns(): void;
        protected initGridColumn(urlName: string, serverColumnCfg: AgGrids.IServerConfigs.IColumn): AgGrids.Types.GridColumn;
        protected initGridOptions(): void;
        protected initGridOptionsRowSelection(gridOptions: agGrid.GridOptions<any>): void;
        protected initGridOptionsEvents(gridOptions: agGrid.GridOptions<any>): void;
        protected initGrid(): void;
        protected initGridDataSource(): void;
        protected isTouchDevice(): boolean;
    }
}
