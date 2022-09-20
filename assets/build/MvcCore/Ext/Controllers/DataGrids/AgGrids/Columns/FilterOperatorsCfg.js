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
                            FilterOperatorsCfg.SERVER_TYPES_EXTENDED_FILTER_MENUS = new Map([
                                [AgGrids.Enums.ServerType.STRING, Columns.FilterMenu],
                                [AgGrids.Enums.ServerType.BOOL, Columns.FilterMenu],
                                [AgGrids.Enums.ServerType.INT, Columns.FilterMenus.Int],
                                [AgGrids.Enums.ServerType.FLOAT, Columns.FilterMenus.Float],
                                [AgGrids.Enums.ServerType.MONEY, Columns.FilterMenus.Money],
                                [AgGrids.Enums.ServerType.DATE, Columns.FilterMenus.Date],
                                [AgGrids.Enums.ServerType.DATE_TIME, Columns.FilterMenus.DateTime],
                                [AgGrids.Enums.ServerType.TIME, Columns.FilterMenus.Time],
                            ]);
                            FilterOperatorsCfg.CONTROL_TYPES_OPERATORS = new Map([
                                [AgGrids.Enums.FilterControlType.EQUAL, AgGrids.Enums.Operator.EQUAL],
                                [AgGrids.Enums.FilterControlType.NOT_EQUAL, AgGrids.Enums.Operator.NOT_EQUAL],
                                [AgGrids.Enums.FilterControlType.IS_NULL, AgGrids.Enums.Operator.EQUAL],
                                [AgGrids.Enums.FilterControlType.IS_NOT_NULL, AgGrids.Enums.Operator.NOT_EQUAL],
                                [AgGrids.Enums.FilterControlType.LOWER, AgGrids.Enums.Operator.LOWER],
                                [AgGrids.Enums.FilterControlType.GREATER, AgGrids.Enums.Operator.GREATER],
                                [AgGrids.Enums.FilterControlType.LOWER_EQUAL, AgGrids.Enums.Operator.LOWER_EQUAL],
                                [AgGrids.Enums.FilterControlType.GREATER_EQUAL, AgGrids.Enums.Operator.GREATER_EQUAL],
                                [AgGrids.Enums.FilterControlType.CONTAINS, AgGrids.Enums.Operator.LIKE],
                                [AgGrids.Enums.FilterControlType.NOT_CONTAINS, AgGrids.Enums.Operator.NOT_LIKE],
                                [AgGrids.Enums.FilterControlType.STARTS_WITH, AgGrids.Enums.Operator.LIKE],
                                [AgGrids.Enums.FilterControlType.ENDS_WITH, AgGrids.Enums.Operator.LIKE],
                                [AgGrids.Enums.FilterControlType.NOT_STARTS_WITH, AgGrids.Enums.Operator.NOT_LIKE],
                                [AgGrids.Enums.FilterControlType.NOT_ENDS_WITH, AgGrids.Enums.Operator.NOT_LIKE],
                                [AgGrids.Enums.FilterControlType.IS_TRUE, AgGrids.Enums.Operator.EQUAL],
                                [AgGrids.Enums.FilterControlType.IS_FALSE, AgGrids.Enums.Operator.EQUAL],
                            ]);
                            FilterOperatorsCfg.CONTROL_TYPES_TEXTS = new Map([
                                [AgGrids.Enums.FilterControlType.EQUAL, 'equals'],
                                [AgGrids.Enums.FilterControlType.NOT_EQUAL, 'notEqual'],
                                [AgGrids.Enums.FilterControlType.IS_NULL, 'blank'],
                                [AgGrids.Enums.FilterControlType.IS_NOT_NULL, 'notBlank'],
                                [AgGrids.Enums.FilterControlType.LOWER, 'lessThan'],
                                [AgGrids.Enums.FilterControlType.GREATER, 'greaterThan'],
                                [AgGrids.Enums.FilterControlType.LOWER_EQUAL, 'lessThanOrEqual'],
                                [AgGrids.Enums.FilterControlType.GREATER_EQUAL, 'greaterThanOrEqual'],
                                [AgGrids.Enums.FilterControlType.CONTAINS, 'contains'],
                                [AgGrids.Enums.FilterControlType.NOT_CONTAINS, 'notContains'],
                                [AgGrids.Enums.FilterControlType.STARTS_WITH, 'startsWith'],
                                [AgGrids.Enums.FilterControlType.ENDS_WITH, 'endsWith'],
                                [AgGrids.Enums.FilterControlType.NOT_STARTS_WITH, 'notStartsWith'],
                                [AgGrids.Enums.FilterControlType.NOT_ENDS_WITH, 'notEndsWith'],
                                [AgGrids.Enums.FilterControlType.IS_TRUE, 'yes'],
                                [AgGrids.Enums.FilterControlType.IS_FALSE, 'no'],
                            ]);
                            FilterOperatorsCfg.CONTROL_TYPES_VALUE_PATTERNS = new Map([
                                [AgGrids.Enums.FilterControlType.EQUAL, '<value>'],
                                [AgGrids.Enums.FilterControlType.NOT_EQUAL, '<value>'],
                                [AgGrids.Enums.FilterControlType.IS_NULL, 'null'],
                                [AgGrids.Enums.FilterControlType.IS_NOT_NULL, 'null'],
                                [AgGrids.Enums.FilterControlType.LOWER, '<value>'],
                                [AgGrids.Enums.FilterControlType.GREATER, '<value>'],
                                [AgGrids.Enums.FilterControlType.LOWER_EQUAL, '<value>'],
                                [AgGrids.Enums.FilterControlType.GREATER_EQUAL, '<value>'],
                                [AgGrids.Enums.FilterControlType.CONTAINS, '%<value>%'],
                                [AgGrids.Enums.FilterControlType.NOT_CONTAINS, '%<value>%'],
                                [AgGrids.Enums.FilterControlType.STARTS_WITH, '<value>%'],
                                [AgGrids.Enums.FilterControlType.ENDS_WITH, '%<value>'],
                                [AgGrids.Enums.FilterControlType.NOT_STARTS_WITH, '<value>%'],
                                [AgGrids.Enums.FilterControlType.NOT_ENDS_WITH, '%<value>'],
                                [AgGrids.Enums.FilterControlType.IS_TRUE, '1'],
                                [AgGrids.Enums.FilterControlType.IS_FALSE, '0'],
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