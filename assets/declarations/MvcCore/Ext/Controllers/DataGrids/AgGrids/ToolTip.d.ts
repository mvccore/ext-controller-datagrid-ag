declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class ToolTip {
        protected eGui: HTMLDivElement;
        init(params: MvcCore.Ext.Controllers.DataGrids.AgGrids.Interfaces.SortHeaders.ITooltipParams): void;
        getGui(): HTMLDivElement;
    }
}
