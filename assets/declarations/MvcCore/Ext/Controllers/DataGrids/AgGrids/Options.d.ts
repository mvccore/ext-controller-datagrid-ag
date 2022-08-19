declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class Options {
        static readonly SELECTORS: {
            AG_GRID_SEL: string;
            BOTTOM_CONTROLS: {
                CONT_SEL: string;
                COUNT_SCALES_SEL: string;
                STATUS_SEL: string;
                PAGING_SEL: string;
                PAGING_ANCHOR_SEL: string;
            };
        };
        static readonly SINGLE_PAGE_MODE: {
            MAX_ROWS_2_SUPPRESS_ROW_VIRTUALIZATION: number;
        };
        static readonly MULTI_PAGES_MODE: {};
        Static: typeof Options;
        protected grid: AgGrid;
        protected events: AgGrids.Events;
        protected helpers: AgGrids.Helpers;
        protected bases: SubOptions.Bases;
        protected columns: AgGrids.SubOptions.Columns;
        protected dataSource: AgGrids.SubOptions.DataSource | agGrid.IDatasource;
        protected elements: AgGrids.Interfaces.IElements;
        protected agOptions: agGrid.GridOptions<any>;
        protected agColumns: AgGrids.Types.GridColumn[];
        protected agDataSource: agGrid.IDatasource;
        constructor(grid: AgGrid);
        SetElements(elements: AgGrids.Interfaces.IElements): this;
        GetElements(): AgGrids.Interfaces.IElements;
        SetAgOptions(options: agGrid.GridOptions<any>): this;
        GetAgOptions(): agGrid.GridOptions<any>;
        SetAgColumns(gridColumns: AgGrids.Types.GridColumn[]): this;
        GetAgColumns(): AgGrids.Types.GridColumn[];
        SetAgDataSource(dataSource: agGrid.IDatasource): this;
        GetAgDataSource(): agGrid.IDatasource;
        InitElements(): this;
        InitPagingAnchors(): this;
        InitAgBases(): this;
        InitAgColumns(): this;
        InitAgPageModeSpecifics(): this;
        protected initSinglePageSpecifics(): this;
        protected initMultiplePagesSpecifics(): this;
    }
}
