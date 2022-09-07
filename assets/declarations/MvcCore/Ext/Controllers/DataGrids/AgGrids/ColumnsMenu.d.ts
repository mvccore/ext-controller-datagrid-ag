declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids {
    class ColumnsMenu {
        static SELECTORS: {
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
        Static: typeof ColumnsMenu;
        protected grid: AgGrid;
        protected helpers: Helpers;
        protected options: Options;
        protected eventsManager: EventsManager;
        protected translator: Translator;
        protected serverConfig: Interfaces.IServerConfig;
        protected isTouchDevice: boolean;
        protected elms: Interfaces.IColumnsMenuElements;
        constructor(grid: AgGrid);
        protected Hide(): this;
        protected Show(): this;
        protected initElements(): this;
        protected initFormElements(): this;
        protected initFormControls(): this;
        protected initFormEvents(): this;
        protected resizeControls(): this;
        protected createElm<T>(elmName: string, clsNames?: string[], innerHTML?: string | null, props?: any): T;
        protected createBtn(text: string, className: string, submit: boolean): HTMLButtonElement;
        protected initEvents(): this;
        protected handleOpen(e: MouseEvent): void;
        protected handleCancel(e: MouseEvent): void;
    }
}
