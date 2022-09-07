var MvcCore;
(function (MvcCore) {
    var Ext;
    (function (Ext) {
        var Controllers;
        (function (Controllers) {
            var DataGrids;
            (function (DataGrids) {
                var AgGrids;
                (function (AgGrids) {
                    var ColumnsMenu = /** @class */ (function () {
                        function ColumnsMenu(grid) {
                            var _newTarget = this.constructor;
                            this.Static = _newTarget;
                            this.grid = grid;
                            this.eventsManager = grid.GetEvents();
                            this.options = grid.GetOptions();
                            this.helpers = grid.GetHelpers();
                            this.translator = grid.GetTranslator();
                            this.serverConfig = grid.GetServerConfig();
                            this.isTouchDevice = this.helpers.IsTouchDevice();
                            this.displayed = false;
                            this.formClick = false;
                            this
                                .initElements()
                                .initEvents();
                        }
                        ColumnsMenu.prototype.Hide = function () {
                            if (!this.displayed)
                                return this;
                            if (this.elms.form) {
                                this.displayed = false;
                                var sels = this.Static.SELECTORS;
                                this.elms.form.className = [sels.FORM_CLS, sels.FORM_HIDDEN_CLS].join(' ');
                                this.removeShownEvents();
                            }
                            return this;
                        };
                        ColumnsMenu.prototype.Show = function () {
                            if (this.displayed)
                                return this;
                            if (this.elms.form) {
                                this.displayed = true;
                                this.elms.form.className = this.Static.SELECTORS.FORM_CLS;
                                this.ResizeControls();
                                this.addShownEvents();
                            }
                            return this;
                        };
                        ColumnsMenu.prototype.ResizeControls = function () {
                            if (!this.displayed)
                                return this;
                            var gridElm = this.grid.GetOptions().GetElements().agGridElement, gridElmParent = gridElm.parentNode, heightDiff = this.elms.heading.offsetHeight + this.elms.buttons.offsetHeight + 20;
                            var offsetHeight = Math.max((gridElmParent.offsetHeight * 0.75) - heightDiff, 200);
                            this.elms.controls.style.maxHeight = offsetHeight + 'px';
                            return this;
                        };
                        ColumnsMenu.prototype.removeShownEvents = function () {
                            document.removeEventListener('click', this.handlers.handleDocumentClick);
                            this.elms.form.removeEventListener('click', this.handlers.handleFormClick, true);
                            return this;
                        };
                        ColumnsMenu.prototype.addShownEvents = function () {
                            var _this = this;
                            this.handlers = {};
                            setTimeout(function () {
                                document.addEventListener('click', _this.handlers.handleDocumentClick = _this.handleDocumentClick.bind(_this));
                                _this.elms.form.addEventListener('click', _this.handlers.handleFormClick = _this.handleFormClick.bind(_this), true);
                            });
                            return this;
                        };
                        ColumnsMenu.prototype.handleDocumentClick = function (e) {
                            if (!this.formClick) {
                                this.Hide();
                            }
                            this.formClick = false;
                        };
                        ColumnsMenu.prototype.handleFormClick = function (e) {
                            this.formClick = true;
                        };
                        ColumnsMenu.prototype.initElements = function () {
                            var contElm = this.options.GetElements().contElement, sels = this.Static.SELECTORS;
                            var menuCont = this.createElm('div', [sels.CONT_CLS]);
                            var openBtn = this.createElm('a', [sels.BTN_OPEN_CLS], null, { href: '#' });
                            openBtn = menuCont.appendChild(openBtn);
                            this.elms = {
                                menuCont: contElm.appendChild(menuCont),
                                openBtn: openBtn,
                            };
                            return this;
                        };
                        ColumnsMenu.prototype.initFormElements = function () {
                            var sels = this.Static.SELECTORS;
                            var form = this.createElm('form', [sels.FORM_CLS], null, {
                                method: 'POST',
                                action: this.serverConfig.columnsStatesUrl
                            });
                            var head = this.createElm('div', [sels.FORM_HEAD_CLS], this.translator.Translate('displayColumns'));
                            this.elms.heading = form.appendChild(head);
                            var ctrls = this.createElm('div', [sels.FORM_CTRLS_CLS]);
                            this.elms.controls = form.appendChild(ctrls);
                            this.initFormControls();
                            var btns = this.createElm('div', [sels.FORM_BTNS_CLS]);
                            this.elms.buttons = form.appendChild(btns);
                            var btnApply = this.createBtn(this.translator.Translate('applyFilter'), sels.BTN_APPLY_CLS, true);
                            var btnCancel = this.createBtn(this.translator.Translate('cancelFilter'), sels.BTN_CANCEL_CLS, false);
                            this.elms.btnApply = btns.appendChild(btnApply);
                            this.elms.btnCancel = btns.appendChild(btnCancel);
                            this.elms.buttons = btns;
                            this.elms.menuCont.appendChild(form);
                            this.elms.form = form;
                            return this;
                        };
                        ColumnsMenu.prototype.initFormControls = function () {
                            var _a;
                            var columnCfg, inputId, sels = this.Static.SELECTORS, baseId = sels.INPUT_ID_BASE, labelCls = sels.MENU_CTRL_CLS, label, text, span, checkbox;
                            for (var idColumn in this.serverConfig.columns) {
                                columnCfg = this.serverConfig.columns[idColumn];
                                text = (_a = columnCfg.title) !== null && _a !== void 0 ? _a : columnCfg.headingName;
                                if (text === idColumn)
                                    continue;
                                inputId = baseId + idColumn;
                                label = this.createElm('label', [labelCls], null, { for: inputId });
                                checkbox = this.createElm('input', [], null, { id: inputId, name: idColumn, type: 'checkbox' });
                                checkbox.checked = !columnCfg.disabled;
                                span = this.createElm('span', [], text);
                                label.appendChild(checkbox);
                                label.appendChild(span);
                                this.elms.controls.appendChild(label);
                            }
                            return this;
                        };
                        ColumnsMenu.prototype.initFormEvents = function () {
                            this.elms.btnCancel.addEventListener('click', this.handleCancel.bind(this));
                            return this;
                        };
                        ColumnsMenu.prototype.createElm = function (elmName, clsNames, innerHTML, props) {
                            if (clsNames === void 0) { clsNames = []; }
                            if (innerHTML === void 0) { innerHTML = null; }
                            if (props === void 0) { props = null; }
                            var result = document.createElement(elmName);
                            if (clsNames.length > 0)
                                result.className = clsNames.join(' ');
                            if (innerHTML != null)
                                result.innerHTML = innerHTML;
                            if (props != null)
                                for (var prop in props)
                                    result[prop] = props[prop];
                            return result;
                        };
                        ColumnsMenu.prototype.createBtn = function (text, className, submit) {
                            var btn = this.createElm('button', [className]);
                            btn.type = submit ? 'submit' : 'button';
                            var span = this.createElm('span');
                            var b = this.createElm('b');
                            b.innerHTML = text;
                            span.appendChild(b);
                            btn.appendChild(span);
                            return btn;
                        };
                        ColumnsMenu.prototype.initEvents = function () {
                            this.elms.openBtn.addEventListener('click', this.handleOpen.bind(this));
                            return this;
                        };
                        ColumnsMenu.prototype.handleOpen = function (e) {
                            if (!this.elms.form)
                                this.initFormElements().initFormEvents();
                            this.Show();
                        };
                        ColumnsMenu.prototype.handleCancel = function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            e.cancelBubble = true;
                            this.Hide();
                        };
                        ColumnsMenu.SELECTORS = {
                            CONT_CLS: 'columns-menu',
                            BTN_OPEN_CLS: 'columns-menu-btn-open',
                            BTN_APPLY_CLS: 'columns-menu-btn-apply',
                            BTN_CANCEL_CLS: 'columns-menu-btn-cancel',
                            FORM_CLS: 'columns-menu-form',
                            FORM_HIDDEN_CLS: 'columns-menu-form-hidden',
                            FORM_HEAD_CLS: 'columns-menu-heading',
                            FORM_CTRLS_CLS: 'columns-menu-controls',
                            MENU_CTRL_CLS: 'columns-menu-control',
                            FORM_BTNS_CLS: 'columns-menu-buttons',
                            INPUT_ID_BASE: 'columns-menu-column-',
                        };
                        return ColumnsMenu;
                    }());
                    AgGrids.ColumnsMenu = ColumnsMenu;
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=ColumnsMenu.js.map