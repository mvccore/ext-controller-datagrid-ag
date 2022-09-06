declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.ColumnsManagers {
    class ViewHelper {
        Static: typeof ViewHelper;
        static readonly PARSER_PATTERN_DATE: string;
        static readonly PARSER_PATTERN_DATE_TIME: string;
        static readonly PARSER_PATTERN_TIME: string;
        static readonly FORMAT_PATTERN_DATE: string;
        static readonly FORMAT_PATTERN_DATE_TIME: string;
        static readonly FORMAT_PATTERN_TIME: string;
        protected static defaults: Map<Enums.ServerType, Types.ViewHelper>;
        protected grid: AgGrid;
        protected serverConfig: Interfaces.IServerConfig;
        protected localeNumeric: string;
        protected localeMoney: string;
        protected localeDateTime: string;
        protected formattersInt: Map<string, Intl.NumberFormat>;
        protected formattersFloat: Map<string, Intl.NumberFormat>;
        protected formattersMoney: Map<string, Intl.NumberFormat>;
        protected translator: Translator;
        constructor(grid: AgGrid);
        SetUpColumnCfg(agColumnCfg: agGrid.ColDef, serverColumnCfg: AgGrids.Interfaces.IServerConfigs.IColumn): this;
        protected getIntFormater(formatterKey: string, formatArgs: string[]): Intl.NumberFormat;
        protected getFloatFormater(formatterKey: string, formatArgs: string[]): Intl.NumberFormat;
        protected getMoneyFormater(formatterKey: string, formatArgs: string[]): Intl.NumberFormat;
        protected formatBool(params: agGrid.ValueFormatterParams<any, any>, propName: string, parserArgs: string[], formatArgs: string[]): string;
        protected formatInt(params: agGrid.ValueFormatterParams<any, any>, propName: string, parserArgs: string[], formatArgs: string[]): string;
        protected formatFloat(params: agGrid.ValueFormatterParams<any, any>, propName: string, parserArgs: string[], formatArgs: string[]): string;
        protected formatMoney(params: agGrid.ValueFormatterParams<any, any>, propName: string, parserArgs: string[], formatArgs: string[]): string;
        protected formatDate(params: agGrid.ValueFormatterParams<any, any>, propName: string, parserArgs: string[], formatArgs: string[]): string;
        protected formatDateTime(params: agGrid.ValueFormatterParams<any, any>, propName: string, parserArgs: string[], formatArgs: string[]): string;
        protected formatTime(params: agGrid.ValueFormatterParams<any, any>, propName: string, parserArgs: string[], formatArgs: string[]): string;
    }
}
