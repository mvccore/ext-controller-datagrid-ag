declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.Options {
    class DataSource {
        Static: typeof DataSource;
        protected grid: AgGrid;
        protected events: AgGrids.Events;
        protected helpers: AgGrids.Helpers;
        constructor(grid: AgGrid, events: AgGrids.Events, helpers: AgGrids.Helpers);
        Init(): void;
        protected isTouchDevice(): boolean;
    }
}
