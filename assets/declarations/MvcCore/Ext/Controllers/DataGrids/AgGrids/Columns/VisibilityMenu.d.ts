declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.Columns {
    class VisibilityMenu {
        static SELECTORS: {
            GRID_TOP_PLACE_BEFORE_SEL: string;
            GRID_BOTTOM_PLACE_BEFORE_SEL: string;
            CONT_CLS: string;
            BTN_OPEN_CLS: string;
            BTN_APPLY_CLS: string;
            BTN_CANCEL_CLS: string;
            FORM_CLS: string;
            FORM_HIDDEN_CLS: string;
            FORM_HEAD_CLS: string;
            FORM_CTRLS_CLS: string;
            MENU_CTRL_CLS: string;
            FORM_BTNS_CLS: string;
            INPUT_ID_BASE: string;
        };
        Static: typeof VisibilityMenu;
        protected grid: AgGrid;
        protected optionsManager: Options.Manager;
        protected translator: Tools.Translator;
        protected serverConfig: Interfaces.IServerConfig;
        protected elms: Interfaces.ColumnsMenus.IElements;
        protected displayed: boolean;
        protected formClick: boolean;
        protected handlers: {
            handleDocumentClick?: (e: MouseEvent) => void;
            handleFormClick?: (e: MouseEvent) => void;
        };
        constructor(grid: AgGrid);
        Hide(): this;
        Show(): this;
        RedrawControls(): this;
        ResizeControls(): this;
        UpdateFormAction(): this;
        protected removeShownEvents(): this;
        protected disableUsedColumns(): this;
        protected addShownEvents(): this;
        protected handleDocumentClick(e: MouseEvent): void;
        protected handleFormClick(e: MouseEvent): void;
        protected initElements(): this;
        protected initFormElements(): this;
        protected initFormControls(): this;
        protected initFormEvents(): this;
        protected createElm<T>(elmName: string, clsNames?: string[], innerHTML?: string | null, props?: any): T;
        protected createBtn(text: string, className: string, submit: boolean): HTMLButtonElement;
        protected initEvents(): this;
        protected handleOpen(e: MouseEvent): void;
        protected handleCancel(e: MouseEvent): void;
        protected stopEvent(e: Event): this;
    }
}