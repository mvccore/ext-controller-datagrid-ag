declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.ColumnsManagers {
    class FilterHeader implements agGrid.IFloatingFilterComp<any> {
        static readonly SELECTORS: {
            CONT_CLS: string;
            INPUT_CLS: string;
            REMOVE_CLS: string;
            ACTIVE_CLS: string;
        };
        Static: typeof FilterHeader;
        protected params: AgGrids.Interfaces.IFilterHeaderParams<any>;
        protected grid: AgGrid;
        protected columnId: string;
        protected elms: AgGrids.Interfaces.IFilterHeaderElements;
        protected activeFilterClsRegExp: RegExp;
        protected handlers: {
            handleSubmit?: (e: MouseEvent) => void;
            handleBlur?: (e: FocusEvent) => void;
            handleRemove?: (e: MouseEvent) => void;
            handleChange?: (e: Event) => void;
            changeDelayTimeout?: number;
        };
        constructor();
        init(agParams: AgGrids.Interfaces.IFilterHeaderParams<any>): void;
        getGui(): HTMLElement;
        SetText(filteringItem: Map<Enums.Operator, string[]> | null): this;
        protected initParams(agParams: AgGrids.Interfaces.IFilterHeaderParams<any>): this;
        protected initElements(): this;
        protected initEvents(): this;
        protected handleSubmit(e: KeyboardEvent): void;
        protected handleBlur(e: KeyboardEvent): void;
        protected handleRemove(e: KeyboardEvent): void;
        protected handleChange(e: Event): void;
        destroy(): void;
        afterGuiAttached(params?: agGrid.IAfterGuiAttachedParams): void;
        protected setHeaderActive(active: boolean): this;
        onParentModelChanged(parentModel: any, event: agGrid.FilterChangedEvent<any>): void;
    }
}
