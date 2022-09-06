declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.ColumnsManagers.FilterMenus {
    class Float extends FilterMenu {
        static VALUE_TYPE: string;
        Static: typeof Float;
        protected parserArgs: string[];
        protected formatArgs: string[];
        protected step: string;
        init(agParams: Interfaces.IFilterMenuParams<any>): void;
        protected changeValueInputType(index: number, currentControlType: Enums.FilterControlType): this;
    }
}
