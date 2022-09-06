declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.ColumnsManagers.FilterMenus {
    class Int extends FilterMenu {
        static VALUE_TYPE: string;
        Static: typeof Int;
        init(agParams: Interfaces.IFilterMenuParams<any>): void;
        protected changeValueInputType(index: number, currentControlType: Enums.FilterControlType): this;
    }
}
