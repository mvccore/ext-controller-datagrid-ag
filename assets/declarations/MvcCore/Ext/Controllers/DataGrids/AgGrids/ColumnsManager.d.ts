declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class ColumnsManager {
        Static: typeof ColumnsManager;
        protected static types: Map<string, string>;
        protected grid: AgGrid;
        protected options: AgGrids.Options;
        protected eventsManager: AgGrids.EventsManager;
        protected helpers: AgGrids.Helpers;
        protected agColumns: AgGrids.Types.GridColumn[];
        protected defaultColDef: agGrid.ColDef<any>;
        protected serverConfig: Interfaces.IServerConfig;
        protected viewHelper: ColumnsManagers.ViewHelper;
        constructor(grid: AgGrid);
        SetAgColumns(gridColumns: AgGrids.Types.GridColumn[]): this;
        GetAgColumns(): AgGrids.Types.GridColumn[];
        SetDefaultColDef(defaultColDef: agGrid.ColDef): this;
        GetDefaultColDef(): agGrid.ColDef;
        Init(): this;
        protected initServerCfgAndViewHelper(): this;
        protected initColumns(): this;
        protected initColumn(serverColumnCfg: AgGrids.Interfaces.IServerConfigs.IColumn): AgGrids.Types.GridColumn;
        protected initDefaultColDef(): this;
    }
}
