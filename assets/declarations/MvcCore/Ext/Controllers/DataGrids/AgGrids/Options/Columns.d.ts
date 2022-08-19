declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.Options {
    class Columns {
        Static: typeof Columns;
        protected static types: Map<string, string>;
        protected grid: AgGrid;
        protected events: AgGrids.Events;
        protected helpers: AgGrids.Helpers;
        constructor(grid: AgGrid, events: AgGrids.Events, helpers: AgGrids.Helpers);
        Init(): void;
        protected initColumn(columnUrlName: string, serverColumnCfg: AgGrids.Interfaces.IServerConfigs.IColumn): AgGrids.Types.GridColumn;
    }
}
