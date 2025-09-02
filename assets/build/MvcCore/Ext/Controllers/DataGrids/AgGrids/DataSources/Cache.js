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
                    var DataSources;
                    (function (DataSources) {
                        var Cache = /** @class */ (function () {
                            function Cache(grid) {
                                var _a;
                                this.helpers = grid.GetHelpers();
                                var serverConfig = grid.GetServerConfig();
                                this.enabled = serverConfig.clientCache;
                                this.maxRows = (_a = serverConfig.clientMaxRowsInCache) !== null && _a !== void 0 ? _a : 0;
                                this.store = new Map();
                                this.agBaseOptions = grid.GetOptionsManager().GetAgBases();
                                this.cacheBlockSize = this.agBaseOptions.GetAgOptions().cacheBlockSize;
                                this.rowsIniquelyIdentified = this.agBaseOptions.GetRowsIniquelyIdentified();
                                if (this.rowsIniquelyIdentified) {
                                    this.rowIds2StoreIds = new Map();
                                    this.storeIds2Keys = new Map();
                                }
                                this.storeIdsCounter = 0;
                                this.reqDataKeys = [];
                                this.rowsCount = 0;
                            }
                            ;
                            Cache.prototype.Purge = function () {
                                this.store = new Map();
                                if (this.rowsIniquelyIdentified) {
                                    this.rowIds2StoreIds = new Map();
                                    this.storeIds2Keys = new Map();
                                    this.storeIdsCounter = 0;
                                }
                                this.reqDataKeys = [];
                                this.rowsCount = 0;
                                return this;
                            };
                            Cache.prototype.GetEnabled = function () {
                                return this.enabled;
                            };
                            Cache.prototype.SetEnabled = function (enabled) {
                                this.enabled = enabled;
                                return this;
                            };
                            Cache.prototype.Key = function (reqData) {
                                return MD5(JSON.stringify(reqData));
                            };
                            Cache.prototype.Has = function (reqDataKey) {
                                if (!this.enabled)
                                    return false;
                                return this.store.has(reqDataKey);
                            };
                            Cache.prototype.Get = function (reqDataKey) {
                                var _a = __read(this.store.get(reqDataKey), 2), response = _a[1];
                                return response;
                            };
                            Cache.prototype.Add = function (reqDataKey, response) {
                                if (!this.enabled)
                                    return this;
                                var storeId = this.storeIdsCounter++;
                                if (this.rowsIniquelyIdentified) {
                                    this.storeIds2Keys.set(storeId, reqDataKey);
                                    var row, rowId;
                                    for (var i = 0, l = response.data.length; i < l; i++) {
                                        row = response.data[i];
                                        rowId = this.agBaseOptions.GetRowId(row);
                                        this.rowIds2StoreIds.set(rowId, [storeId, i]);
                                    }
                                }
                                this.store.set(reqDataKey, [storeId, response]);
                                this.reqDataKeys.push(reqDataKey);
                                this.rowsCount += response.dataCount;
                                while (this.rowsCount + this.cacheBlockSize >= this.maxRows && this.maxRows > 0)
                                    this.removeOldestRecord();
                                return this;
                            };
                            Cache.prototype.Update = function (rowsData) {
                                var _a, _b;
                                if (this.rowsIniquelyIdentified) {
                                    var newRow, oldRow, rowId, storeId, index, storeKey, response;
                                    for (var i = 0, l = rowsData.length; i < l; i++) {
                                        newRow = rowsData[i];
                                        rowId = this.agBaseOptions.GetRowId(newRow);
                                        if (!this.rowIds2StoreIds.has(rowId))
                                            continue;
                                        _a = __read(this.rowIds2StoreIds.get(rowId), 2), storeId = _a[0], index = _a[1];
                                        if (!this.storeIds2Keys.has(storeId))
                                            continue;
                                        storeKey = this.storeIds2Keys.get(storeId);
                                        if (!this.store.has(storeKey))
                                            continue;
                                        _b = __read(this.store.get(storeKey), 2), response = _b[1];
                                        if (index >= response.data.length)
                                            continue;
                                        oldRow = response.data[index];
                                        if (oldRow != null)
                                            Object.assign(oldRow, newRow);
                                    }
                                }
                                return this;
                            };
                            Cache.prototype.removeOldestRecord = function () {
                                var oldestKey = this.reqDataKeys.shift();
                                if (this.store.has(oldestKey)) {
                                    var _a = __read(this.store.get(oldestKey), 2), storeId = _a[0], response = _a[1];
                                    if (this.rowsIniquelyIdentified) {
                                        if (this.storeIds2Keys.has(storeId))
                                            this.storeIds2Keys.delete(storeId);
                                        var rowId, row;
                                        for (var i = 0, l = response.data.length; i < l; i++) {
                                            row = response.data[i];
                                            rowId = this.agBaseOptions.GetRowId(row);
                                            if (this.rowIds2StoreIds.has(rowId))
                                                this.rowIds2StoreIds.delete(rowId);
                                        }
                                    }
                                    var dataCount = response.dataCount;
                                    this.store.delete(oldestKey);
                                    this.rowsCount -= dataCount;
                                }
                                return this;
                            };
                            return Cache;
                        }());
                        DataSources.Cache = Cache;
                    })(DataSources = AgGrids.DataSources || (AgGrids.DataSources = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Cache.js.map