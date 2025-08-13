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
                                var serverConfig = grid.GetServerConfig();
                                this.enabled = serverConfig.clientCache;
                                this.maxRows = (_a = serverConfig.clientMaxRowsInCache) !== null && _a !== void 0 ? _a : 0;
                                this.store = new Map();
                                this.agBaseOptions = grid.GetOptionsManager().GetAgBases();
                                this.rowsIniquelyIdentified = this.agBaseOptions.GetRowsIniquelyIdentified();
                                if (this.rowsIniquelyIdentified)
                                    this.rows = new Map();
                                this.keys = [];
                                this.rowsCount = 0;
                            }
                            ;
                            Cache.prototype.GetEnabled = function () {
                                return this.enabled;
                            };
                            Cache.prototype.SetEnabled = function (enabled) {
                                this.enabled = enabled;
                                return this;
                            };
                            Cache.prototype.Key = function (obj) {
                                return MD5(JSON.stringify(obj));
                            };
                            Cache.prototype.Has = function (key) {
                                if (!this.enabled)
                                    return false;
                                return this.store.has(key);
                            };
                            Cache.prototype.Get = function (key) {
                                var response = this.store.get(key);
                                if (this.rowsIniquelyIdentified) {
                                    // replace ids with real records
                                    var rowId, data = [];
                                    for (var i = 0, l = response.data.length; i < l; i++) {
                                        rowId = response.data[i];
                                        data.push(this.rows.get(rowId));
                                    }
                                    response.data = data;
                                }
                                return response;
                            };
                            Cache.prototype.Add = function (key, response) {
                                if (!this.enabled)
                                    return this;
                                if (this.rowsIniquelyIdentified) {
                                    // replace real records with ids
                                    var row, rowId, data = [];
                                    for (var i = 0, l = response.data.length; i < l; i++) {
                                        row = response.data[i];
                                        rowId = this.agBaseOptions.GetRowId(row);
                                        data.push(rowId);
                                        this.rows.set(rowId, row);
                                    }
                                    response.data = data;
                                }
                                this.store.set(key, response);
                                this.keys.push(key);
                                this.rowsCount += response.dataCount;
                                while (this.rowsCount > this.maxRows && this.maxRows > 0)
                                    this.removeOldestRecord();
                                return this;
                            };
                            Cache.prototype.Update = function (rowsData) {
                                if (this.rowsIniquelyIdentified) {
                                    var newRow, oldRow, rowId;
                                    for (var i = 0, l = rowsData.length; i < l; i++) {
                                        newRow = rowsData[i];
                                        rowId = this.agBaseOptions.GetRowId(newRow);
                                        oldRow = this.rows.get(rowId);
                                        if (oldRow != null)
                                            Object.assign(oldRow, newRow);
                                    }
                                }
                                return this;
                            };
                            Cache.prototype.removeOldestRecord = function () {
                                var oldestKey = this.keys.shift();
                                if (this.store.has(oldestKey)) {
                                    if (this.rowsIniquelyIdentified) {
                                        // remove real row records
                                        var storeRecord = this.store.get(oldestKey), rowId;
                                        for (var i = 0, l = storeRecord.data.length; i < l; i++) {
                                            rowId = storeRecord.data[i];
                                            if (this.rows.has(rowId))
                                                this.rows.delete(rowId);
                                        }
                                    }
                                    var dataCount = this.store.get(oldestKey).dataCount;
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