declare namespace MvcCore.Ext.Controllers.DataGrids.AgGrids.Enums {
    enum FilteringMode {
        FILTER_DISABLED = 0,
        FILTER_SINGLE_COLUMN = 1,
        FILTER_MULTIPLE_COLUMNS = 2,
        FILTER_ALLOW_EQUALS = 4,
        FILTER_ALLOW_RANGES = 8,
        FILTER_ALLOW_LIKE_RIGHT_SIDE = 16,
        FILTER_ALLOW_LIKE_LEFT_SIDE = 32,
        FILTER_ALLOW_LIKE_ANYWHERE = 64,
        FILTER_ALLOW_NULL = 128,
        FILTER_ALLOW_ALL = 252
    }
}
