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
                                var serverConfig = grid.GetServerConfig();
                                this.maxRows = serverConfig.clientMaxRowsInCache;
                                this.enabled = serverConfig.clientMaxRowsInCache > 0;
                                this.store = new Map();
                                this.keys = [];
                                this.rowsCount = 0;
                            }
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
                                return this.store.get(key);
                            };
                            Cache.prototype.Add = function (key, response) {
                                this.store.set(key, response);
                                this.keys.push(key);
                                this.rowsCount += response.dataCount;
                                while (this.rowsCount > this.maxRows)
                                    this.removeOldestRecord();
                                return this;
                            };
                            Cache.prototype.removeOldestRecord = function () {
                                var oldestKey = this.keys.shift();
                                if (this.store.has(oldestKey)) {
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