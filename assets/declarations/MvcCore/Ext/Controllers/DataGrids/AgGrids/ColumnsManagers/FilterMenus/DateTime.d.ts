declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.ColumnsManagers.FilterMenus {
    class DateTime extends FilterMenu {
        static PARSER_ARGS_DEFAULT: string[];
        static FORMAT_ARGS_DEFAULT: string[];
        static VALUE_TYPE: string;
        Static: typeof DateTime;
        protected timeZoneOffset: number;
        protected parserArgs: string[];
        protected formatArgs: string[];
        init(agParams: Interfaces.IFilterMenuParams<any>): void;
        protected changeValueInputType(index: number, currentControlType: Enums.FilterControlType): this;
        protected setValueInput(valueInput: HTMLInputElement, value: string, currentControlType: Enums.FilterControlType): this;
        protected getValueInput(valueInput: HTMLInputElement, currentControlType: Enums.FilterControlType): string;
        protected valueIsValid(value: string): boolean;
    }
}
