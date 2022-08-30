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
                        var SortHeader = /** @class */ (function () {
                            function SortHeader() {
                                var _newTarget = this.constructor;
                                this.Static = _newTarget;
                            }
                            SortHeader.prototype.init = function (agParams) {
                                this
                                    .initParams(agParams)
                                    .initElements()
                                    .initEvents();
                            };
                            SortHeader.prototype.getGui = function () {
                                return this.elms.cont;
                            };
                            SortHeader.prototype.SetSequence = function (sequence) {
                                this.sequence = sequence;
                                this.elms.order.innerHTML = Number(this.sequence + 1).toString();
                                return this;
                            };
                            SortHeader.prototype.initParams = function (agParams) {
                                this.params = agParams;
                                this.grid = this.params.grid;
                                this.columnId = this.params.columnId;
                                this.sortable = this.params.sortable;
                                this.sequence = this.params.sequence;
                                this.direction = this.params.direction;
                                this.grid.GetSortHeaders().set(this.columnId, this);
                                return this;
                            };
                            SortHeader.prototype.initElements = function () {
                                var sels = this.Static.SELECTORS, cont = document.createElement('div');
                                cont.className = sels.CONT_CLS;
                                var innerCodeItems = [
                                    "<div class=\"" + sels.LABEL_CLS + "\">" + this.params.displayName + "</div>",
                                    "<div class=\"" + sels.ORDER_CLS + "\"></div>",
                                    "<div class=\"" + sels.DIRECTION_CLS + "\"></div>",
                                    "<div class=\"" + sels.REMOVE_CLS + "\"></div>",
                                ];
                                if (!this.sortable) {
                                    innerCodeItems = [innerCodeItems[0]];
                                }
                                cont.innerHTML = innerCodeItems.join('');
                                this.elms = {
                                    cont: cont,
                                    label: cont.querySelector('.' + sels.LABEL_CLS)
                                };
                                if (this.sortable) {
                                    this.elms.order = cont.querySelector('.' + sels.ORDER_CLS);
                                    this.elms.direction = cont.querySelector('.' + sels.DIRECTION_CLS);
                                    this.elms.remove = cont.querySelector('.' + sels.REMOVE_CLS);
                                    if (this.direction == null) {
                                        this.elms.cont.className = [sels.CONT_CLS, sels.SORTABLE_CLS].join(' ');
                                    }
                                    else {
                                        this.elms.cont.className = [sels.CONT_CLS, sels.SORTABLE_CLS, sels.ACTIVE_CLS].join(' ');
                                        this.elms.order.innerHTML = Number(this.sequence + 1).toString();
                                        this.elms.direction.className = [
                                            sels.DIRECTION_CLS,
                                            this.direction === 1
                                                ? sels.ASC_CLS
                                                : sels.DESC_CLS
                                        ].join(' ');
                                    }
                                }
                                return this;
                            };
                            SortHeader.prototype.initEvents = function () {
                                if (!this.sortable)
                                    return this;
                                this.handlers = {};
                                this.elms.label.addEventListener('click', this.handlers.handleLabelClick = this.handleLabelClick.bind(this));
                                this.elms.remove.addEventListener('click', this.handlers.handleRemoveClick = this.handleRemoveClick.bind(this));
                                return this;
                            };
                            SortHeader.prototype.refresh = function (agParams) {
                                this.destroy();
                                this
                                    .initParams(agParams)
                                    .initElements()
                                    .initEvents();
                                return true;
                            };
                            SortHeader.prototype.destroy = function () {
                                if (this.handlers.handleLabelClick)
                                    this.elms.label.removeEventListener('click', this.handlers.handleLabelClick);
                                if (this.handlers.handleRemoveClick)
                                    this.elms.remove.removeEventListener('click', this.handlers.handleRemoveClick);
                                if (this.elms.cont.parentNode != null)
                                    this.elms.cont.parentNode.removeChild(this.elms.cont);
                                this.params = null;
                                this.grid = null;
                                this.sortable = null;
                                this.sequence = null;
                                this.direction = null;
                            };
                            SortHeader.prototype.handleLabelClick = function (e) {
                                if (this.direction === 0) {
                                    this.direction = null;
                                    this.setSortInactive();
                                }
                                else {
                                    if (this.direction === 1) {
                                        this.direction = 0;
                                    }
                                    else {
                                        this.direction = 1;
                                    }
                                    this.setSortActive();
                                }
                                this.grid.GetEvents().HandleSortChange(this.columnId, this.direction);
                            };
                            SortHeader.prototype.handleRemoveClick = function (e) {
                                this.direction = null;
                                this.setSortInactive();
                                this.grid.GetEvents().HandleSortChange(this.columnId, this.direction);
                            };
                            SortHeader.prototype.setSortActive = function () {
                                this.sequence = 0;
                                this.elms.order.innerHTML = '1';
                                var sels = this.Static.SELECTORS;
                                this.elms.cont.className = [sels.CONT_CLS, sels.SORTABLE_CLS, sels.ACTIVE_CLS].join(' ');
                                this.elms.direction.className = [
                                    sels.DIRECTION_CLS,
                                    this.direction === 1
                                        ? sels.ASC_CLS
                                        : sels.DESC_CLS
                                ].join(' ');
                                return this;
                            };
                            SortHeader.prototype.setSortInactive = function () {
                                this.sequence = null;
                                this.elms.order.innerHTML = '';
                                var sels = this.Static.SELECTORS;
                                this.elms.cont.className = [sels.CONT_CLS, sels.SORTABLE_CLS].join(' ');
                                return this;
                            };
                            SortHeader.SELECTORS = {
                                CONT_CLS: 'sort-header',
                                SORTABLE_CLS: 'sortable',
                                LABEL_CLS: 'label',
                                ORDER_CLS: 'order',
                                DIRECTION_CLS: 'direction',
                                REMOVE_CLS: 'remove',
                                ACTIVE_CLS: 'active',
                                ASC_CLS: 'asc',
                                DESC_CLS: 'desc',
                            };
                            return SortHeader;
                        }());
                        ColumnsManagers.SortHeader = SortHeader;
                    })(ColumnsManagers = AgGrids.ColumnsManagers || (AgGrids.ColumnsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=SortHeader.js.map