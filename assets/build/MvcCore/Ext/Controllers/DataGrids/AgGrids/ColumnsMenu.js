var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
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
                            this.options = grid.GetOptions();
                            this.translator = grid.GetTranslator();
                            this.serverConfig = grid.GetServerConfig();
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
                                this
                                    .ResizeControls()
                                    .disableUsedColumns()
                                    .addShownEvents();
                            }
                            return this;
                        };
                        ColumnsMenu.prototype.RedrawControls = function () {
                            if (!this.elms.controls)
                                return this;
                            this.elms.controls.innerHTML = '';
                            return this.initFormControls();
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
                        ColumnsMenu.prototype.disableUsedColumns = function () {
                            var e_1, _a, e_2, _b;
                            if (this.serverConfig.ignoreDisabledColumns)
                                return this;
                            var filtering = this.grid.GetFiltering(), sorting = this.grid.GetSorting(), sortingSet = new Set();
                            try {
                                for (var sorting_1 = __values(sorting), sorting_1_1 = sorting_1.next(); !sorting_1_1.done; sorting_1_1 = sorting_1.next()) {
                                    var _c = __read(sorting_1_1.value, 1), idColumn = _c[0];
                                    sortingSet.add(idColumn);
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (sorting_1_1 && !sorting_1_1.done && (_a = sorting_1.return)) _a.call(sorting_1);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                            try {
                                for (var _d = __values(this.elms.inputs.entries()), _e = _d.next(); !_e.done; _e = _d.next()) {
                                    var _f = __read(_e.value, 2), idColumn = _f[0], input = _f[1];
                                    input.disabled = filtering.has(idColumn) || sortingSet.has(idColumn);
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
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
                                action: this.serverConfig.urlColumnsStates
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
                            var e_3, _a;
                            var _b;
                            var columnCfg, inputId, idColumn, sels = this.Static.SELECTORS, baseId = sels.INPUT_ID_BASE, labelCls = sels.MENU_CTRL_CLS, label, text, span, checkbox;
                            this.elms.inputs = new Map();
                            try {
                                for (var _c = __values(this.grid.GetOptions().GetColumnManager().GetAllServerColumnsSorted()), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var columnCfg = _d.value;
                                    idColumn = columnCfg.urlName;
                                    text = (_b = columnCfg.title) !== null && _b !== void 0 ? _b : columnCfg.headingName;
                                    if (text === idColumn)
                                        continue;
                                    inputId = baseId + idColumn;
                                    label = this.createElm('label', [labelCls], null, { for: inputId });
                                    checkbox = this.createElm('input', [], null, { id: inputId, name: idColumn, type: 'checkbox' });
                                    checkbox.checked = !columnCfg.disabled;
                                    span = this.createElm('span', [], text);
                                    this.elms.inputs.set(idColumn, label.appendChild(checkbox));
                                    label.appendChild(span);
                                    this.elms.controls.appendChild(label);
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                                }
                                finally { if (e_3) throw e_3.error; }
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
                            this.stopEvent(e).Show();
                        };
                        ColumnsMenu.prototype.handleCancel = function (e) {
                            this.stopEvent(e).Hide();
                        };
                        ColumnsMenu.prototype.stopEvent = function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            e.cancelBubble = true;
                            return this;
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