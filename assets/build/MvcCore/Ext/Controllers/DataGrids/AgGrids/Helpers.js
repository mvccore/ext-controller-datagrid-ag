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
                    var Helpers = /** @class */ (function () {
                        function Helpers(grid) {
                            this.grid = grid;
                        }
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
                        Helpers.prototype.RetypeRawServerConfig = function (serverConfig) {
                            serverConfig.urlSegments.urlFilterOperators = this.convertObject2Map(serverConfig.urlSegments.urlFilterOperators);
                            serverConfig.ajaxParamsNames = this.convertObject2Map(serverConfig.ajaxParamsNames);
                            serverConfig.controlsTexts = this.convertObject2Map(serverConfig.controlsTexts);
                            return serverConfig;
                        };
                        Helpers.prototype.RetypeRawServerResponse = function (serverResponse) {
                            serverResponse.filtering = this.convertObject2Map(serverResponse.filtering);
                            return serverResponse;
                        };
                        Helpers.prototype.RetypeRequest2RawRequest = function (serverRequest) {
                            var e_1, _a;
                            var result = serverRequest;
                            var newFiltering = {};
                            try {
                                for (var _b = __values(serverRequest.filtering.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var _d = __read(_c.value, 2), idColumn = _d[0], filterValues = _d[1];
                                    newFiltering[idColumn] = this.convertMap2Object(filterValues);
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                            result.filtering = newFiltering;
                            var serverConfig = this.grid.GetServerConfig();
                            result.id = serverConfig.id;
                            result.mode = serverConfig.clientPageMode;
                            result.path = this.grid.GetGridPath();
                            return result;
                        };
                        Helpers.prototype.IsInstanceOfIServerRequestRaw = function (obj) {
                            return (obj != null &&
                                'id' in obj && 'mode' in obj &&
                                'offset' in obj && 'limit' in obj &&
                                'sorting' in obj && 'filtering' in obj);
                        };
                        Helpers.prototype.convertObject2Map = function (obj) {
                            var data = [];
                            for (var key in obj)
                                data.push([key, obj[key]]);
                            return new Map(data);
                        };
                        Helpers.prototype.convertMap2Object = function (map) {
                            var e_2, _a;
                            var obj = {};
                            try {
                                for (var map_1 = __values(map), map_1_1 = map_1.next(); !map_1_1.done; map_1_1 = map_1.next()) {
                                    var _b = __read(map_1_1.value, 2), key = _b[0], value = _b[1];
                                    obj[key] = value;
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (map_1_1 && !map_1_1.done && (_a = map_1.return)) _a.call(map_1);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                            return obj;
                        };
                        return Helpers;
                    }());
                    AgGrids.Helpers = Helpers;
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Helpers.js.map