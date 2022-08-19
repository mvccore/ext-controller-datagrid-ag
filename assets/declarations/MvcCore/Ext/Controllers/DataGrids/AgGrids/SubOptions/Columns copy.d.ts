declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.SubOptions {
    class Columns {
        Static: typeof Columns;
        protected static types: Map<string, string>;
        protected grid: AgGrid;
        protected options: AgGrids.Options;
        protected events: AgGrids.Events;
        protected helpers: AgGrids.Helpers;
        constructor(grid: AgGrid);
        Init(): void;
        protected initColumn(columnUrlName: string, serverColumnCfg: AgGrids.Interfaces.IServerConfigs.IColumn): AgGrids.Types.GridColumn;
    }
}
