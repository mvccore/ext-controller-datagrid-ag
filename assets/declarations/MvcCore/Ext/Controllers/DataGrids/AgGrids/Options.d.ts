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
        static readonly SYSTEM_LOCALE_SEPARATOR: string;
        static readonly SINGLE_PAGE_MODE: {
            MAX_ROWS_2_SUPPRESS_ROW_VIRTUALIZATION: number;
        };
        Static: typeof Options;
        protected grid: AgGrid;
        protected eventsManager: AgGrids.EventsManager;
        protected helpers: AgGrids.Helpers;
        protected bases: AgGrids.AgOptionsBases;
        protected columnManager: AgGrids.ColumnsManager;
        protected elements: AgGrids.Interfaces.IElements;
        protected agOptions: agGrid.GridOptions<any>;
        protected agDataSource: agGrid.IDatasource;
        constructor(grid: AgGrid);
        SetElements(elements: AgGrids.Interfaces.IElements): this;
        GetElements(): AgGrids.Interfaces.IElements;
        SetAgOptions(options: agGrid.GridOptions<any>): this;
        GetAgOptions(): agGrid.GridOptions<any>;
        SetColumnManager(columnManager: AgGrids.ColumnsManager): this;
        GetColumnManager(): AgGrids.ColumnsManager;
        InitElements(): this;
        InitBottomControls(): this;
        InitAgBases(): this;
        InitAgColumns(): this;
        InitAgPageModeSpecifics(): this;
        protected initSinglePageSpecifics(): this;
        protected initMultiplePagesSpecifics(): this;
    }
}
