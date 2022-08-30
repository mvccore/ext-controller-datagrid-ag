declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.ColumnsManagers {
    class FilterMenu implements agGrid.IFilterComp<any> {
        getGui(): HTMLElement;
        destroy?(): void;
        isFilterActive(): boolean;
        getModel(): void;
        onNewRowsLoaded?(): void;
        onAnyFilterChanged?(): void;
        doesFilterPass(params: agGrid.IDoesFilterPassParams): boolean;
        getModelAsString?(model: any): string;
        setModel(): void;
    }
}
