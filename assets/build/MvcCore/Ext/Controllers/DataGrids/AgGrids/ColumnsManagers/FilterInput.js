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
                            }
                            FilterInput.prototype.init = function (params) {
                                var _this = this;
                                this.eGui = document.createElement('div');
                                this.eGui.innerHTML = '<input type="text" style="width:calc(100% - 10px)" />';
                                this.currentValue = null;
                                this.eFilterInput = this.eGui.querySelector('input');
                                ///@ts-ignore
                                this.eFilterInput.style.color = params.color;
                                var onInputBoxChanged = function () {
                                    if (_this.eFilterInput.value === '') {
                                        // clear the filter
                                        params.parentFilterInstance(function (instance) {
                                            instance.onFloatingFilterChanged(null, null);
                                        });
                                        return;
                                    }
                                    _this.currentValue = Number(_this.eFilterInput.value);
                                    params.parentFilterInstance(function (instance) {
                                        // TODO: tohle tady nebude, prostě se pošle to co tam je do gridu a provede se AJAX request
                                        instance.onFloatingFilterChanged('greaterThan', _this.currentValue);
                                    });
                                };
                                this.eFilterInput.addEventListener('input', onInputBoxChanged);
                            };
                            FilterInput.prototype.onParentModelChanged = function (parentModel, event) {
                                // When the filter is empty we will receive a null message her
                                if (!parentModel) {
                                    this.eFilterInput.value = '';
                                    this.currentValue = null;
                                }
                                else {
                                    this.eFilterInput.value = parentModel.filter + '';
                                    this.currentValue = parentModel.filter;
                                }
                            };
                            FilterInput.prototype.getGui = function () {
                                return this.eGui;
                            };
                            // Optional methods
                            // Gets called every time the popup is shown, after the GUI returned in
                            // getGui is attached to the DOM. If the filter popup is closed and re-opened, this method is
                            // called each time the filter is shown. This is useful for any logic that requires attachment
                            // before executing, such as putting focus on a particular DOM element. 
                            FilterInput.prototype.afterGuiAttached = function (params) {
                            };
                            // Gets called when the floating filter is destroyed. Like column headers,
                            // the floating filter lifespan is only when the column is visible,
                            // so they are destroyed if the column is made not visible or when a user
                            // scrolls the column out of view with horizontal scrolling.
                            FilterInput.prototype.destroy = function () {
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