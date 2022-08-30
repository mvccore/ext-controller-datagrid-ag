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
                    var Translator = /** @class */ (function () {
                        function Translator(grid) {
                            var _newTarget = this.constructor;
                            this.Static = _newTarget;
                            this.grid = grid;
                            var globalLocale = this.grid.GetServerConfig().locales.locale.join(AgGrids.Options.SYSTEM_LOCALE_SEPARATOR);
                            if (window.agGridLocales != null) {
                                if (window.agGridLocales[globalLocale] != null) {
                                    this.store = window.agGridLocales[globalLocale];
                                }
                                else {
                                    this.store = window.agGridLocales[this.Static.LOCALE_DEFAULT];
                                }
                            }
                        }
                        Translator.prototype.GetStore = function () {
                            return this.store;
                        };
                        Translator.prototype.Translate = function (translationKey) {
                            if (!this.store)
                                return translationKey;
                            return this.store[translationKey];
                        };
                        Translator.LOCALE_DEFAULT = 'en-US';
                        return Translator;
                    }());
                    AgGrids.Translator = Translator;
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=Translations.js.map