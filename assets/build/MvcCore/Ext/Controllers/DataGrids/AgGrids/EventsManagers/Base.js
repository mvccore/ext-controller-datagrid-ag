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
                    var EventsManagers;
                    (function (EventsManagers) {
                        var Base = /** @class */ (function () {
                            function Base(grid, serverConfig) {
                                var _newTarget = this.constructor;
                                if (serverConfig === void 0) { serverConfig = null; }
                                this.onLoadSelectionIndex = null;
                                this.onLoadSelectionCallback = null;
                                this.Static = _newTarget;
                                this.grid = grid;
                                this.autoSelectFirstRow = ((serverConfig.rowSelection & AgGrids.Enums.RowSelection.ROW_SELECTION_AUTOSELECT_FIRST) != 0);
                            }
                            Base.prototype.SetAutoSelectFirstRow = function (autoSelectFirstRow) {
                                this.autoSelectFirstRow = autoSelectFirstRow;
                                return this;
                            };
                            Base.prototype.GetAutoSelectFirstRow = function () {
                                return this.autoSelectFirstRow;
                            };
                            Base.prototype.AddEventListener = function (eventName, handler, useTryCatch) {
                                if (useTryCatch === void 0) { useTryCatch = false; }
                                var handlers = this.handlers.has(eventName)
                                    ? this.handlers.get(eventName)
                                    : [];
                                handlers.push([handler, useTryCatch]);
                                this.handlers.set(eventName, handlers);
                                return this;
                            };
                            Base.prototype.RemoveEventListener = function (eventName, handler) {
                                var e_1, _a;
                                var handlers = this.handlers.has(eventName)
                                    ? this.handlers.get(eventName)
                                    : [];
                                var newHandlers = [];
                                try {
                                    for (var handlers_1 = __values(handlers), handlers_1_1 = handlers_1.next(); !handlers_1_1.done; handlers_1_1 = handlers_1.next()) {
                                        var _b = __read(handlers_1_1.value, 2), handlersItem = _b[0], useTryCatchLocal = _b[1];
                                        if (handlersItem !== handler)
                                            newHandlers.push([handlersItem, useTryCatchLocal]);
                                    }
                                }
                                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                finally {
                                    try {
                                        if (handlers_1_1 && !handlers_1_1.done && (_a = handlers_1.return)) _a.call(handlers_1);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                }
                                this.handlers.set(eventName, newHandlers);
                                return this;
                            };
                            Base.prototype.FireHandlers = function (eventName, event) {
                                var e_2, _a;
                                var continueNextEvents = true;
                                if (!this.handlers.has(eventName))
                                    return continueNextEvents;
                                var handlers = this.handlers.get(eventName);
                                event.SetGrid(this.grid).SetEventName(eventName);
                                try {
                                    for (var handlers_2 = __values(handlers), handlers_2_1 = handlers_2.next(); !handlers_2_1.done; handlers_2_1 = handlers_2.next()) {
                                        var _b = __read(handlers_2_1.value, 2), handler = _b[0], useTryCatch = _b[1];
                                        if (useTryCatch) {
                                            try {
                                                handler(event);
                                                if (event.GetStopNextEventsPropagation()) {
                                                    continueNextEvents = false;
                                                    break;
                                                }
                                                else if (event.GetStopCurrentEventPropagation()) {
                                                    break;
                                                }
                                            }
                                            catch (e) { }
                                        }
                                        else {
                                            handler(event);
                                            if (event.GetStopNextEventsPropagation()) {
                                                continueNextEvents = false;
                                                break;
                                            }
                                            else if (event.GetStopCurrentEventPropagation()) {
                                                break;
                                            }
                                        }
                                    }
                                }
                                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                finally {
                                    try {
                                        if (handlers_2_1 && !handlers_2_1.done && (_a = handlers_2.return)) _a.call(handlers_2);
                                    }
                                    finally { if (e_2) throw e_2.error; }
                                }
                                return continueNextEvents;
                            };
                            Base.prototype.SetOnLoadSelectionIndex = function (rowIndexToSelectAfterLoad, onLoadSelectionCallback) {
                                if (onLoadSelectionCallback === void 0) { onLoadSelectionCallback = null; }
                                this.onLoadSelectionIndex = rowIndexToSelectAfterLoad;
                                this.onLoadSelectionCallback = onLoadSelectionCallback;
                                return this;
                            };
                            Base.getOperatorByRawValue = function (rawValue, operatorsAndPrefixes, columnFilterCfg) {
                                var e_3, _a;
                                var operator = null, columnFilterCfgInt = Number(columnFilterCfg), columnFilterCfgIsInt = columnFilterCfg === columnFilterCfgInt, columnFilterCfgIsBool = !columnFilterCfgIsInt;
                                try {
                                    for (var _b = __values(operatorsAndPrefixes.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                                        var _d = __read(_c.value, 2), operatorKey = _d[0], valuePrefix = _d[1];
                                        var valuePrefixLen = valuePrefix.length;
                                        if (valuePrefixLen > 0) {
                                            var valuePrefixChars = rawValue.substring(0, valuePrefixLen);
                                            if (valuePrefixChars === valuePrefix) {
                                                operator = operatorKey;
                                                rawValue = rawValue.substring(valuePrefixLen);
                                                break;
                                            }
                                        }
                                        else {
                                            if ((columnFilterCfgIsBool && columnFilterCfg) ||
                                                (columnFilterCfgIsInt && columnFilterCfgInt & AgGrids.Enums.FilteringMode.ALLOW_EQUALS) != 0) {
                                                operator = operatorKey;
                                            }
                                            else if ((columnFilterCfgInt & AgGrids.Enums.FilteringMode.ALLOW_LIKE_ANYWHERE) != 0 ||
                                                (columnFilterCfgInt & AgGrids.Enums.FilteringMode.ALLOW_LIKE_RIGHT_SIDE) != 0 ||
                                                (columnFilterCfgInt & AgGrids.Enums.FilteringMode.ALLOW_LIKE_LEFT_SIDE) != 0) {
                                                operator = AgGrids.Enums.Operator.LIKE;
                                            }
                                            break;
                                        }
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                                return [rawValue, operator];
                            };
                            Base.COLUMN_CHANGES_TIMEOUT = 500;
                            return Base;
                        }());
                        EventsManagers.Base = Base;
                    })(EventsManagers = AgGrids.EventsManagers || (AgGrids.EventsManagers = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Base.js.map