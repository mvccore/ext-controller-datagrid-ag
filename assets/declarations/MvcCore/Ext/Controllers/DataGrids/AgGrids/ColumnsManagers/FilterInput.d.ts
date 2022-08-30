declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.ColumnsManagers {
    class FilterInput implements agGrid.IFloatingFilterComp<any> {
        eGui: HTMLDivElement;
        currentValue: any;
        eFilterInput: HTMLInputElement;
        init(params: agGrid.IFloatingFilterParams<any>): void;
        onParentModelChanged(parentModel: any, event: agGrid.FilterChangedEvent<any>): void;
        getGui(): HTMLDivElement;
        afterGuiAttached(params?: agGrid.IAfterGuiAttachedParams): void;
        destroy(): void;
    }
}
