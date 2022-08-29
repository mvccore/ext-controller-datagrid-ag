declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.Types {
    type ViewHelper = (params: agGrid.ValueFormatterParams<any, any>, propName: string, formatArgs: string[]) => string;
}
