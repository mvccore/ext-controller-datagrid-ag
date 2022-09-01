declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.ColumnsManagers {
    class FilterInput implements agGrid.IFloatingFilterComp<any> {
        static readonly SELECTORS: {
            INPUT_CLS: string;
        };
        protected params: AgGrids.Interfaces.IFilterInputParams<any>;
        protected grid: AgGrid;
        protected columnId: string;
        protected input: HTMLInputElement;
        protected handlers: {
            handleSubmit?: (e: MouseEvent) => void;
            handleBlur?: (e: FocusEvent) => void;
        };
        Static: typeof FilterInput;
        constructor();
        init(agParams: AgGrids.Interfaces.IFilterInputParams<any>): void;
        getGui(): HTMLElement;
        SetText(filteringItem: Map<Enums.Operator, string[]> | null): this;
        protected initParams(agParams: AgGrids.Interfaces.IFilterInputParams<any>): this;
        protected initElements(): this;
        protected initEvents(): this;
        protected handleSubmit(e: KeyboardEvent): void;
        protected handleBlur(e: KeyboardEvent): void;
        onParentModelChanged(parentModel: any, event: agGrid.FilterChangedEvent<any>): void;
        afterGuiAttached(params?: agGrid.IAfterGuiAttachedParams): void;
        /**
         * Gets called when the floating filter is destroyed. Like column headers,
         * the floating filter lifespan is only when the column is visible,
         * so they are destroyed if the column is made not visible or when a user
         * scrolls the column out of view with horizontal scrolling.
         */
        destroy(): void;
    }
}
