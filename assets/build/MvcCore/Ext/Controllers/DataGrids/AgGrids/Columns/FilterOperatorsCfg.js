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
                        var stringAndDateFilteringModeOrder = [
                            AgGrids.Enums.FilterControlType.STARTS_WITH,
                            AgGrids.Enums.FilterControlType.CONTAINS,
                            AgGrids.Enums.FilterControlType.EQUAL,
                            AgGrids.Enums.FilterControlType.ENDS_WITH,
                            AgGrids.Enums.FilterControlType.GREATER,
                            AgGrids.Enums.FilterControlType.LOWER,
                            AgGrids.Enums.FilterControlType.GREATER_EQUAL,
                            AgGrids.Enums.FilterControlType.LOWER_EQUAL,
                            AgGrids.Enums.FilterControlType.IS_NULL,
                            AgGrids.Enums.FilterControlType.IS_NOT_NULL,
                            AgGrids.Enums.FilterControlType.NOT_STARTS_WITH,
                            AgGrids.Enums.FilterControlType.NOT_CONTAINS,
                            AgGrids.Enums.FilterControlType.NOT_EQUAL,
                            AgGrids.Enums.FilterControlType.NOT_ENDS_WITH,
                        ];
                        var intAndFloatFilteringModeOrder = [
                            AgGrids.Enums.FilterControlType.EQUAL,
                            AgGrids.Enums.FilterControlType.NOT_EQUAL,
                            AgGrids.Enums.FilterControlType.GREATER,
                            AgGrids.Enums.FilterControlType.LOWER,
                            AgGrids.Enums.FilterControlType.GREATER_EQUAL,
                            AgGrids.Enums.FilterControlType.LOWER_EQUAL,
                            AgGrids.Enums.FilterControlType.STARTS_WITH,
                            AgGrids.Enums.FilterControlType.CONTAINS,
                            AgGrids.Enums.FilterControlType.ENDS_WITH,
                            AgGrids.Enums.FilterControlType.IS_NULL,
                            AgGrids.Enums.FilterControlType.IS_NOT_NULL,
                            AgGrids.Enums.FilterControlType.NOT_STARTS_WITH,
                            AgGrids.Enums.FilterControlType.NOT_CONTAINS,
                            AgGrids.Enums.FilterControlType.NOT_ENDS_WITH,
                        ];
                        var FilterOperatorsCfg = /** @class */ (function () {
                            function FilterOperatorsCfg() {
                            }
                            FilterOperatorsCfg.GetServerTypesExtendedFilterMenu = function (grid, serverType) {
                                var filterMenuClass = grid.Static.Classes.Columns.FilterMenu, filterMenusClasses = grid.Static.Classes.Columns.FilterMenus;
                                if (this.serverTypesExtendedFilterMenus == null) {
                                    this.serverTypesExtendedFilterMenus = new Map([
                                        [AgGrids.Enums.ServerType.STRING, filterMenuClass],
                                        [AgGrids.Enums.ServerType.BOOL, filterMenuClass],
                                        [AgGrids.Enums.ServerType.INT, filterMenusClasses.Int],
                                        [AgGrids.Enums.ServerType.FLOAT, filterMenusClasses.Float],
                                        [AgGrids.Enums.ServerType.MONEY, filterMenusClasses.Money],
                                        [AgGrids.Enums.ServerType.DATE, filterMenusClasses.Date],
                                        [AgGrids.Enums.ServerType.DATE_TIME, filterMenusClasses.DateTime],
                                        [AgGrids.Enums.ServerType.TIME, filterMenusClasses.Time],
                                    ]);
                                }
                                if (this.serverTypesExtendedFilterMenus.has(serverType))
                                    return this.serverTypesExtendedFilterMenus.get(serverType);
                                return filterMenuClass;
                            };
                            FilterOperatorsCfg.FILTERING_CONTROL_TYPES = new Map([
                                [AgGrids.Enums.FilteringMode.ALLOW_EQUALS, [
                                        AgGrids.Enums.FilterControlType.EQUAL,
                                        AgGrids.Enums.FilterControlType.NOT_EQUAL,
                                        AgGrids.Enums.FilterControlType.IS_TRUE,
                                        AgGrids.Enums.FilterControlType.IS_FALSE,
                                    ]],
                                [AgGrids.Enums.FilteringMode.ALLOW_NULL, [
                                        AgGrids.Enums.FilterControlType.IS_NULL,
                                        AgGrids.Enums.FilterControlType.IS_NOT_NULL
                                    ]],
                                [AgGrids.Enums.FilteringMode.ALLOW_RANGES, [
                                        AgGrids.Enums.FilterControlType.LOWER,
                                        AgGrids.Enums.FilterControlType.GREATER,
                                        AgGrids.Enums.FilterControlType.LOWER_EQUAL,
                                        AgGrids.Enums.FilterControlType.GREATER_EQUAL
                                    ]],
                                [AgGrids.Enums.FilteringMode.ALLOW_LIKE_RIGHT_SIDE, [
                                        AgGrids.Enums.FilterControlType.STARTS_WITH,
                                        AgGrids.Enums.FilterControlType.NOT_STARTS_WITH
                                    ]],
                                [AgGrids.Enums.FilteringMode.ALLOW_LIKE_LEFT_SIDE, [
                                        AgGrids.Enums.FilterControlType.ENDS_WITH,
                                        AgGrids.Enums.FilterControlType.NOT_ENDS_WITH
                                    ]],
                                [AgGrids.Enums.FilteringMode.ALLOW_LIKE_ANYWHERE, [
                                        AgGrids.Enums.FilterControlType.CONTAINS,
                                        AgGrids.Enums.FilterControlType.NOT_CONTAINS,
                                        AgGrids.Enums.FilterControlType.STARTS_WITH,
                                        AgGrids.Enums.FilterControlType.ENDS_WITH,
                                        AgGrids.Enums.FilterControlType.NOT_STARTS_WITH,
                                        AgGrids.Enums.FilterControlType.NOT_ENDS_WITH,
                                    ]],
                            ]);
                            FilterOperatorsCfg.SERVER_TYPES_CONTROL_TYPES_ORDERS = new Map([
                                [AgGrids.Enums.ServerType.STRING, stringAndDateFilteringModeOrder],
                                [AgGrids.Enums.ServerType.BOOL, [
                                        AgGrids.Enums.FilterControlType.IS_TRUE,
                                        AgGrids.Enums.FilterControlType.IS_FALSE,
                                        AgGrids.Enums.FilterControlType.IS_NULL,
                                        AgGrids.Enums.FilterControlType.IS_NOT_NULL,
                                    ]],
                                [AgGrids.Enums.ServerType.INT, intAndFloatFilteringModeOrder],
                                [AgGrids.Enums.ServerType.FLOAT, intAndFloatFilteringModeOrder],
                                [AgGrids.Enums.ServerType.MONEY, intAndFloatFilteringModeOrder],
                                [AgGrids.Enums.ServerType.DATE, stringAndDateFilteringModeOrder],
                                [AgGrids.Enums.ServerType.DATE_TIME, stringAndDateFilteringModeOrder],
                                [AgGrids.Enums.ServerType.TIME, stringAndDateFilteringModeOrder]
                            ]);
                            FilterOperatorsCfg.CONTROL_TYPES_OPERATORS = new Map([
                                [AgGrids.Enums.FilterControlType.EQUAL, AgGrids.Enums.Operator.EQUAL], // column = value
                                [AgGrids.Enums.FilterControlType.NOT_EQUAL, AgGrids.Enums.Operator.NOT_EQUAL], // column != value
                                [AgGrids.Enums.FilterControlType.IS_NULL, AgGrids.Enums.Operator.EQUAL], // column IS NULL
                                [AgGrids.Enums.FilterControlType.IS_NOT_NULL, AgGrids.Enums.Operator.NOT_EQUAL], // column IS NOT NULL
                                [AgGrids.Enums.FilterControlType.LOWER, AgGrids.Enums.Operator.LOWER], // column < value
                                [AgGrids.Enums.FilterControlType.GREATER, AgGrids.Enums.Operator.GREATER], // column > value
                                [AgGrids.Enums.FilterControlType.LOWER_EQUAL, AgGrids.Enums.Operator.LOWER_EQUAL], // column <= value
                                [AgGrids.Enums.FilterControlType.GREATER_EQUAL, AgGrids.Enums.Operator.GREATER_EQUAL], // column >= value
                                [AgGrids.Enums.FilterControlType.CONTAINS, AgGrids.Enums.Operator.LIKE], // column LIKE %value%
                                [AgGrids.Enums.FilterControlType.NOT_CONTAINS, AgGrids.Enums.Operator.NOT_LIKE], // column NOT LIKE %value%
                                [AgGrids.Enums.FilterControlType.STARTS_WITH, AgGrids.Enums.Operator.LIKE], // column LIKE value%
                                [AgGrids.Enums.FilterControlType.ENDS_WITH, AgGrids.Enums.Operator.LIKE], // column LIKE %value
                                [AgGrids.Enums.FilterControlType.NOT_STARTS_WITH, AgGrids.Enums.Operator.NOT_LIKE], // column NOT LIKE value%
                                [AgGrids.Enums.FilterControlType.NOT_ENDS_WITH, AgGrids.Enums.Operator.NOT_LIKE], // column NOT LIKE %value
                                [AgGrids.Enums.FilterControlType.IS_TRUE, AgGrids.Enums.Operator.EQUAL], // column = 1
                                [AgGrids.Enums.FilterControlType.IS_FALSE, AgGrids.Enums.Operator.EQUAL], // column = 0
                            ]);
                            FilterOperatorsCfg.CONTROL_TYPES_TEXTS = new Map([
                                [AgGrids.Enums.FilterControlType.EQUAL, 'equals'], // column = value
                                [AgGrids.Enums.FilterControlType.NOT_EQUAL, 'notEqual'], // column != value
                                [AgGrids.Enums.FilterControlType.IS_NULL, 'blank'], // column IS NULL
                                [AgGrids.Enums.FilterControlType.IS_NOT_NULL, 'notBlank'], // column IS NOT NULL
                                [AgGrids.Enums.FilterControlType.LOWER, 'lessThan'], // column < value
                                [AgGrids.Enums.FilterControlType.GREATER, 'greaterThan'], // column > value
                                [AgGrids.Enums.FilterControlType.LOWER_EQUAL, 'lessThanOrEqual'], // column <= value
                                [AgGrids.Enums.FilterControlType.GREATER_EQUAL, 'greaterThanOrEqual'], // column >= value
                                [AgGrids.Enums.FilterControlType.CONTAINS, 'contains'], // column LIKE %value%
                                [AgGrids.Enums.FilterControlType.NOT_CONTAINS, 'notContains'], // column NOT LIKE %value%
                                [AgGrids.Enums.FilterControlType.STARTS_WITH, 'startsWith'], // column LIKE value%
                                [AgGrids.Enums.FilterControlType.ENDS_WITH, 'endsWith'], // column LIKE %value
                                [AgGrids.Enums.FilterControlType.NOT_STARTS_WITH, 'notStartsWith'], // column NOT LIKE value%
                                [AgGrids.Enums.FilterControlType.NOT_ENDS_WITH, 'notEndsWith'], // column NOT LIKE %value
                                [AgGrids.Enums.FilterControlType.IS_TRUE, 'yes'], // column = 1
                                [AgGrids.Enums.FilterControlType.IS_FALSE, 'no'], // column = 0
                            ]);
                            FilterOperatorsCfg.CONTROL_TYPES_VALUE_PATTERNS = new Map([
                                [AgGrids.Enums.FilterControlType.EQUAL, '<value>'], // column = value
                                [AgGrids.Enums.FilterControlType.NOT_EQUAL, '<value>'], // column != value
                                [AgGrids.Enums.FilterControlType.IS_NULL, 'null'], // column IS NULL
                                [AgGrids.Enums.FilterControlType.IS_NOT_NULL, 'null'], // column IS NOT NULL
                                [AgGrids.Enums.FilterControlType.LOWER, '<value>'], // column < value
                                [AgGrids.Enums.FilterControlType.GREATER, '<value>'], // column > value
                                [AgGrids.Enums.FilterControlType.LOWER_EQUAL, '<value>'], // column <= value
                                [AgGrids.Enums.FilterControlType.GREATER_EQUAL, '<value>'], // column >= value
                                [AgGrids.Enums.FilterControlType.CONTAINS, '%<value>%'], // column LIKE %value%
                                [AgGrids.Enums.FilterControlType.NOT_CONTAINS, '%<value>%'], // column NOT LIKE %value%
                                [AgGrids.Enums.FilterControlType.STARTS_WITH, '<value>%'], // column LIKE value%
                                [AgGrids.Enums.FilterControlType.ENDS_WITH, '%<value>'], // column LIKE %value
                                [AgGrids.Enums.FilterControlType.NOT_STARTS_WITH, '<value>%'], // column NOT LIKE value%
                                [AgGrids.Enums.FilterControlType.NOT_ENDS_WITH, '%<value>'], // column NOT LIKE %value
                                [AgGrids.Enums.FilterControlType.IS_TRUE, '1'], // column = 1
                                [AgGrids.Enums.FilterControlType.IS_FALSE, '0'], // column = 0
                            ]);
                            return FilterOperatorsCfg;
                        }());
                        Columns.FilterOperatorsCfg = FilterOperatorsCfg;
                    })(Columns = AgGrids.Columns || (AgGrids.Columns = {}));
                })(AgGrids = DataGrids.AgGrids || (DataGrids.AgGrids = {}));
            })(DataGrids = Controllers.DataGrids || (Controllers.DataGrids = {}));
        })(Controllers = Ext.Controllers || (Ext.Controllers = {}));
    })(Ext = MvcCore.Ext || (MvcCore.Ext = {}));
})(MvcCore || (MvcCore = {}));
//# sourceMappingURL=FilterOperatorsCfg.js.map