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
                        var FilterInput = /** @class */ (function () {
                            function FilterInput() {
                                var _newTarget = this.constructor;
                                this.Static = _newTarget;
                            }
                            FilterInput.prototype.init = function (agParams) {
                                this
                                    .initParams(agParams)
                                    .initElements()
                                    .initEvents()
                                    .SetText(agParams.filteringItem);
                            };
                            FilterInput.prototype.getGui = function () {
                                return this.input;
                            };
                            FilterInput.prototype.SetText = function (filteringItem) {
                                var e_1, _a, e_2, _b;
                                if (filteringItem == null) {
                                    this.input.value = '';
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
                                this.input.value = textItems.join(valuesDelimiter);
                                return this;
                            };
                            FilterInput.prototype.initParams = function (agParams) {
                                this.params = agParams;
                                this.grid = this.params.grid;
                                this.columnId = this.params.columnId;
                                this.grid.GetFilterInputs().set(this.columnId, this);
                                return this;
                            };
                            FilterInput.prototype.initElements = function () {
                                this.input = document.createElement('input');
                                this.input.type = 'text';
                                this.input.className = this.Static.SELECTORS.INPUT_CLS;
                                return this;
                            };
                            FilterInput.prototype.initEvents = function () {
                                this.handlers = {};
                                this.input.addEventListener('keyup', this.handlers.handleSubmit = this.handleSubmit.bind(this));
                                this.input.addEventListener('blur', this.handlers.handleBlur = this.handleBlur.bind(this));
                                return this;
                            };
                            FilterInput.prototype.handleSubmit = function (e) {
                                if (e.key !== 'Enter')
                                    return;
                                e.stopPropagation();
                                e.preventDefault();
                                e.cancelBubble = true;
                                this.grid.GetEvents().HandleInputFilterChange(this.columnId, this.input.value);
                            };
                            FilterInput.prototype.handleBlur = function (e) {
                                e.stopPropagation();
                                e.preventDefault();
                                e.cancelBubble = true;
                                var value = this.input.value.trim();
                                if (value === '' || value == null) {
                                    var filtering = this.grid.GetFiltering();
                                    if (filtering.has(this.columnId))
                                        filtering.delete(this.columnId);
                                }
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
                            FilterInput.prototype.onParentModelChanged = function (parentModel, event) {
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
                            // Optional methods
                            // Gets called every time the popup is shown, after the GUI returned in
                            // getGui is attached to the DOM. If the filter popup is closed and re-opened, this method is
                            // called each time the filter is shown. This is useful for any logic that requires attachment
                            // before executing, such as putting focus on a particular DOM element. 
                            FilterInput.prototype.afterGuiAttached = function (params) {
                                //debugger;
                            };
                            /**
                             * Gets called when the floating filter is destroyed. Like column headers,
                             * the floating filter lifespan is only when the column is visible,
                             * so they are destroyed if the column is made not visible or when a user
                             * scrolls the column out of view with horizontal scrolling.
                             */
                            FilterInput.prototype.destroy = function () {
                                if (this.handlers.handleSubmit)
                                    this.input.removeEventListener('keyup', this.handlers.handleSubmit);
                                if (this.input.parentNode != null)
                                    this.input.parentNode.removeChild(this.input);
                                this.params = null;
                                this.grid = null;
                                this.columnId = '';
                                this.input = null;
                            };
                            FilterInput.SELECTORS = {
                                INPUT_CLS: 'filter-input',
                            };
                            return FilterInput;
                        }());
                        ColumnsManagers.FilterInput = FilterInput;
                    })(ColumnsManagers = AgGrids.ColumnsManagers || (AgGrids.ColumnsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=FilterInput.js.map