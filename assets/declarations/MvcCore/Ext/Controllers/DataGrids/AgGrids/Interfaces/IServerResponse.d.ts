declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.Interfaces {
    interface IServerResponse {
        totalCount: number;
        offset: number;
        limit: number;
        dataCount: number;
        sorting: [string, 0 | 1][];
        filtering: Map<string, Map<Enums.Operator, string[]>>;
        data: any[];
    }
}