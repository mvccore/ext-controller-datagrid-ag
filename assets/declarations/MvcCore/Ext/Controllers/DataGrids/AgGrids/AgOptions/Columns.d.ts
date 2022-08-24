declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.AgOptions {
    class Columns {
        Static: typeof Columns;
        protected static types: Map<string, string>;
        protected grid: AgGrid;
        protected options: AgGrids.Options;
        protected eventsManager: AgGrids.EventsManager;
        protected helpers: AgGrids.Helpers;
        protected agColumns: AgGrids.Types.GridColumn[];
        protected defaultColDef: agGrid.ColDef<any>;
        constructor(grid: AgGrid);
        SetAgColumns(gridColumns: AgGrids.Types.GridColumn[]): this;
        GetAgColumns(): AgGrids.Types.GridColumn[];
        SetDefaultColDef(defaultColDef: agGrid.ColDef): this;
        GetDefaultColDef(): agGrid.ColDef;
        Init(): this;
        protected initColumns(): this;
        protected initColumn(columnUrlName: string, serverColumnCfg: AgGrids.Interfaces.IServerConfigs.IColumn): AgGrids.Types.GridColumn;
        protected initDefaultColDef(): this;
    }
}
