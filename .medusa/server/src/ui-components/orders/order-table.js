"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_table_1 = require("react-table");
const use_columns_1 = __importDefault(require("./order-table/use-columns"));
const use_orders_1 = require("./order-table/use-orders");
const ui_1 = require("@medusajs/ui");
const defaultQueryProps = {
    expand: "customer,shipping_address,billing_address,items",
    fields: "id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code,metadata",
};
const OrderTable = ({ setContextFilters }) => {
    const location = (0, react_router_dom_1.useLocation)();
    const [ordersResult, setOrdersResult] = (0, react_1.useState)(undefined);
    const [isLoading, setLoading] = (0, react_1.useState)(true);
    let hiddenColumns = ["sales_channel"];
    const { paginate, queryObject } = (0, use_orders_1.useOrderFilters)(defaultQueryProps);
    const offs = 0;
    const lim = queryObject.limit;
    const [numPages, setNumPages] = (0, react_1.useState)(0);
    // const defaultQueryProps = {
    //   expand: "customer,shipping_address,billing_address,items",
    //   fields:
    //     "id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code,metadata",
    // }
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            return;
        }
        fetch(`/admin/orders?order=-created_at&fields=id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code,metadata,items,*customer&limit=${ordersResult?.limit ?? queryObject.limit}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((result) => {
            setOrdersResult(result);
            setLoading(false);
        })
            .catch((error) => {
            console.error(error);
        });
    }, []);
    (0, react_1.useEffect)(() => {
        const controlledPageCount = Math.ceil(ordersResult ? ordersResult.count / queryObject.limit : 0);
        setNumPages(controlledPageCount);
    }, [ordersResult]);
    const [columns] = (0, use_columns_1.default)();
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, canPreviousPage, canNextPage, pageCount, gotoPage, nextPage, previousPage, 
    // Get the state from the instance
    state: { pageIndex }, } = (0, react_table_1.useTable)({
        columns,
        data: ordersResult ? ordersResult.orders : [],
        manualPagination: true,
        initialState: {
            pageSize: lim,
            pageIndex: offs / lim,
            hiddenColumns,
        },
        pageCount: numPages,
        autoResetPage: false,
    }, react_table_1.usePagination);
    const handleNext = () => {
        if (canNextPage) {
            paginate(1);
            nextPage();
        }
    };
    const handlePrev = () => {
        if (canPreviousPage) {
            paginate(-1);
            previousPage();
        }
    };
    (0, react_1.useEffect)(() => {
        setLoading(true);
        fetch(`/admin/orders?order=-created_at&fields=id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code,metadata,items,*customer&offset=${pageIndex * queryObject.limit}&limit=${queryObject.limit}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((result) => {
            setOrdersResult(result);
            setLoading(false);
        })
            .catch((error) => {
            console.error(error);
        });
    }, [pageIndex]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(ui_1.Table, { ...getTableProps(), className: (0, clsx_1.default)({ ["relative"]: isLoading }), children: [(0, jsx_runtime_1.jsx)(ui_1.Table.Header, { children: headerGroups?.map((headerGroup, i) => ((0, jsx_runtime_1.jsx)(ui_1.Table.Row, { ...headerGroup.getHeaderGroupProps(), children: headerGroup.headers.map((col, j) => ((0, jsx_runtime_1.jsx)(ui_1.Table.HeaderCell, { ...col.getHeaderProps(), children: col.render("Header") }, "header_" + j))) }, "headerGroup_" + i))) }), (0, jsx_runtime_1.jsx)(ui_1.Table.Body, { ...getTableBodyProps(), children: rows.map((row, i) => {
                            prepareRow(row);
                            return ((0, jsx_runtime_1.jsx)(ui_1.Table.Row, { color: "inherit", linkTo: row.original.id, ...row.getRowProps(), className: "group", children: row.cells.map((cell, j) => {
                                    return ((0, jsx_runtime_1.jsx)(ui_1.Table.Cell, { ...cell.getCellProps(), className: "inter-small-regular h-[40px]", children: cell.render("Cell") }, "body_cell_" + j));
                                }) }, "body_row_" + i));
                        }) })] }), (0, jsx_runtime_1.jsx)(ui_1.Table.Pagination, { count: ordersResult ? ordersResult.count : 0, pageSize: queryObject.limit, pageIndex: pageIndex, pageCount: pageCount, canPreviousPage: canPreviousPage, canNextPage: canNextPage, previousPage: handlePrev, nextPage: handleNext })] }));
};
exports.default = react_1.default.memo(OrderTable);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItdGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWktY29tcG9uZW50cy9vcmRlcnMvb3JkZXItdGFibGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF3QjtBQUN4QiwrQ0FBbUQ7QUFDbkQsdURBQStDO0FBQy9DLDZDQUFzRDtBQUN0RCw0RUFBNEQ7QUFDNUQseURBQTJEO0FBQzNELHFDQUFxQztBQUVyQyxNQUFNLGlCQUFpQixHQUFHO0lBQ3hCLE1BQU0sRUFBRSxpREFBaUQ7SUFDekQsTUFBTSxFQUNKLHNHQUFzRztDQUN6RyxDQUFDO0FBYUYsTUFBTSxVQUFVLEdBQUcsQ0FBQyxFQUFFLGlCQUFpQixFQUFtQixFQUFFLEVBQUU7SUFDNUQsTUFBTSxRQUFRLEdBQUcsSUFBQSw4QkFBVyxHQUFFLENBQUM7SUFFL0IsTUFBTSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQzlDLFNBQVMsQ0FDVixDQUFDO0lBQ0YsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFFL0MsSUFBSSxhQUFhLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUV0QyxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUEsNEJBQWUsRUFBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRXJFLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNmLE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFFOUIsTUFBTSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUMsOEJBQThCO0lBQzlCLCtEQUErRDtJQUMvRCxZQUFZO0lBQ1osOEdBQThH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