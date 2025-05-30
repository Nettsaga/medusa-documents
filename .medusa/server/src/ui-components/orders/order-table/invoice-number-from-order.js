"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/*
 * Copyright 2024 RSC-Labs, https://rsoftcon.com/
 *
 * MIT License
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const react_1 = require("react");
const material_1 = require("@mui/material");
const material_2 = require("@mui/material");
const ui_1 = require("@medusajs/ui");
const InvoiceNumberFromOrder = ({ orderId, invoiceNumber, showKidNumber = true, }) => {
    const [data, setData] = (0, react_1.useState)(undefined);
    const [error, setError] = (0, react_1.useState)(undefined);
    const [isHovered, setIsHovered] = (0, react_1.useState)(false);
    const [isLoading, setLoading] = (0, react_1.useState)(true);
    const handleClick = async () => {
        ui_1.toast.loading("Invoice", {
            description: "Preparing invoice...",
            duration: Infinity,
        });
        const result = new URLSearchParams({
            includeBuffer: "true",
            orderId: orderId,
        });
        fetch(`/admin/documents/invoice?${result.toString()}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((result) => {
            if (result && result.buffer) {
                ui_1.toast.dismiss();
                openPdf(result);
            }
            else {
                ui_1.toast.dismiss();
                ui_1.toast.error("Invoice", {
                    description: "Problem happened when preparing invoice",
                });
            }
        })
            .catch((error) => {
            setError(error);
            console.error(error);
            ui_1.toast.dismiss();
            ui_1.toast.error("Invoice", {
                description: error,
            });
        });
    };
    const openPdf = (invoiceResult) => {
        if (invoiceResult && invoiceResult.buffer) {
            const anyBuffer = invoiceResult.buffer;
            const blob = new Blob([new Uint8Array(anyBuffer.data)], {
                type: "application/pdf",
            });
            const pdfURL = URL.createObjectURL(blob);
            window.open(pdfURL, "_blank");
        }
    };
    const result = new URLSearchParams({
        orderId: orderId,
    });
    (0, react_1.useEffect)(() => {
        setLoading(true);
    }, [invoiceNumber, orderId]);
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            return;
        }
        fetch(`/admin/documents/invoice?${result.toString()}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((result) => {
            setData(result);
            setLoading(false);
        })
            .catch((error) => {
            setError(error);
            console.error(error);
        });
    }, [isLoading]);
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)(material_2.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { size: 8 }) }));
    }
    if (data && data.invoice) {
        return ((0, jsx_runtime_1.jsxs)(material_2.Grid, { container: true, direction: "column", spacing: 1, onClick: () => handleClick(), style: {
                cursor: "pointer",
                color: isHovered ? "violet" : "grey",
                textDecoration: isHovered ? "underline" : "none",
                transition: "color 0.2s, text-decoration 0.2s",
            }, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [(0, jsx_runtime_1.jsx)(material_2.Grid, { item: true, children: (0, jsx_runtime_1.jsx)("div", { children: data.invoice.displayNumber }) }), data.invoice.kidNumber && showKidNumber && ((0, jsx_runtime_1.jsx)(material_2.Grid, { item: true, children: (0, jsx_runtime_1.jsxs)("div", { children: ["KID: ", data.invoice.kidNumber] }) }))] }));
    }
    else {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    }
};
exports.default = InvoiceNumberFromOrder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2ljZS1udW1iZXItZnJvbS1vcmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy91aS1jb21wb25lbnRzL29yZGVycy9vcmRlci10YWJsZS9pbnZvaWNlLW51bWJlci1mcm9tLW9yZGVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7Ozs7Ozs7OztHQVVHO0FBRUgsaUNBQTRDO0FBQzVDLDRDQUFpRDtBQUNqRCw0Q0FBcUM7QUFDckMscUNBQXFDO0FBR3JDLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxFQUM5QixPQUFPLEVBQ1AsYUFBYSxFQUNiLGFBQWEsR0FBRyxJQUFJLEdBS3JCLEVBQUUsRUFBRTtJQUNILE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFrQixTQUFTLENBQUMsQ0FBQztJQUU3RCxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBTSxTQUFTLENBQUMsQ0FBQztJQUVuRCxNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUVsRCxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUUvQyxNQUFNLFdBQVcsR0FBRyxLQUFLLElBQUksRUFBRTtRQUM3QixVQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUN2QixXQUFXLEVBQUUsc0JBQXNCO1lBQ25DLFFBQVEsRUFBRSxRQUFRO1NBQ25CLENBQUMsQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFvQixJQUFJLGVBQWUsQ0FBQztZQUNsRCxhQUFhLEVBQUUsTUFBTTtZQUNyQixPQUFPLEVBQUUsT0FBTztTQUNqQixDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsNEJBQTRCLE1BQU0sQ0FBQyxRQUFRLEVB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