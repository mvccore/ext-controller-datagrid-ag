declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.Options {
    class Base {
        Static: typeof Base;
        protected grid: AgGrid;
        protected events: AgGrids.Events;
        protected helpers: AgGrids.Helpers;
        constructor(grid: AgGrid, events: AgGrids.Events, helpers: AgGrids.Helpers);
        protected init(): void;
        protected initGridColumns(): void;
        protected initGridColumn(columnUrlName: string, serverColumnCfg: AgGrids.Interfaces.IServerConfigs.IColumn): AgGrids.Types.GridColumn;
        protected initGridOptions(): void;
        protected initGridOptionsRowSelection(gridOptions: agGrid.GridOptions<any>): void;
        protected initGridOptionsEvents(gridOptions: agGrid.GridOptions<any>): void;
        protected initGrid(): void;
        protected initGridDataSource(): void;
        protected isTouchDevice(): boolean;
    }
}
