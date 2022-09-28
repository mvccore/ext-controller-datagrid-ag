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
                    var Columns;
                    (function (Columns) {
                        var FilterHeader = /** @class */ (function () {
                            function FilterHeader() {
                                var _newTarget = this.constructor;
                                this.Static = _newTarget;
                                this.activeState = false;
                            }
                            FilterHeader.prototype.init = function (agParams) {
                                this
                                    .initParams(agParams)
                                    .initElements()
                                    .initEvents()
                                    .SetText(agParams.filteringItem);
                            };
                            FilterHeader.prototype.getGui = function () {
                                return this.elms.cont;
                            };
                            FilterHeader.prototype.SetText = function (filteringItem) {
                                var e_1, _a, e_2, _b;
                                var newStateActive = filteringItem != null;
                                if (!this.activeState && !newStateActive)
                                    return this;
                                this.activeState = newStateActive;
                                var input = this.elms.input;
                                if (filteringItem == null) {
                                    input.value = '';
                                    this.setHeaderActive(false);
                                    return this;
                                }
                                var textItems = [], prefix, serverConfig = this.grid.GetServerConfig(), valuesDelimiter = serverConfig.urlSegments.urlDelimiterValues, filterOperatorPrefixes = serverConfig.filterOperatorPrefixes;
                                try {
                                    for (var _c = __values(filteringItem.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
                                        var _e = __read(_d.value, 2), operator = _e[0], filterValues = _e[1];
                                        prefix = filterOperatorPrefixes.get(operator);
                                        try {
                                            for (var filterValues_1 = (e_2 = void 0, __values(filterValues)), filterValues_1_1 = filterValues_1.next(); !filterValues_1_1.done; filterValues_1_1 = filterValues_1.next()) {
                                                var filterValue = filterValues_1_1.value;
                                                textItems.push(prefix + filterValue);
                                            }
                                        }
                                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                        finally {
                                            try {
                                                if (filterValues_1_1 && !filterValues_1_1.done && (_b = filterValues_1.return)) _b.call(filterValues_1);
                                            }
                                            finally { if (e_2) throw e_2.error; }
                                        }
                                    }
                                }
                                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                finally {
                                    try {
                                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                }
                                input.value = textItems.join(valuesDelimiter);
                                this.setHeaderActive(input.value !== '');
                                return this;
                            };
                            FilterHeader.prototype.initParams = function (agParams) {
                                this.params = agParams;
                                this.grid = this.params.grid;
                                this.columnId = this.params.columnId;
                                this.activeFilterClsRegExp = new RegExp('\\s+' + this.Static.SELECTORS.ACTIVE_CLS.replace(/-/g, '\\-') + '\\s+', 'g');
                                this.grid.GetFilterHeaders().set(this.columnId, this);
                                return this;
                            };
                            FilterHeader.prototype.initElements = function () {
                                var sels = this.Static.SELECTORS;
                                var cont = document.createElement('div');
                                cont.className = sels.CONT_CLS;
                                var input = document.createElement('input');
                                input.type = 'text';
                                input.autocomplete = 'off';
                                input.name = 'filter_' + this.columnId;
                                var renderingCfg = this.grid.GetServerConfig().renderConfig;
                                if (renderingCfg.tableHeadFilteringTitle != null)
                                    input.title = renderingCfg.tableHeadFilteringTitle;
                                input.className = sels.INPUT_CLS;
                                var remove = document.createElement('div');
                                remove.className = sels.REMOVE_CLS;
                                cont.appendChild(input);
                                cont.appendChild(remove);
                                this.elms = {
                                    cont: cont,
                                    input: input,
                                    remove: remove
                                };
                                return this;
                            };
                            FilterHeader.prototype.initEvents = function () {
                                this.handlers = {};
                                var input = this.elms.input, remove = this.elms.remove;
                                if (this.params.submitDelayMs > 0) {
                                    input.addEventListener('change', this.handlers.handleChange = this.handleChange.bind(this));
                                }
                                else {
                                    input.addEventListener('keyup', this.handlers.handleSubmit = this.handleSubmit.bind(this));
                                    input.addEventListener('blur', this.handlers.handleBlur = this.handleBlur.bind(this));
                                }
                                input.addEventListener('focus', this.handlers.handleFocus = this.handleFocus.bind(this));
                                remove.addEventListener('click', this.handlers.handleRemove = this.handleRemove.bind(this), true);
                                return this;
                            };
                            FilterHeader.prototype.handleSubmit = function (e) {
                                this.stopEvent(e);
                                var value = this.elms.input.value;
                                if (e.key === 'Enter') {
                                    this.grid.GetEvents().HandleFilterHeaderChange(this.columnId, value);
                                }
                                else {
                                    if (value == null || (value.trim() === '')) {
                                        this.setHeaderActive(false);
                                    }
                                    else {
                                        this.setHeaderActive(true);
                                    }
                                }
                            };
                            FilterHeader.prototype.handleBlur = function (e) {
                                this.stopEvent(e);
                                var value = this.elms.input.value.trim();
                                if (value === '' || value == null) {
                                    var filtering = this.grid.GetFiltering();
                                    if (filtering.has(this.columnId))
                                        filtering.delete(this.columnId);
                                }
                            };
                            FilterHeader.prototype.handleFocus = function (e) {
                                this.grid.GetColumnsVisibilityMenu().Hide();
                            };
                            FilterHeader.prototype.handleRemove = function (e) {
                                this.stopEvent(e);
                                this.elms.input.value = '';
                                this.grid.GetEvents().HandleFilterHeaderChange(this.columnId, null);
                            };
                            FilterHeader.prototype.handleChange = function (e) {
                                var _this = this;
                                this.stopEvent(e);
                                if (this.handlers.changeDelayTimeout)
                                    clearTimeout(this.handlers.changeDelayTimeout);
                                setTimeout(function () {
                                    _this.grid.GetEvents().HandleFilterHeaderChange(_this.columnId, _this.elms.input.value.trim());
                                }, this.params.submitDelayMs);
                            };
                            FilterHeader.prototype.stopEvent = function (e) {
                                if (e == null)
                                    return this;
                                e.preventDefault();
                                e.stopPropagation();
                                e.cancelBubble = true;
                                return this;
                            };
                            FilterHeader.prototype.destroy = function () {
                                var input = this.elms.input, cont = this.elms.cont;
                                if (this.handlers.changeDelayTimeout)
                                    clearTimeout(this.handlers.changeDelayTimeout);
                                if (this.handlers.handleChange)
                                    this.elms.remove.removeEventListener('click', this.handlers.handleChange);
                                if (this.handlers.handleSubmit)
                                    input.removeEventListener('keyup', this.handlers.handleSubmit);
                                if (this.handlers.handleBlur)
                                    input.removeEventListener('blur', this.handlers.handleBlur);
                                if (this.handlers.handleRemove)
                                    this.elms.remove.removeEventListener('click', this.handlers.handleRemove);
                                if (cont.parentNode != null)
                                    cont.parentNode.removeChild(cont);
                                this.params = null;
                                this.grid = null;
                                this.columnId = '';
                                this.elms = null;
                            };
                            FilterHeader.prototype.afterGuiAttached = function (params) {
                                this.elms.headerCell = this.elms.cont.parentNode.parentNode;
                                if (this.params.filteringItem != null && this.params.filteringItem.size) {
                                    this.elms.headerCell.className = [
                                        this.elms.headerCell.className, this.Static.SELECTORS.ACTIVE_CLS
                                    ].join(' ');
                                }
                            };
                            FilterHeader.prototype.setHeaderActive = function (active) {
                                var headerCell = this.elms.headerCell;
                                if (headerCell == null)
                                    return this;
                                var headerCellClassName = ' ' + headerCell.className + ' ';
                                if (active) {
                                    if (!headerCellClassName.match(this.activeFilterClsRegExp))
                                        headerCell.className = headerCell.className + ' ' + this.Static.SELECTORS.ACTIVE_CLS;
                                }
                                else {
                                    headerCell.className = headerCellClassName.replace(this.activeFilterClsRegExp, ' ');
                                }
                                return this;
                            };
                            FilterHeader.prototype.onParentModelChanged = function (parentModel, event) {
                            };
                            FilterHeader.SELECTORS = {
                                CONT_CLS: 'filter-header',
                                INPUT_CLS: 'filter-input',
                                REMOVE_CLS: 'filter-remove',
                                ACTIVE_CLS: 'filter-active',
                            };
                            return FilterHeader;
                        }());
                        Columns.FilterHeader = FilterHeader;
                    })(Columns = AgGrids.Columns || (AgGrids.Columns = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=FilterHeader.js.map