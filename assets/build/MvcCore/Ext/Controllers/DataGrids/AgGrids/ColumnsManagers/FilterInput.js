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
                                    .initEvents();
                            };
                            FilterInput.prototype.getGui = function () {
                                return this.input;
                            };
                            FilterInput.prototype.SetText = function () {
                                // todo: set up filter text info input in grid short syntax
                                return this;
                            };
                            FilterInput.prototype.initParams = function (agParams) {
                                this.params = agParams;
                                this.grid = this.params.grid;
                                this.columnId = this.params.columnId;
                                this.multiFilter = ((this.grid.GetServerConfig().filteringMode & AgGrids.Enums.FilteringMode.FILTER_MULTIPLE_COLUMNS) != 0);
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
                                return this;
                            };
                            FilterInput.prototype.handleSubmit = function (e) {
                                if (e.key !== 'Enter')
                                    return;
                                this.grid.GetEvents().HandleInputFilterChange(this.columnId, this.input.value);
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
                                this.multiFilter = false;
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