declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.ColumnsManagers {
    class SortHeader implements agGrid.IHeaderComp {
        eGui: HTMLDivElement;
        agParams: any;
        eMenuButton: HTMLDivElement;
        eSortDownButton: HTMLDivElement;
        eSortUpButton: HTMLDivElement;
        eSortRemoveButton: HTMLDivElement;
        onMenuClickListener: any;
        onSortAscRequestedListener: any;
        onRemoveSortListener: any;
        onSortChangedListener: any;
        onSortDescRequestedListener: any;
        init(agParams: agGrid.IHeaderParams): void;
        refresh(params: agGrid.IHeaderParams): boolean;
        onSortChanged(): void;
        getGui(): HTMLElement;
        onMenuClick(): void;
        onSortRequested(order: any, event: any): void;
        destroy(): void;
    }
}
