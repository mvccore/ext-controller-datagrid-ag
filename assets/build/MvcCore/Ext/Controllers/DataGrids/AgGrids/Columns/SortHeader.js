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
                        var SortHeader = /** @class */ (function () {
                            function SortHeader() {
                                var _newTarget = this.constructor;
                                this.Static = _newTarget;
                                this.contActiveClsRegExp = new RegExp('\\s+(' + this.Static.SELECTORS.PARENT_ACTIVE_CLS.replace(/\-/g, '\\-') + ')\\s+', 'g');
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
                                if (this.params.renderSequence) {
                                    this.elms.sequence.innerHTML = (sequence == null
                                        ? ''
                                        : Number(this.sequence + 1).toString());
                                }
                                return this;
                            };
                            SortHeader.prototype.SetDirection = function (direction) {
                                this.direction = direction;
                                if (direction != null) {
                                    this.setSortActive();
                                }
                                else {
                                    this.setSortInactive();
                                }
                                return this;
                            };
                            SortHeader.prototype.OnReady = function () {
                                if (this.sortable && this.direction != null) {
                                    var sels = this.Static.SELECTORS;
                                    var parentCont = this.elms.cont.parentNode;
                                    parentCont.className = [parentCont.className, sels.PARENT_ACTIVE_CLS].join(' ');
                                }
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
                                var sels = this.Static.SELECTORS, cont = document.createElement('div'), innerCode = [];
                                var innerCodes = {
                                    label: "<div class=\"".concat(sels.LABEL_CLS, "\">").concat(this.params.displayName, "</div>"),
                                    sequence: "<div class=\"".concat(sels.ORDER_CLS, "\"></div>"),
                                    direction: "<div class=\"".concat(sels.DIRECTION_CLS, "\"></div>"),
                                    remove: "<div class=\"".concat(sels.REMOVE_CLS, "\"></div>"),
                                };
                                innerCode = [innerCodes.label];
                                if (this.sortable) {
                                    if (this.params.renderSequence)
                                        innerCode.push(innerCodes.sequence);
                                    if (this.params.renderDirection)
                                        innerCode.push(innerCodes.direction);
                                    if (this.params.renderRemove)
                                        innerCode.push(innerCodes.remove);
                                }
                                var itemsCountClass = sels.CONT_ITEMS_CLS_BASE + innerCode.length;
                                cont.className = this.contBaseClass = [sels.CONT_CLS, itemsCountClass].join(' ');
                                cont.innerHTML = innerCode.join('');
                                this.elms = {
                                    cont: cont,
                                    label: cont.querySelector('.' + sels.LABEL_CLS)
                                };
                                if (this.sortable) {
                                    if (this.params.renderSequence)
                                        this.elms.sequence = cont.querySelector('.' + sels.ORDER_CLS);
                                    if (this.params.renderDirection)
                                        this.elms.direction = cont.querySelector('.' + sels.DIRECTION_CLS);
                                    if (this.params.renderRemove)
                                        this.elms.remove = cont.querySelector('.' + sels.REMOVE_CLS);
                                    this.contBaseClass = [sels.CONT_CLS, sels.SORTABLE_CLS, itemsCountClass].join(' ');
                                    if (this.direction == null) {
                                        this.elms.cont.className = this.contBaseClass;
                                    }
                                    else {
                                        this.elms.cont.className = [this.contBaseClass, sels.ACTIVE_CLS].join(' ');
                                        if (this.params.renderSequence)
                                            this.elms.sequence.innerHTML = Number(this.sequence + 1).toString();
                                        if (this.params.renderDirection) {
                                            this.elms.direction.className = [
                                                sels.DIRECTION_CLS,
                                                this.direction === 1
                                                    ? sels.ASC_CLS
                                                    : sels.DESC_CLS
                                            ].join(' ');
                                        }
                                    }
                                }
                                return this;
                            };
                            SortHeader.prototype.initEvents = function () {
                                if (!this.sortable)
                                    return this;
                                this.handlers = {};
                                this.elms.cont.addEventListener('click', this.handlers.handleContClick = this.handleContClick.bind(this));
                                if (this.params.renderRemove) {
                                    this.elms.remove.addEventListener('click', this.handlers.handleRemoveClick = this.handleRemoveClick.bind(this), true);
                                }
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
                                if (this.handlers.handleContClick)
                                    this.elms.label.removeEventListener('click', this.handlers.handleContClick);
                                if (this.params.renderRemove && this.handlers.handleRemoveClick)
                                    this.elms.remove.removeEventListener('click', this.handlers.handleRemoveClick, true);
                                if (this.elms.cont.parentNode != null)
                                    this.elms.cont.parentNode.removeChild(this.elms.cont);
                                this.params = null;
                                this.grid = null;
                                this.sortable = null;
                                this.sequence = null;
                                this.direction = null;
                            };
                            SortHeader.prototype.handleContClick = function (e) {
                                this.grid.GetColumnsVisibilityMenu().Hide();
                                if (this.params.renderRemove) {
                                    this.switchDirectionByTwoStates();
                                }
                                else {
                                    this.switchDirectionByThreeStates();
                                }
                                this.grid.GetEvents().HandleSortChange(this.columnId, this.direction);
                            };
                            SortHeader.prototype.handleRemoveClick = function (e) {
                                e.preventDefault();
                                e.stopPropagation();
                                e.cancelBubble = true;
                                this.grid.GetColumnsVisibilityMenu().Hide();
                                this.direction = null;
                                this.setSortInactive();
                                this.grid.GetEvents().HandleSortChange(this.columnId, this.direction);
                            };
                            SortHeader.prototype.switchDirectionByTwoStates = function () {
                                if (this.direction == null || this.direction === 0) {
                                    this.direction = 1;
                                }
                                else if (this.direction === 1) {
                                    this.direction = 0;
                                }
                                this.setSortActive();
                                return this;
                            };
                            SortHeader.prototype.switchDirectionByThreeStates = function () {
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
                                return this;
                            };
                            SortHeader.prototype.setSortActive = function () {
                                this.sequence = 0;
                                if (this.params.renderSequence)
                                    this.elms.sequence.innerHTML = '1';
                                var sels = this.Static.SELECTORS;
                                var parentCont = this.elms.cont.parentNode;
                                var className = ' ' + parentCont.className + ' ';
                                if (!className.match(this.contActiveClsRegExp))
                                    parentCont.className = [className, sels.PARENT_ACTIVE_CLS].join(' ');
                                this.elms.cont.className = [this.contBaseClass, sels.ACTIVE_CLS].join(' ');
                                if (this.params.renderDirection) {
                                    this.elms.direction.className = [
                                        sels.DIRECTION_CLS,
                                        this.direction === 1
                                            ? sels.ASC_CLS
                                            : sels.DESC_CLS
                                    ].join(' ');
                                }
                                return this;
                            };
                            SortHeader.prototype.setSortInactive = function () {
                                this.sequence = null;
                                if (this.params.renderSequence)
                                    this.elms.sequence.innerHTML = '';
                                var sels = this.Static.SELECTORS;
                                this.elms.cont.className = this.contBaseClass;
                                var parentCont = this.elms.cont.parentNode;
                                var className = ' ' + parentCont.className + ' ';
                                parentCont.className = className.replace(this.contActiveClsRegExp, ' ');
                                return this;
                            };
                            SortHeader.SELECTORS = {
                                PARENT_ACTIVE_CLS: 'sort-header-active',
                                CONT_CLS: 'sort-header',
                                CONT_ITEMS_CLS_BASE: 'sort-header-items-',
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
                        Columns.SortHeader = SortHeader;
                    })(Columns = AgGrids.Columns || (AgGrids.Columns = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=SortHeader.js.map