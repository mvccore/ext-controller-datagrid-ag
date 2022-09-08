declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class ColumnsManager {
        Static: typeof ColumnsManager;
        protected grid: AgGrid;
        protected options: AgGrids.Options;
        protected eventsManager: AgGrids.EventsManager;
        protected helpers: AgGrids.Helpers;
        protected agColumnsConfigs: Map<string, AgGrids.Types.GridColumn>;
        protected agColumnDefaults: agGrid.ColDef<any>;
        protected sortHeaderDefaults: AgGrids.Interfaces.ISortHeaderParams;
        protected filterHeaderDefaults: AgGrids.Interfaces.IFilterHeaderParams;
        protected filterMenuDefaults: AgGrids.Interfaces.IFilterMenuParams;
        protected serverConfig: Interfaces.IServerConfig;
        protected initData: Interfaces.IServerResponse;
        protected viewHelper: ColumnsManagers.ViewHelper;
        protected allServerColumnsMap: Map<string, Interfaces.IServerConfigs.IColumn>;
        protected allServerColumnsSorted: Interfaces.IServerConfigs.IColumn[];
        protected activeServerColumnsSorted: Interfaces.IServerConfigs.IColumn[];
        constructor(grid: AgGrid);
        SetAllServerColumnsMap(allServerColumnsMap: Map<string, Interfaces.IServerConfigs.IColumn>): this;
        GetAllServerColumnsMap(): Map<string, Interfaces.IServerConfigs.IColumn>;
        SetAllServerColumnsSorted(allServerColumnsSorted: Interfaces.IServerConfigs.IColumn[]): this;
        GetAllServerColumnsSorted(): Interfaces.IServerConfigs.IColumn[];
        SetActiveServerColumnsSorted(activeServerColumnsSorted: Interfaces.IServerConfigs.IColumn[]): this;
        GetActiveServerColumnsSorted(): Interfaces.IServerConfigs.IColumn[];
        SetAgColumnsConfigs(gridColumns: Map<string, AgGrids.Types.GridColumn>): this;
        GetAgColumnsConfigs(): Map<string, AgGrids.Types.GridColumn>;
        SetAgColumnDefaults(defaultColDef: agGrid.ColDef): this;
        GetAgColumnDefaults(): agGrid.ColDef;
        Init(): this;
        protected initServerCfgAndViewHelper(): this;
        protected initColumns(): this;
        protected initColumn(serverColumnCfg: AgGrids.Interfaces.IServerConfigs.IColumn): AgGrids.Types.GridColumn;
        protected initColumnSorting(column: agGrid.ColDef, serverColumnCfg: AgGrids.Interfaces.IServerConfigs.IColumn): this;
        protected initColumnFiltering(column: agGrid.ColDef, serverColumnCfg: AgGrids.Interfaces.IServerConfigs.IColumn): this;
        protected initColumnStyles(column: agGrid.ColDef, serverColumnCfg: AgGrids.Interfaces.IServerConfigs.IColumn): this;
    }
}
