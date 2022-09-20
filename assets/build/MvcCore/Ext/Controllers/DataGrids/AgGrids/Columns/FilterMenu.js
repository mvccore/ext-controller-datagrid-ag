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
                        var FilterMenu = /** @class */ (function () {
                            function FilterMenu() {
                                var _newTarget = this.constructor;
                                this.Static = _newTarget;
                                this.sectionHandlers = [];
                            }
                            FilterMenu.prototype.init = function (agParams) {
                                this
                                    .initParams(agParams)
                                    .initElements()
                                    .initEvents();
                            };
                            FilterMenu.prototype.getGui = function () {
                                return this.elms.cont;
                            };
                            /**
                             * Gets called every time the popup is shown, after the GUI returned in
                             * getGui is attached to the DOM. If the filter popup is closed and re-opened, this method is
                             * called each time the filter is shown. This is useful for any logic that requires attachment
                             * before executing, such as putting focus on a particular DOM element. The params has a
                             * callback method 'hidePopup', which you can call at any later point to hide the popup - good
                             * if you have an 'Apply' button and you want to hide the popup after it is pressed.
                             */
                            FilterMenu.prototype.afterGuiAttached = function (params) {
                                this.hideMenuCallback = params.hidePopup;
                                var filtering = this.grid.GetFiltering();
                                this.latestFiltering = filtering.has(this.columnId)
                                    ? filtering.get(this.columnId)
                                    : null;
                                this.SetUpControls(this.latestFiltering);
                            };
                            /**
                             * Gets called when the column is destroyed. If your custom filter needs to do
                             * any resource cleaning up, do it here. A filter is NOT destroyed when it is
                             * made 'not visible', as the GUI is kept to be shown again if the user selects
                             * that filter again. The filter is destroyed when the column it is associated with is
                             * destroyed, either when new columns are set into the grid, or the grid itself is destroyed.
                             */
                            FilterMenu.prototype.destroy = function () {
                                this.destroySections();
                                // remove events
                                if (this.handlers.handleApply)
                                    this.elms.btnApply.removeEventListener('click', this.handlers.handleApply);
                                if (this.handlers.handleClear)
                                    this.elms.btnClear.removeEventListener('click', this.handlers.handleClear);
                                if (this.handlers.handleCancel)
                                    this.elms.btnCancel.removeEventListener('click', this.handlers.handleCancel);
                                this.handlers = {};
                                // remove dom
                                var contParent = this.elms.cont.parentNode;
                                if (contParent != null)
                                    contParent.removeChild(this.elms.cont);
                                this.elms = null;
                                // local props
                                this.grid = null;
                                this.translator = null;
                                this.columnId = null;
                                this.serverColumnCfg = null;
                                this.serverType = null;
                                this.controlTypes = null;
                                this.buttons = null;
                                this.filteringStr = null;
                                this.latestFiltering = null;
                                this.sectionHandlers = [];
                                this.hideMenuCallback = null;
                            };
                            FilterMenu.prototype.SetUpControls = function (filteringItem) {
                                var filteringStr = filteringItem == null ? '' : JSON.stringify(AgGrids.Tools.Helpers.ConvertMap2Object(filteringItem));
                                if (filteringStr === this.filteringStr)
                                    return this;
                                this.filteringStr = filteringStr;
                                this
                                    .destroySections()
                                    .createSections(filteringItem);
                                return this;
                            };
                            FilterMenu.prototype.initParams = function (agParams) {
                                this.params = agParams;
                                this.grid = this.params.grid;
                                this.translator = this.grid.GetTranslator();
                                this.columnId = this.params.columnId;
                                this.serverColumnCfg = this.params.serverColumnCfg;
                                this.serverType = this.params.serverType;
                                this.controlTypes = this.params.controlTypes;
                                this.buttons = this.params.buttons;
                                this.grid.GetFilterMenus().set(this.columnId, this);
                                return this;
                            };
                            FilterMenu.prototype.initElements = function () {
                                var sels = this.Static.SELECTORS;
                                var cont = document.createElement('div');
                                cont.className = sels.CONT_CLS;
                                var sectionsCont = document.createElement('div');
                                sectionsCont.className = sels.SECTIONS_CLS;
                                sectionsCont = cont.appendChild(sectionsCont);
                                var buttonsCont = null, btnApply = null, btnClear = null, btnCancel = null;
                                if (this.buttons !== AgGrids.Enums.FilterButton.NONE) {
                                    buttonsCont = document.createElement('div');
                                    buttonsCont.className = sels.BTNS_CLS;
                                    buttonsCont = cont.appendChild(buttonsCont);
                                    if ((this.buttons & AgGrids.Enums.FilterButton.APPLY) != 0)
                                        btnApply = buttonsCont.appendChild(this.initElementButton(this.translator.Translate('applyFilter'), sels.BTN_APPLY_CLS));
                                    if ((this.buttons & AgGrids.Enums.FilterButton.CLEAR) != 0)
                                        btnClear = buttonsCont.appendChild(this.initElementButton(this.translator.Translate('clearFilter'), sels.BTN_CLEAR_CLS));
                                    if ((this.buttons & AgGrids.Enums.FilterButton.CANCEL) != 0)
                                        btnCancel = buttonsCont.appendChild(this.initElementButton(this.translator.Translate('cancelFilter'), sels.BTN_CANCEL_CLS));
                                }
                                this.elms = {
                                    cont: cont,
                                    sectionsCont: sectionsCont,
                                    sections: [],
                                    buttonsCont: buttonsCont,
                                    btnApply: btnApply,
                                    btnClear: btnClear,
                                    btnCancel: btnCancel
                                };
                                return this;
                            };
                            FilterMenu.prototype.initElementButton = function (text, className) {
                                var btn = document.createElement('a');
                                btn.className = className;
                                btn.href = '#';
                                var span = document.createElement('span');
                                span = btn.appendChild(span);
                                var b = document.createElement('b');
                                b = span.appendChild(b);
                                b.innerHTML = text;
                                return btn;
                            };
                            FilterMenu.prototype.initEvents = function () {
                                this.handlers = {};
                                if (this.buttons !== AgGrids.Enums.FilterButton.NONE) {
                                    if (this.elms.btnApply)
                                        this.elms.btnApply.addEventListener('click', this.handlers.handleApply = this.handleApply.bind(this));
                                    if (this.elms.btnClear)
                                        this.elms.btnClear.addEventListener('click', this.handlers.handleClear = this.handleClear.bind(this));
                                    if (this.elms.btnCancel)
                                        this.elms.btnCancel.addEventListener('click', this.handlers.handleCancel = this.handleCancel.bind(this));
                                }
                                return this;
                            };
                            FilterMenu.prototype.handleApply = function (e) {
                                this.stopEvent(e);
                                var filtering = this.getFilteringFromControls();
                                this.grid.GetEvents().HandleFilterMenuChange(this.columnId, filtering);
                                this.hide();
                            };
                            FilterMenu.prototype.handleClear = function (e) {
                                this.stopEvent(e);
                                this.filteringStr = '';
                                this.latestFiltering = null;
                                this
                                    .destroySections()
                                    .createSections(null);
                                this.grid.GetEvents().HandleFilterMenuChange(this.columnId, null);
                                this.hide();
                            };
                            FilterMenu.prototype.handleCancel = function (e) {
                                this.stopEvent(e);
                                this
                                    .destroySections()
                                    .createSections(this.latestFiltering);
                                this.hide();
                            };
                            FilterMenu.prototype.destroySections = function () {
                                for (var index = this.elms.sections.length - 1; index >= 0; index--)
                                    this.destroySection(index, this.elms.sections[index]);
                                return this;
                            };
                            FilterMenu.prototype.destroySection = function (index, sectionElms) {
                                var sectionElms = this.elms.sections[index], sectionHandlers = this.sectionHandlers[index];
                                if (sectionHandlers.handleTypeChange != null)
                                    sectionElms.typeSelect.removeEventListener('change', sectionHandlers.handleTypeChange);
                                if (sectionHandlers.handleValueChange != null)
                                    sectionElms.valueInput.removeEventListener('change', sectionHandlers.handleValueChange);
                                if (sectionHandlers.handleValueKeyUp != null)
                                    sectionElms.valueInput.removeEventListener('keyup', sectionHandlers.handleValueKeyUp);
                                if (sectionHandlers.handleAddNextValue != null)
                                    sectionElms.btnNextValue.removeEventListener('click', sectionHandlers.handleAddNextValue);
                                this.elms.sections.splice(index, 1);
                                this.elms.sectionsCont.removeChild(sectionElms.section);
                                return this;
                            };
                            FilterMenu.prototype.createSections = function (filteringItem) {
                                var e_1, _a, e_2, _b, e_3, _c;
                                var index = 0;
                                if (filteringItem != null && filteringItem.size > 0) {
                                    var totalSectionsCount = 0;
                                    try {
                                        for (var _d = __values(filteringItem.values()), _e = _d.next(); !_e.done; _e = _d.next()) {
                                            var values = _e.value;
                                            totalSectionsCount += values.length;
                                        }
                                    }
                                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                    finally {
                                        try {
                                            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                                        }
                                        finally { if (e_1) throw e_1.error; }
                                    }
                                    try {
                                        for (var _f = __values(filteringItem.entries()), _g = _f.next(); !_g.done; _g = _f.next()) {
                                            var _h = __read(_g.value, 2), operator = _h[0], values = _h[1];
                                            try {
                                                for (var values_1 = (e_3 = void 0, __values(values)), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                                                    var value = values_1_1.value;
                                                    this
                                                        .createSectionElements(operator, value, index, totalSectionsCount)
                                                        .initSectionEvents(index);
                                                    index++;
                                                }
                                            }
                                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                            finally {
                                                try {
                                                    if (values_1_1 && !values_1_1.done && (_c = values_1.return)) _c.call(values_1);
                                                }
                                                finally { if (e_3) throw e_3.error; }
                                            }
                                        }
                                    }
                                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                    finally {
                                        try {
                                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                                        }
                                        finally { if (e_2) throw e_2.error; }
                                    }
                                }
                                else {
                                    this
                                        .createSectionElements(null, null)
                                        .initSectionEvents(index);
                                }
                                return this;
                            };
                            FilterMenu.prototype.createSectionElements = function (operator, value, index, filteringItemsCount) {
                                if (index === void 0) { index = 0; }
                                if (filteringItemsCount === void 0) { filteringItemsCount = 1; }
                                var section = document.createElement('div');
                                section.className = this.Static.SELECTORS.SECTION_CLS;
                                var _a = __read(this.createSectionElementTypeSelect(section, operator, value), 2), typeSelect = _a[0], currentControlType = _a[1];
                                var valueInput = this.createSectionElementValueInput(section, operator, value, currentControlType);
                                var btnNextValue = this.createSectionElementBtnNextValue(section, index, filteringItemsCount);
                                section = this.elms.sectionsCont.appendChild(section);
                                this.elms.sections.push({
                                    section: section,
                                    typeSelect: typeSelect,
                                    valueInput: valueInput,
                                    btnNextValue: btnNextValue
                                });
                                return this.changeValueInputType(index, currentControlType);
                            };
                            FilterMenu.prototype.changeValueInputType = function (index, currentControlType) {
                                // do nothing in base class
                                return this;
                            };
                            FilterMenu.prototype.createSectionElementTypeSelect = function (section, operator, value) {
                                var e_4, _a;
                                var typeSelect = document.createElement('select');
                                typeSelect.className = this.Static.SELECTORS.TYPE_CLS;
                                var allServerTypesControlTypesOrders = Columns.FilterOperatorsCfg.SERVER_TYPES_CONTROL_TYPES_ORDERS;
                                var allControlTypes = allServerTypesControlTypesOrders.has(this.serverType)
                                    ? allServerTypesControlTypesOrders.get(this.serverType)
                                    : allServerTypesControlTypesOrders.get(AgGrids.Enums.ServerType.STRING);
                                var currentControlType = this.getControlTypeByOperatorAndValue(operator, value, allControlTypes.length > 0
                                    ? allControlTypes[0]
                                    : AgGrids.Enums.FilterControlType.UNKNOWN), allowedControlTypes = this.params.controlTypes;
                                try {
                                    for (var allControlTypes_1 = __values(allControlTypes), allControlTypes_1_1 = allControlTypes_1.next(); !allControlTypes_1_1.done; allControlTypes_1_1 = allControlTypes_1.next()) {
                                        var controlType = allControlTypes_1_1.value;
                                        if ((allowedControlTypes & controlType) != 0) {
                                            var option = document.createElement('option');
                                            if (controlType === currentControlType) {
                                                option.selected = true;
                                            }
                                            option.value = controlType.toString();
                                            option.title = [
                                                'column',
                                                Columns.FilterOperatorsCfg.CONTROL_TYPES_OPERATORS.get(controlType).toString(),
                                                Columns.FilterOperatorsCfg.CONTROL_TYPES_VALUE_PATTERNS.get(controlType).replace('<value>', 'value')
                                            ].join(' ');
                                            option.innerHTML = this.translator.Translate(Columns.FilterOperatorsCfg.CONTROL_TYPES_TEXTS.get(controlType));
                                            typeSelect.appendChild(option);
                                        }
                                    }
                                }
                                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                finally {
                                    try {
                                        if (allControlTypes_1_1 && !allControlTypes_1_1.done && (_a = allControlTypes_1.return)) _a.call(allControlTypes_1);
                                    }
                                    finally { if (e_4) throw e_4.error; }
                                }
                                return [section.appendChild(typeSelect), currentControlType];
                            };
                            FilterMenu.prototype.createSectionElementValueInput = function (section, operator, value, currentControlType) {
                                var sels = this.Static.SELECTORS, valueInput = document.createElement('input');
                                if (currentControlType === AgGrids.Enums.FilterControlType.IS_NULL ||
                                    currentControlType === AgGrids.Enums.FilterControlType.IS_NOT_NULL ||
                                    this.serverType === AgGrids.Enums.ServerType.BOOL) {
                                    valueInput.className = [sels.INPUT_CLS, sels.INPUT_HIDDEN_CLS].join(' ');
                                }
                                else {
                                    valueInput.className = sels.INPUT_CLS;
                                    if (value != null) {
                                        var valuePattern = Columns.FilterOperatorsCfg.CONTROL_TYPES_VALUE_PATTERNS.get(currentControlType), regExp = new RegExp('^' + valuePattern.replace('<value>', '(.*)') + '$', 'g'), value = value.replace(regExp, '$1');
                                        this.setValueInput(valueInput, value, currentControlType);
                                    }
                                }
                                return section.appendChild(valueInput);
                            };
                            FilterMenu.prototype.createSectionElementBtnNextValue = function (section, index, filteringItemsCount) {
                                var sels = this.Static.SELECTORS, btnNextValue = section.appendChild(this.initElementButton(this.translator.Translate('addOr'), sels.BTN_ADD_CLS));
                                var hiddenBtnClass = [sels.BTN_ADD_CLS, sels.BTN_ADD_HIDDEN_CLS].join(' ');
                                if (index + 1 < filteringItemsCount) {
                                    btnNextValue.className = hiddenBtnClass;
                                }
                                else if (filteringItemsCount === 1 &&
                                    this.serverType === AgGrids.Enums.ServerType.BOOL && !((this.params.controlTypes & AgGrids.Enums.FilterControlType.IS_NULL) != 0 ||
                                    (this.params.controlTypes & AgGrids.Enums.FilterControlType.IS_NOT_NULL) != 0)) {
                                    btnNextValue.className = hiddenBtnClass;
                                }
                                return btnNextValue;
                            };
                            FilterMenu.prototype.setValueInput = function (valueInput, value, currentControlType) {
                                // do nothing special in base class
                                valueInput.value = value;
                                return this;
                            };
                            FilterMenu.prototype.getValueInput = function (valueInput, currentControlType) {
                                // do nothing special in base class
                                return valueInput.value;
                            };
                            FilterMenu.prototype.isControlTypeForCompleteValue = function (currentControlType) {
                                return ((currentControlType & AgGrids.Enums.FilterControlType.EQUAL) != 0 ||
                                    (currentControlType & AgGrids.Enums.FilterControlType.GREATER) != 0 ||
                                    (currentControlType & AgGrids.Enums.FilterControlType.LOWER) != 0 ||
                                    (currentControlType & AgGrids.Enums.FilterControlType.GREATER_EQUAL) != 0 ||
                                    (currentControlType & AgGrids.Enums.FilterControlType.LOWER_EQUAL) != 0 ||
                                    (currentControlType & AgGrids.Enums.FilterControlType.NOT_EQUAL) != 0);
                            };
                            FilterMenu.prototype.initSectionEvents = function (index) {
                                var sectionElms = this.elms.sections[index], sectionHandlers = {};
                                sectionElms.typeSelect.addEventListener('change', sectionHandlers.handleTypeChange = this.handleTypeChange.bind(this, index));
                                if (this.buttons === AgGrids.Enums.FilterButton.NONE) {
                                    sectionElms.valueInput.addEventListener('change', sectionHandlers.handleValueChange = this.handleValueChange.bind(this, index));
                                }
                                sectionElms.valueInput.addEventListener('keyup', sectionHandlers.handleValueKeyUp = this.handleValueKeyUp.bind(this, index));
                                sectionElms.btnNextValue.addEventListener('click', sectionHandlers.handleAddNextValue = this.handleAddNextValue.bind(this, index));
                                this.sectionHandlers[index] = sectionHandlers;
                                return this;
                            };
                            FilterMenu.prototype.handleTypeChange = function (index, e) {
                                var sectionElms = this.elms.sections[index], sels = this.Static.SELECTORS, filteringControlType = parseInt(sectionElms.typeSelect.value, 10);
                                if (filteringControlType === AgGrids.Enums.FilterControlType.IS_NULL ||
                                    filteringControlType === AgGrids.Enums.FilterControlType.IS_NOT_NULL ||
                                    this.serverType === AgGrids.Enums.ServerType.BOOL) {
                                    sectionElms.valueInput.className = [sels.INPUT_CLS, sels.INPUT_HIDDEN_CLS].join(' ');
                                }
                                else {
                                    sectionElms.valueInput.className = sels.INPUT_CLS;
                                    this.changeValueInputType(index, filteringControlType);
                                }
                            };
                            FilterMenu.prototype.handleValueChange = function (index, e) {
                                this.handleApply();
                                this.stopEvent(e);
                            };
                            FilterMenu.prototype.handleValueKeyUp = function (index, e) {
                                if (e.key === 'Enter') {
                                    this.handleApply();
                                    e.preventDefault();
                                    e.stopPropagation();
                                    e.cancelBubble = true;
                                }
                            };
                            FilterMenu.prototype.handleAddNextValue = function (index, e) {
                                this.stopEvent(e);
                                var sectionElms = this.elms.sections[index], sels = this.Static.SELECTORS;
                                sectionElms.btnNextValue.className = [sels.BTN_ADD_CLS, sels.BTN_ADD_HIDDEN_CLS].join(' ');
                                var nextIndex = index + 1;
                                this
                                    .createSectionElements(null, null, nextIndex, nextIndex + 1)
                                    .initSectionEvents(nextIndex);
                            };
                            FilterMenu.prototype.getFilteringFromControls = function () {
                                var e_5, _a;
                                var filtering = new Map(), operator, filteringControlType, valuePattern, rawValue, value;
                                try {
                                    for (var _b = __values(this.elms.sections), _c = _b.next(); !_c.done; _c = _b.next()) {
                                        var sectionElms = _c.value;
                                        filteringControlType = parseInt(sectionElms.typeSelect.value, 10);
                                        rawValue = this.getValueInput(sectionElms.valueInput, filteringControlType);
                                        valuePattern = Columns.FilterOperatorsCfg.CONTROL_TYPES_VALUE_PATTERNS.get(filteringControlType);
                                        value = valuePattern.replace('<value>', rawValue);
                                        operator = Columns.FilterOperatorsCfg.CONTROL_TYPES_OPERATORS.get(filteringControlType);
                                        if (filtering.has(operator)) {
                                            filtering.get(operator).push(value);
                                        }
                                        else {
                                            filtering.set(operator, [value]);
                                        }
                                    }
                                }
                                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                finally {
                                    try {
                                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                    }
                                    finally { if (e_5) throw e_5.error; }
                                }
                                return filtering;
                            };
                            FilterMenu.prototype.hide = function () {
                                if (this.hideMenuCallback)
                                    this.hideMenuCallback();
                                this.hideMenuCallback = null;
                                return this;
                            };
                            FilterMenu.prototype.getControlTypeByOperatorAndValue = function (operator, value, defaultResult) {
                                var result = AgGrids.Enums.FilterControlType.UNKNOWN;
                                if (operator == null || value == null)
                                    return defaultResult;
                                var isEqual = operator === AgGrids.Enums.Operator.EQUAL, isNotEqual = operator === AgGrids.Enums.Operator.NOT_EQUAL, isLike = operator === AgGrids.Enums.Operator.LIKE, isNotLike = operator === AgGrids.Enums.Operator.NOT_LIKE;
                                if (isEqual || isNotEqual) {
                                    if (isEqual && this.serverType === AgGrids.Enums.ServerType.BOOL) {
                                        result = value === '1'
                                            ? AgGrids.Enums.FilterControlType.IS_TRUE
                                            : AgGrids.Enums.FilterControlType.IS_FALSE;
                                    }
                                    else if (value === 'null') {
                                        result = isEqual
                                            ? AgGrids.Enums.FilterControlType.IS_NULL
                                            : AgGrids.Enums.FilterControlType.IS_NOT_NULL;
                                    }
                                    else {
                                        result = isEqual
                                            ? AgGrids.Enums.FilterControlType.EQUAL
                                            : AgGrids.Enums.FilterControlType.NOT_EQUAL;
                                    }
                                }
                                else if (operator === AgGrids.Enums.Operator.LOWER) {
                                    result = AgGrids.Enums.FilterControlType.LOWER;
                                }
                                else if (operator === AgGrids.Enums.Operator.GREATER) {
                                    result = AgGrids.Enums.FilterControlType.GREATER;
                                }
                                else if (operator === AgGrids.Enums.Operator.LOWER_EQUAL) {
                                    result = AgGrids.Enums.FilterControlType.LOWER_EQUAL;
                                }
                                else if (operator === AgGrids.Enums.Operator.GREATER_EQUAL) {
                                    result = AgGrids.Enums.FilterControlType.GREATER_EQUAL;
                                }
                                else if (isLike || isNotLike) {
                                    var startsAndEndsRegExp = /^%(.*)%$/g, startsWithRegExp = /([^%_]+)%$/g, endsWithRegExp = /^%([^%_]+)/g;
                                    if (value.match(startsAndEndsRegExp)) {
                                        result = isLike
                                            ? AgGrids.Enums.FilterControlType.CONTAINS
                                            : AgGrids.Enums.FilterControlType.NOT_CONTAINS;
                                    }
                                    else if (value.match(startsWithRegExp)) {
                                        result = isLike
                                            ? AgGrids.Enums.FilterControlType.STARTS_WITH
                                            : AgGrids.Enums.FilterControlType.NOT_STARTS_WITH;
                                    }
                                    else if (value.match(endsWithRegExp)) {
                                        result = isLike
                                            ? AgGrids.Enums.FilterControlType.ENDS_WITH
                                            : AgGrids.Enums.FilterControlType.NOT_ENDS_WITH;
                                    }
                                    else {
                                        result = isLike
                                            ? AgGrids.Enums.FilterControlType.CONTAINS
                                            : AgGrids.Enums.FilterControlType.NOT_CONTAINS;
                                    }
                                }
                                if (result === AgGrids.Enums.FilterControlType.UNKNOWN)
                                    result = defaultResult;
                                return result;
                            };
                            FilterMenu.prototype.stopEvent = function (e) {
                                if (e == null)
                                    return this;
                                e.preventDefault();
                                e.stopPropagation();
                                e.cancelBubble = true;
                                return this;
                            };
                            FilterMenu.prototype.isFilterActive = function () {
                                return false;
                            };
                            FilterMenu.prototype.doesFilterPass = function (params) {
                                return false;
                            };
                            FilterMenu.prototype.getModel = function () {
                            };
                            FilterMenu.prototype.setModel = function () {
                            };
                            FilterMenu.SELECTORS = {
                                CONT_CLS: 'filter-menu',
                                SECTIONS_CLS: 'filter-sections',
                                SECTION_CLS: 'filter-section',
                                TYPE_CLS: 'filter-type',
                                INPUT_CLS: 'filter-input',
                                INPUT_HIDDEN_CLS: 'filter-input-hidden',
                                BTN_ADD_CLS: 'filter-add-btn',
                                BTN_ADD_HIDDEN_CLS: 'filter-add-btn-hidden',
                                BTNS_CLS: 'filter-buttons',
                                BTN_APPLY_CLS: 'filter-button filter-button-apply',
                                BTN_CLEAR_CLS: 'filter-button filter-button-clear',
                                BTN_CANCEL_CLS: 'filter-button filter-button-storno',
                            };
                            return FilterMenu;
                        }());
                        Columns.FilterMenu = FilterMenu;
                    })(Columns = AgGrids.Columns || (AgGrids.Columns = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=FilterMenu.js.map