"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecimalDigits = getDecimalDigits;
exports.normalizeAmount = normalizeAmount;
const jsx_runtime_1 = require("react/jsx-runtime");
const moment_1 = __importDefault(require("moment"));
const react_1 = require("react");
const ui_1 = require("@medusajs/ui");
const currencies_1 = require("./utils/currencies");
const material_1 = require("@mui/material");
const actions_dropdown_1 = require("../../actions-dropdown/actions-dropdown");
const invoice_number_from_order_1 = __importDefault(require("./invoice-number-from-order"));
const packing_slip_number_1 = __importDefault(require("./packing-slip-number"));
const icons_1 = require("@medusajs/icons");
const react_2 = __importDefault(require("react"));
/**
 * Checks the list of currencies and returns the divider/multiplier
 * that should be used to calculate the persited and display amount.
 * @param currency
 * @return {number}
 */
function getDecimalDigits(currency) {
    const divisionDigits = currencies_1.currencies[currency.toUpperCase()].decimal_digits;
    return Math.pow(10, divisionDigits);
}
function normalizeAmount(currency, amount) {
    const divisor = getDecimalDigits(currency);
    return Math.floor(amount) / divisor;
}
function formatAmountWithSymbol({ amount, currency, digits, }) {
    let locale = "en-US";
    // We need this to display 'Kr' instead of 'DKK'
    if (currency.toLowerCase() === "dkk") {
        locale = "da-DK";
    }
    const taxRate = 0;
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: digits,
    }).format(amount * (1 + taxRate / 100));
}
const useOrderTableColumns = () => {
    const [documentNumbers, setDocumentNumbers] = (0, react_1.useState)({});
    const decideStatus = (status) => {
        switch (status) {
            case "captured":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "green", children: "Paid" }));
            case "awaiting":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "grey", children: "Awaiting" }));
            case "requires_action":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "red", children: "Requires action" }));
            case "canceled":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "orange", children: "Canceled" }));
            default:
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "purple", children: "N/A" }));
        }
    };
    const decideFullfillmentStatus = (status) => {
        switch (status) {
            case "not_fulfilled":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "grey", children: "Not fulfilled" }));
            case "partially_fulfilled":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "blue", children: "Partially fulfilled" }));
            case "fulfilled":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "green", children: "Fulfilled" }));
            case "partially_shipped":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "blue", children: "Partially shipped" }));
            case "shipped":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "green", children: "Shipped" }));
            case "partially_returned":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "blue", children: "Partially returned" }));
            case "returned":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "green", children: "Returned" }));
            case "canceled":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "red", children: "Canceled" }));
            case "requires_action":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "purple", children: "Requires action" }));
            default:
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "grey", children: "N/A" }));
        }
    };
    const updateInvoiceNumber = (orderId, invoiceNumber) => {
        setDocumentNumbers((prev) => ({
            ...prev,
            [orderId]: {
                ...prev[orderId],
                invoiceNumber,
            },
        }));
    };
    const updatePackingSlipNumber = (orderId, packingSlipNumber) => {
        setDocumentNumbers((prev) => ({
            ...prev,
            [orderId]: {
                ...prev[orderId],
                packingSlipNumber,
            },
        }));
    };
    const columns = (0, react_1.useMemo)(() => [
        {
            Header: (0, jsx_runtime_1.jsx)("div", { className: "pl-2", children: "Order" }),
            accessor: "display_id",
            Cell: ({ cell: { value } }) => ((0, jsx_runtime_1.jsx)("p", { className: "text-grey-90 group-hover:text-violet-60 pl-2", children: `#${value}` })),
        },
        {
            Header: ("Date added"),
            accessor: "created_at",
            Cell: ({ cell: { value } }) => {
                return ((0, jsx_runtime_1.jsx)(ui_1.TooltipProvider, { children: (0, jsx_runtime_1.jsx)(ui_1.Tooltip, { content: (0, jsx_runtime_1.jsx)(ui_1.Text, { children: (0, moment_1.default)(value).format("DD MMM YYYY hh:mm a") }), children: (0, jsx_runtime_1.jsx)("p", { className: "text-grey-90 group-hover:text-violet-60 min-w-[40px]", children: (0, moment_1.default)(value).format("DD MMM YYYY") }) }) }));
            }
        },
        {
            Header: ("Customer"),
            accessor: "customer",
            Cell: ({ row, cell: { value } }) => {
                const customer = {
                    first_name: value?.first_name ||
                        row.original.shipping_address?.first_name,
                    last_name: value?.last_name || row.original.shipping_address?.last_name,
                    email: row.original.email,
                };
                return ((0, jsx_runtime_1.jsx)("p", { className: "text-grey-90 group-hover:text-violet-60 min-w-[100px]", children: `${(customer.first_name || customer.last_name)
                        ? `${customer.first_name} ${customer.last_name}`
                        : (customer.email
                            ? customer.email
                            : "-")}` }));
            },
        },
        {
            Header: ("Fulfillment"),
            accessor: "fulfillment_status",
            Cell: ({ cell: { value } }) => decideFullfillmentStatus(value),
        },
        {
            Header: ("Payment status"),
            accessor: "payment_status",
            Cell: ({ cell: { value } }) => decideStatus(value),
        },
        {
            Header: () => ((0, jsx_runtime_1.jsx)("div", { className: "text-right", children: ("Total") })),
            accessor: "total",
            Cell: ({ row, cell: { value } }) => ((0, jsx_runtime_1.jsx)("div", { className: "text-grey-90 group-hover:text-violet-60 text-right", children: formatAmountWithSymbol({
                    amount: value,
                    currency: row.original.currency_code,
                }) })),
        },
        {
            Header: ("Invoice"),
            id: "invoice",
            Cell: ({ row }) => {
                const orderId = row.original.id;
                const currentDocumentNumbers = documentNumbers[orderId] || undefined;
                return ((0, jsx_runtime_1.jsx)("div", { className: "text-grey-90 group-hover:text-violet-60 pl-2", children: (0, jsx_runtime_1.jsx)(invoice_number_from_order_1.default, { orderId: orderId, invoiceNumber: currentDocumentNumbers ? currentDocumentNumbers.invoiceNumber : undefined, showKidNumber: false }) }));
            },
        },
        {
            Header: ("KID"),
            id: "kid",
            Cell: ({ row }) => {
                const orderId = row.original.id;
                const [data, setData] = (0, react_1.useState)(undefined);
                const [isLoading, setLoading] = (0, react_1.useState)(true);
                const resultParams = new URLSearchParams({
                    orderId: orderId,
                });
                react_2.default.useEffect(() => {
                    setLoading(true);
                }, [orderId]);
                react_2.default.useEffect(() => {
                    if (!isLoading) {
                        return;
                    }
                    fetch(`/admin/documents/invoice?${resultParams.toString()}`, {
                        credentials: "include",
                    })
                        .then((res) => res.json())
                        .then((result) => {
                        setData(result);
                        setLoading(false);
                    })
                        .catch((error) => {
                        console.error(error);
                        setLoading(false);
                    });
                }, [isLoading, orderId, resultParams]);
                if (isLoading) {
                    return (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { size: 16 });
                }
                if (data && data.invoice && data.invoice.kidNumber) {
                    return ((0, jsx_runtime_1.jsx)("span", { className: "text-grey-90 group-hover:text-violet-60", children: data.invoice.kidNumber }));
                }
                else {
                    return (0, jsx_runtime_1.jsx)("span", { children: "-" });
                }
            },
        },
        {
            Header: ("Packing Slip"),
            id: "packing_slip",
            Cell: ({ row }) => {
                const orderId = row.original.id;
                const currentDocumentNumbers = documentNumbers[orderId] || undefined;
                return ((0, jsx_runtime_1.jsx)("div", { className: "text-grey-90 group-hover:text-violet-60 pl-2", children: (0, jsx_runtime_1.jsx)(packing_slip_number_1.default, { orderId: orderId, packingSlipNumber: currentDocumentNumbers ? currentDocumentNumbers.packingSlipNumber : undefined }) }));
            },
        },
        {
            Header: () => ((0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, justifyContent: "flex-end", alignItems: "flex-end", spacing: 1, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.TooltipProvider, { children: (0, jsx_runtime_1.jsx)(ui_1.Tooltip, { content: (0, jsx_runtime_1.jsxs)(material_1.Grid, { item: true, children: [(0, jsx_runtime_1.jsx)(ui_1.Text, { size: "small", children: "We do not store documents. " }), (0, jsx_runtime_1.jsx)(material_1.Link, { fontSize: 12, href: 'https://github.com/RSC-Labs/medusa-documents?tab=readme-ov-file#what-means-we-do-not-store-documents', children: "Learn more what it means." })] }), children: (0, jsx_runtime_1.jsx)(icons_1.InformationCircle, {}) }) }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: "Actions" })] })),
            id: "actions",
            Cell: ({ row }) => {
                return ((0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, justifyContent: 'flex-end', children: (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(actions_dropdown_1.ActionsDropdown, { order: row.original, updateInvoiceNumber: updateInvoiceNumber, updatePackingSlipNumber: updatePackingSlipNumber }) }) }));
            }
        },
    ], [documentNumbers]);
    return [columns, documentNumbers];
};
exports.default = useOrderTableColumns;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWNvbHVtbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvdWktY29tcG9uZW50cy9vcmRlcnMvb3JkZXItdGFibGUvdXNlLWNvbHVtbnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBa0JBLDRDQUdDO0FBRUQsMENBR0M7O0FBMUJELG9EQUE0QjtBQUM1QixpQ0FBMEM7QUFFMUMscUNBQTJFO0FBQzNFLG1EQUFnRDtBQUNoRCw0Q0FBNkQ7QUFDN0QsOEVBQTBFO0FBQzFFLDRGQUFpRTtBQUNqRSxnRkFBc0Q7QUFDdEQsMkNBQW9EO0FBQ3BELGtEQUEwQjtBQUUxQjs7Ozs7R0FLRztBQUNILFNBQWdCLGdCQUFnQixDQUFDLFFBQWdCO0lBQy9DLE1BQU0sY0FBYyxHQUFHLHVCQUFVLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFBO0lBQ3hFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUE7QUFDckMsQ0FBQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxRQUFnQixFQUFFLE1BQWM7SUFDOUQsTUFBTSxPQUFPLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQTtBQUNyQyxDQUFDO0FBUUQsU0FBUyxzQkFBc0IsQ0FBQyxFQUM5QixNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sR0FDVztJQUNqQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUE7SUFFcEIsZ0RBQWdEO0lBQ2hELElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssRUFBRSxDQUFDO1FBQ3JDLE1BQU0sR0FBRyxPQUFPLENBQUE7SUFDbEIsQ0FBQztJQUNELE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQztJQUVsQixPQUFPLElBQUksSUFBSSxDQUFD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