declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.ColumnsManagers {
    class SortHeader implements agGrid.IHeaderComp {
        static readonly SELECTORS: {
            CONT_CLS: string;
            SORTABLE_CLS: string;
            LABEL_CLS: string;
            ORDER_CLS: string;
            DIRECTION_CLS: string;
            REMOVE_CLS: string;
            ACTIVE_CLS: string;
            ASC_CLS: string;
            DESC_CLS: string;
        };
        Static: typeof SortHeader;
        protected params: AgGrids.Interfaces.IHeaderParams<any>;
        protected grid: AgGrid;
        protected columnId: string;
        protected sortable: boolean;
        protected sequence: number;
        protected direction: 0 | 1 | null;
        protected elms: AgGrids.Interfaces.IHeaderElements;
        protected handlers: {
            handleLabelClick?: (e: MouseEvent) => void;
            handleRemoveClick?: (e: MouseEvent) => void;
        };
        constructor();
        init(agParams: AgGrids.Interfaces.IHeaderParams<any>): void;
        getGui(): HTMLElement;
        SetSequence(sequence: number): this;
        protected initParams(agParams: AgGrids.Interfaces.IHeaderParams<any>): this;
        protected initElements(): this;
        protected initEvents(): this;
        refresh(agParams: AgGrids.Interfaces.IHeaderParams<any>): boolean;
        destroy(): void;
        protected handleLabelClick(e: MouseEvent): void;
        protected handleRemoveClick(e: MouseEvent): void;
        protected setSortActive(): this;
        protected setSortInactive(): this;
    }
}
