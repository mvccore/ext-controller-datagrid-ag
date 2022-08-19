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
                        Helpers.prototype.RetypeServerConfigObjects2Maps = function (serverConfig) {
                            serverConfig.urlSegments.urlFilterOperators = this.convertObject2Map(serverConfig.urlSegments.urlFilterOperators);
                            serverConfig.ajaxParamsNames = this.convertObject2Map(serverConfig.ajaxParamsNames);
                            serverConfig.controlsTexts = this.convertObject2Map(serverConfig.controlsTexts);
                            return serverConfig;
                        };
                        Helpers.prototype.RetypeServerResponseObjects2Maps = function (serverResponse) {
                            serverResponse.filtering = this.convertObject2Map(serverResponse.filtering);
                            return serverResponse;
                        };
                        Helpers.prototype.RetypeServerRequestMaps2Objects = function (serverRequest) {
                            serverRequest.filtering = this.convertMap2Object(serverRequest.filtering);
                            return serverRequest;
                        };
                        Helpers.prototype.convertObject2Map = function (obj) {
                            var data = [];
                            for (var key in obj)
                                data.push([key, obj[key]]);
                            return new Map(data);
                        };
                        Helpers.prototype.convertMap2Object = function (map) {
                            var e_1, _a;
                            var obj = {};
                            try {
                                for (var map_1 = __values(map), map_1_1 = map_1.next(); !map_1_1.done; map_1_1 = map_1.next()) {
                                    var _b = __read(map_1_1.value, 2), key = _b[0], value = _b[1];
                                    obj[key] = value;
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (map_1_1 && !map_1_1.done && (_a = map_1.return)) _a.call(map_1);
                                }
                                finally { if (e_1) throw e_1.error; }
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