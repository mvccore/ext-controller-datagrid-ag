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
                    var ColumnsManagers;
                    (function (ColumnsManagers) {
                        var FilterHeader = /** @class */ (function () {
                            function FilterHeader() {
                                var _newTarget = this.constructor;
                                this.Static = _newTarget;
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
                                input.addEventListener('keyup', this.handlers.handleSubmit = this.handleSubmit.bind(this));
                                input.addEventListener('blur', this.handlers.handleBlur = this.handleBlur.bind(this));
                                remove.addEventListener('click', this.handlers.handleRemove = this.handleRemove.bind(this), true);
                                return this;
                            };
                            FilterHeader.prototype.handleSubmit = function (e) {
                                e.stopPropagation();
                                e.preventDefault();
                                e.cancelBubble = true;
                                var value = this.elms.input.value;
                                debugger;
                                if (e.key === 'Enter') {
                                    this.grid.GetEvents().HandleInputFilterChange(this.columnId, value);
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
                                e.stopPropagation();
                                e.preventDefault();
                                e.cancelBubble = true;
                                debugger;
                                var value = this.elms.input.value.trim();
                                if (value === '' || value == null) {
                                    var filtering = this.grid.GetFiltering();
                                    if (filtering.has(this.columnId))
                                        filtering.delete(this.columnId);
                                }
                            };
                            FilterHeader.prototype.handleRemove = function (e) {
                                e.stopPropagation();
                                e.preventDefault();
                                debugger;
                                e.cancelBubble = true;
                                this.elms.input.value = '';
                                this.grid.GetEvents().HandleInputFilterChange(this.columnId, null);
                            };
                            FilterHeader.prototype.destroy = function () {
                                var input = this.elms.input, cont = this.elms.cont;
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
                            /*protected _tmp (): void {
                    
                                this.eGui = document.createElement('div');
                                this.eGui.innerHTML = '<input type="text" />';
                                this.currentValue = null;
                                this.eFilterInput = this.eGui.querySelector('input');
                                
                                const onInputBoxChanged = () => {
                                    if (this.eFilterInput.value === '') {
                                        // clear the filter
                                        params.parentFilterInstance(instance => {
                                            instance.onFloatingFilterChanged(null, null);
                                        });
                                        return;
                                    }
                         
                                    this.currentValue = Number(this.eFilterInput.value);
                                    params.parentFilterInstance(instance => {
                                        // TODO: tohle tady nebude, prostě se pošle to co tam je do gridu a provede se AJAX request
                                        instance.onFloatingFilterChanged('greaterThan', this.currentValue);
                                    });
                                }
                         
                                this.eFilterInput.addEventListener('input', onInputBoxChanged);
                            }*/
                            FilterHeader.prototype.onParentModelChanged = function (parentModel, event) {
                                debugger;
                                // When the filter is empty we will receive a null message her
                                /*if (!parentModel) {
                                    this.eFilterInput.value = '';
                                    this.currentValue = null;
                                } else {
                                    this.eFilterInput.value = parentModel.filter + '';
                                    this.currentValue = parentModel.filter;
                                }*/
                            };
                            FilterHeader.SELECTORS = {
                                CONT_CLS: 'filter-header',
                                INPUT_CLS: 'filter-input',
                                REMOVE_CLS: 'filter-remove',
                                ACTIVE_CLS: 'filter-active',
                            };
                            return FilterHeader;
                        }());
                        ColumnsManagers.FilterHeader = FilterHeader;
                    })(ColumnsManagers = AgGrids.ColumnsManagers || (AgGrids.ColumnsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=FilterHeader.js.map