declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class ColumnsManager {
        Static: typeof ColumnsManager;
        protected static agColumnsTypes: Map<string, string>;
        protected grid: AgGrid;
        protected options: AgGrids.Options;
        protected eventsManager: AgGrids.EventsManager;
        protected helpers: AgGrids.Helpers;
        protected agColumnsConfigs: Map<string, AgGrids.Types.GridColumn>;
        protected defaultColDef: agGrid.ColDef<any>;
        protected serverConfig: Interfaces.IServerConfig;
        protected initData: Interfaces.IServerResponse;
        protected viewHelper: ColumnsManagers.ViewHelper;
        constructor(grid: AgGrid);
        SetAgColumnsConfigs(gridColumns: Map<string, AgGrids.Types.GridColumn>): this;
        GetAgColumnsConfigs(): Map<string, AgGrids.Types.GridColumn>;
        SetDefaultColDef(defaultColDef: agGrid.ColDef): this;
        GetDefaultColDef(): agGrid.ColDef;
        Init(): this;
        protected initServerCfgAndViewHelper(): this;
        protected initColumns(): this;
        protected initColumn(serverColumnCfg: AgGrids.Interfaces.IServerConfigs.IColumn): AgGrids.Types.GridColumn;
        protected initDefaultColDef(): this;
    }
}
