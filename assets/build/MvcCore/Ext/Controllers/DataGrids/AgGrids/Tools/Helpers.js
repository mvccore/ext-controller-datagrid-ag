var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
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
                    var Tools;
                    (function (Tools) {
                        var Helpers = /** @class */ (function () {
                            function Helpers(grid) {
                                var _newTarget = this.constructor;
                                this.Static = _newTarget;
                                this.grid = grid;
                            }
                            Helpers.prototype.GetControlTypeByOperatorAndValue = function (operator, value, defaultResult, serverType) {
                                var result = AgGrids.Enums.FilterControlType.UNKNOWN;
                                if (operator == null || value == null)
                                    return defaultResult;
                                var isEqual = operator === AgGrids.Enums.Operator.EQUAL, isNotEqual = operator === AgGrids.Enums.Operator.NOT_EQUAL, isLike = operator === AgGrids.Enums.Operator.LIKE, isNotLike = operator === AgGrids.Enums.Operator.NOT_LIKE;
                                if (isEqual || isNotEqual) {
                                    if (isEqual && serverType === AgGrids.Enums.ServerType.BOOL) {
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
                            Helpers.prototype.RetypeFilteringMap2Obj = function (filtering) {
                                var e_1, _a;
                                var newFiltering = {};
                                try {
                                    for (var _b = __values(filtering.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                                        var _d = __read(_c.value, 2), idColumn = _d[0], filterValues = _d[1];
                                        newFiltering[idColumn] = Tools.Helpers.ConvertMap2Object(filterValues);
                                    }
                                }
                                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                finally {
                                    try {
                                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                }
                                return newFiltering;
                            };
                            Helpers.prototype.RetypeRequestMaps2Objects = function (serverRequest) {
                                var result = __assign({}, serverRequest);
                                if (serverRequest.filtering instanceof Map) {
                                    result.filtering = this.RetypeFilteringMap2Obj(serverRequest.filtering);
                                }
                                return this.addRequestSystemData(result);
                            };
                            Helpers.prototype.addRequestSystemData = function (serverRequest) {
                                var serverConfig = this.grid.GetServerConfig();
                                serverRequest.id = serverConfig.id;
                                serverRequest.mode = serverConfig.clientPageMode;
                                serverRequest.path = this.grid.GetGridPath();
                                return serverRequest;
                            };
                            Helpers.prototype.RetypeRawServerResponse = function (serverResponse) {
                                serverResponse.filtering = this.retypeFilteringObj2Map(serverResponse.filtering);
                                return serverResponse;
                            };
                            Helpers.prototype.RetypeRequestObjects2Maps = function (serverRequest) {
                                var result = __assign({}, serverRequest);
                                result.filtering = this.retypeFilteringObj2Map(serverRequest.filtering);
                                return result;
                            };
                            Helpers.prototype.retypeFilteringObj2Map = function (filtering) {
                                var e_2, _a;
                                var columnsIds = Object.keys(filtering);
                                if (columnsIds.length > 0) {
                                    var filtering = filtering;
                                    var newFiltering = new Map();
                                    try {
                                        for (var columnsIds_1 = __values(columnsIds), columnsIds_1_1 = columnsIds_1.next(); !columnsIds_1_1.done; columnsIds_1_1 = columnsIds_1.next()) {
                                            var idColumn = columnsIds_1_1.value;
                                            newFiltering.set(idColumn, Tools.Helpers.ConvertObject2Map(filtering[idColumn]));
                                        }
                                    }
                                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                    finally {
                                        try {
                                            if (columnsIds_1_1 && !columnsIds_1_1.done && (_a = columnsIds_1.return)) _a.call(columnsIds_1);
                                        }
                                        finally { if (e_2) throw e_2.error; }
                                    }
                                    return newFiltering;
                                }
                                else {
                                    return new Map();
                                }
                            };
                            Helpers.prototype.IsTouchDevice = function () {
                                var _a;
                                return (_a = this.touchDevice) !== null && _a !== void 0 ? _a : (this.touchDevice = (('ontouchstart' in window) ||
                                    ///@ts-ignore
                                    (navigator['msMaxTouchPoints'] > 0)));
                            };
                            Helpers.prototype.IsChromeBrowser = function () {
                                var _a;
                                return (_a = this.isChromeBrowser) !== null && _a !== void 0 ? _a : (this.isChromeBrowser = (/Chrome/.test(navigator.userAgent) &&
                                    /Google Inc/.test(navigator.vendor)));
                            };
                            Helpers.prototype.GetHtmlElementFromString = function (htmlCode) {
                                var contDiv = document.createElement('div');
                                contDiv.innerHTML = htmlCode.trim();
                                return contDiv.firstChild;
                            };
                            Helpers.prototype.IsInstanceOfIServerRequestRaw = function (obj) {
                                return (obj != null &&
                                    'id' in obj && 'mode' in obj &&
                                    'offset' in obj && 'limit' in obj &&
                                    'sorting' in obj && 'filtering' in obj &&
                                    obj.id === this.grid.GetServerConfig().id);
                            };
                            Helpers.prototype.RetypeRawServerConfig = function (serverConfig) {
                                serverConfig.urlSegments.urlFilterOperators = this.Static.ConvertObject2Map(serverConfig.urlSegments.urlFilterOperators);
                                serverConfig.ajaxParamsNames = this.Static.ConvertObject2Map(serverConfig.ajaxParamsNames);
                                serverConfig.filterOperatorPrefixes = this.Static.ConvertObject2Map(serverConfig.filterOperatorPrefixes);
                                serverConfig.controlsTexts = this.Static.ConvertObject2Map(serverConfig.controlsTexts);
                                return serverConfig;
                            };
                            Helpers.prototype.GetAllowedOperators = function (columnFilterFlags) {
                                var e_3, _a;
                                var urlFilterOperators = this.grid.GetServerConfig().urlSegments.urlFilterOperators, allowedOperators = new Map(), allowRanges = (columnFilterFlags & AgGrids.Enums.FilteringMode.ALLOW_RANGES) != 0, allowLikeRight = (columnFilterFlags & AgGrids.Enums.FilteringMode.ALLOW_LIKE_RIGHT_SIDE) != 0, allowLikeLeft = (columnFilterFlags & AgGrids.Enums.FilteringMode.ALLOW_LIKE_LEFT_SIDE) != 0, allowLikeAnywhere = (columnFilterFlags & AgGrids.Enums.FilteringMode.ALLOW_LIKE_ANYWHERE) != 0, operators = [
                                    AgGrids.Enums.Operator.EQUAL, AgGrids.Enums.Operator.NOT_EQUAL
                                ]; // equal and not equal are allowed for filtering by default
                                if (allowRanges)
                                    operators = __spread(operators, [
                                        AgGrids.Enums.Operator.LOWER,
                                        AgGrids.Enums.Operator.GREATER,
                                        AgGrids.Enums.Operator.LOWER_EQUAL,
                                        AgGrids.Enums.Operator.GREATER_EQUAL
                                    ]);
                                if (allowLikeRight || allowLikeLeft || allowLikeAnywhere)
                                    operators = __spread(operators, [
                                        AgGrids.Enums.Operator.LIKE,
                                        AgGrids.Enums.Operator.NOT_LIKE
                                    ]);
                                var urlSegment, multipleValues, likeOperator, regex;
                                try {
                                    for (var operators_1 = __values(operators), operators_1_1 = operators_1.next(); !operators_1_1.done; operators_1_1 = operators_1.next()) {
                                        var operator = operators_1_1.value;
                                        urlSegment = urlFilterOperators.get(operator);
                                        multipleValues = operator.indexOf('<') === -1 && operator.indexOf('>') === -1;
                                        likeOperator = operator.indexOf('LIKE') !== -1;
                                        regex = null;
                                        if (likeOperator && !allowLikeAnywhere) {
                                            if (allowLikeRight && !allowLikeLeft) {
                                                regex = /^([^%_]).*$/g;
                                            }
                                            else if (allowLikeLeft && !allowLikeRight) {
                                                regex = /.*([^%_])$/g;
                                            }
                                            else if (allowLikeLeft && allowLikeRight) {
                                                regex = /^.([^%_]+).$/g;
                                            }
                                        }
                                        allowedOperators.set(operator, {
                                            operator: operator,
                                            multiple: multipleValues,
                                            regex: regex
                                        });
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (operators_1_1 && !operators_1_1.done && (_a = operators_1.return)) _a.call(operators_1);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                                return allowedOperators;
                            };
                            Helpers.prototype.SortConfigColumns = function (serverColumns, columnIndexPropName) {
                                var e_4, _a, e_5, _b, e_6, _c;
                                var indexedMap = new Map(), notIndexedSet = new Set(), serverColumnCfg, columnIndex;
                                for (var columnUrlName in serverColumns) {
                                    serverColumnCfg = serverColumns[columnUrlName];
                                    columnIndex = serverColumnCfg[columnIndexPropName];
                                    if (columnIndex == null) {
                                        notIndexedSet.add(serverColumnCfg);
                                    }
                                    else {
                                        if (indexedMap.has(columnIndex)) {
                                            indexedMap.get(columnIndex).push(serverColumnCfg);
                                        }
                                        else {
                                            indexedMap.set(columnIndex, [serverColumnCfg]);
                                        }
                                    }
                                }
                                var result = [], index = 0, indexedMapKeys = Array.from(indexedMap.keys());
                                indexedMapKeys.sort(function (a, b) { return a - b; });
                                try {
                                    for (var indexedMapKeys_1 = __values(indexedMapKeys), indexedMapKeys_1_1 = indexedMapKeys_1.next(); !indexedMapKeys_1_1.done; indexedMapKeys_1_1 = indexedMapKeys_1.next()) {
                                        var indexedMapKey = indexedMapKeys_1_1.value;
                                        try {
                                            for (var _d = (e_5 = void 0, __values(indexedMap.get(indexedMapKey))), _e = _d.next(); !_e.done; _e = _d.next()) {
                                                var serverColumnCfg = _e.value;
                                                serverColumnCfg[columnIndexPropName] = index++;
                                                result.push(serverColumnCfg);
                                            }
                                        }
                                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                        finally {
                                            try {
                                                if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                                            }
                                            finally { if (e_5) throw e_5.error; }
                                        }
                                    }
                                }
                                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                finally {
                                    try {
                                        if (indexedMapKeys_1_1 && !indexedMapKeys_1_1.done && (_a = indexedMapKeys_1.return)) _a.call(indexedMapKeys_1);
                                    }
                                    finally { if (e_4) throw e_4.error; }
                                }
                                try {
                                    for (var notIndexedSet_1 = __values(notIndexedSet), notIndexedSet_1_1 = notIndexedSet_1.next(); !notIndexedSet_1_1.done; notIndexedSet_1_1 = notIndexedSet_1.next()) {
                                        var serverColumnCfg = notIndexedSet_1_1.value;
                                        serverColumnCfg[columnIndexPropName] = index++;
                                        result.push(serverColumnCfg);
                                    }
                                }
                                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                finally {
                                    try {
                                        if (notIndexedSet_1_1 && !notIndexedSet_1_1.done && (_c = notIndexedSet_1.return)) _c.call(notIndexedSet_1);
                                    }
                                    finally { if (e_6) throw e_6.error; }
                                }
                                return result;
                            };
                            /**
                             * Check if given value contains any LIKE/NOT LIKE special
                             * character: `%` or `_` or escaped like this: `[%]` or `[_]`.
                             * Returns `0` if no special char `%` or `_` matched.
                             * Returns `1` if special char `%` or `_` matched in raw form only, not escaped.
                             * Returns `2` if special char `%` or `_` matched in escaped form only.
                             * Returns `1 | 2` if special char `%` or `_` matched in both forms.
                             */
                            Helpers.prototype.CheckFilterValueForLikeChar = function (rawValue, specialLikeChar) {
                                var containsSpecialChar = 0, index = 0, length = rawValue.length, specialCharPos, escapedSpecialCharPos, matchedEscapedChar = 0;
                                while (index < length) {
                                    specialCharPos = rawValue.indexOf(specialLikeChar, index);
                                    if (specialCharPos === -1)
                                        break;
                                    escapedSpecialCharPos = rawValue.indexOf('[' + specialLikeChar + ']', Math.max(0, index - 1));
                                    if (escapedSpecialCharPos !== -1 && specialCharPos - 1 === escapedSpecialCharPos) {
                                        index = specialCharPos + specialLikeChar.length + 1;
                                        matchedEscapedChar = 2;
                                        continue;
                                    }
                                    index = specialCharPos + 1;
                                    containsSpecialChar = 1;
                                    break;
                                }
                                return containsSpecialChar | matchedEscapedChar;
                            };
                            Helpers.ConvertObject2Map = function (obj) {
                                var data = [];
                                for (var key in obj)
                                    data.push([key, obj[key]]);
                                return new Map(data);
                            };
                            Helpers.ConvertMap2Object = function (map) {
                                var e_7, _a;
                                var obj = {};
                                try {
                                    for (var map_1 = __values(map), map_1_1 = map_1.next(); !map_1_1.done; map_1_1 = map_1.next()) {
                                        var _b = __read(map_1_1.value, 2), key = _b[0], value = _b[1];
                                        obj[key] = value;
                                    }
                                }
                                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                                finally {
                                    try {
                                        if (map_1_1 && !map_1_1.done && (_a = map_1.return)) _a.call(map_1);
                                    }
                                    finally { if (e_7) throw e_7.error; }
                                }
                                return obj;
                            };
                            Helpers.prototype.MergeObjectsRecursively = function (target) {
                                var _a, _b;
                                var sources = [];
                                for (var _i = 1; _i < arguments.length; _i++) {
                                    sources[_i - 1] = arguments[_i];
                                }
                                if (!sources.length)
                                    return target;
                                var source = sources.shift();
                                if (this.isObject(target) && this.isObject(source)) {
                                    for (var key in source) {
                                        if (this.isObject(source[key])) {
                                            if (!target[key])
                                                Object.assign(target, (_a = {}, _a[key] = {}, _a));
                                            this.MergeObjectsRecursively(target[key], source[key]);
                                        }
                                        else {
                                            Object.assign(target, (_b = {}, _b[key] = source[key], _b));
                                        }
                                    }
                                }
                                return this.MergeObjectsRecursively.apply(this, __spread([target], sources));
                            };
                            Helpers.prototype.isObject = function (item) {
                                return (item && typeof item === 'object' && !Array.isArray(item));
                            };
                            return Helpers;
                        }());
                        Tools.Helpers = Helpers;
                    })(Tools = AgGrids.Tools || (AgGrids.Tools = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Helpers.js.map