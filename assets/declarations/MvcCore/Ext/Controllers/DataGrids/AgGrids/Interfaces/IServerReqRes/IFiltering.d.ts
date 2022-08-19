declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.Interfaces.IServerReqRes {
    interface IFiltering {
        [columnUrlName: string]: {
            [operator: string]: string[];
        };
    }
}
