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
const material_1 = require("@mui/material");
const react_1 = require("react");
const ui_1 = require("@medusajs/ui");
const material_2 = require("@mui/material");
const PackingSlipNumber = ({ orderId, packingSlipNumber, }) => {
    const [data, setData] = (0, react_1.useState)(undefined);
    const [error, setError] = (0, react_1.useState)(undefined);
    const [isHovered, setIsHovered] = (0, react_1.useState)(false);
    const [isLoading, setLoading] = (0, react_1.useState)(true);
    const handleClick = async () => {
        ui_1.toast.loading("Packing slip", {
            description: "Preparing packing slip...",
            duration: Infinity,
        });
        const result = new URLSearchParams({
            includeBuffer: "true",
            orderId: orderId,
        });
        fetch(`/admin/documents/packing-slip?${result.toString()}`, {
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
                ui_1.toast.error("Packing slip", {
                    description: "Problem happened when preparing packing slip",
                });
            }
        })
            .catch((error) => {
            setError(error);
            console.error(error);
            ui_1.toast.dismiss();
            ui_1.toast.error("Packing slip", {
                description: error,
            });
        });
    };
    const openPdf = (packingSlipResult) => {
        if (packingSlipResult && packingSlipResult.buffer) {
            const anyBuffer = packingSlipResult.buffer;
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
    }, [packingSlipNumber, orderId]);
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            return;
        }
        fetch(`/admin/documents/packing-slip?${result.toString()}`, {
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
        return (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { size: 8 });
    }
    if (data && data.packingSlip) {
        return ((0, jsx_runtime_1.jsx)(material_2.Grid, { item: true, children: (0, jsx_runtime_1.jsx)("p", { className: "text-grey-90 hover:text-violet-60 cursor-pointer pl-2 transition-colors duration-200", onClick: () => handleClick(), style: {
                    cursor: "pointer",
                    color: isHovered ? "violet" : "grey",
                    textDecoration: isHovered ? "underline" : "none",
                    transition: "color 0.2s, text-decoration 0.2s",
                }, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: `Packing slip: ${data.packingSlip.displayNumber}` }) }));
    }
    else {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    }
};
exports.default = PackingSlipNumber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2luZy1zbGlwLW51bWJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy91aS1jb21wb25lbnRzL29yZGVycy9vcmRlci10YWJsZS9wYWNraW5nLXNsaXAtbnVtYmVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7Ozs7Ozs7OztHQVVHO0FBRUgsNENBQWlEO0FBQ2pELGlDQUE0QztBQUM1QyxxQ0FBcUM7QUFFckMsNENBQXFDO0FBRXJDLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxFQUN6QixPQUFPLEVBQ1AsaUJBQWlCLEdBSWxCLEVBQUUsRUFBRTtJQUNILE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFrQixTQUFTLENBQUMsQ0FBQztJQUU3RCxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBTSxTQUFTLENBQUMsQ0FBQztJQUVuRCxNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUVsRCxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUUvQyxNQUFNLFdBQVcsR0FBRyxLQUFLLElBQUksRUFBRTtRQUM3QixVQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRTtZQUM1QixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFFBQVEsRUFBRSxRQUFRO1NBQ25CLENBQUMsQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFvQixJQUFJLGVBQWUsQ0FBQztZQUNsRCxhQUFhLEVBQUUsTUFBTTtZQUNyQixPQUFPLEVBQUUsT0FBTztTQUNqQixDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsaUNBQWlDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFO1lBQzFELFdBQVcsRUFBRSxTQUFTO1NBQ3ZCLENBQUM7YUFDQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN6QixJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNmLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDNUIsVUFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNoQixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEIsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLFVBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDaEIsVUFBSyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUU7b0JBQzFCLFdBQVcsRUFBRSw4Q0FBOEM7aUJBQzVELENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNmLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLFVBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNoQixVQUFLLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRTtnQkFDMUIsV0FBVyxFQUFFLEtBQUs7YUFDbkIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxDQUFDLGlCQUFxQyxFQUFFLEVBQUU7UUFDeEQsSUFBSSxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNsRCxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxNQUFhLENBQUM7WUFDbEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtnQkFDdEQsSUFBSSxFQUFFLGlCQUFpQjthQUN4QixDQUFDLENBQUM7WUFDSCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRixNQUFNLE1BQU0sR0FBb0IsSUFBSSxlQUFlLENBQUM7UUFDbEQsT0FBTyxFQUFFLE9BQU87S0FDakIsQ0FBQyxDQUFDO0lBRUgsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRTtRQUNiLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQixDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBRWpDLElBQUEsaUJBQVMsRUFBQyxHQUFHLEVBQUU7UUFDYixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixPQUFPO1FBQ1QsQ0FBQztRQUVELEtBQUssQ0FBQyxpQ0FBaUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUU7WUFDMUQsV0FBVyxFQUFFLFNBQVM7U0FDdkIsQ0FBQzthQUNDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3pCLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2YsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hCLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNmLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUVoQixJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ2QsT0FBTyx1QkFBQywyQkFBZ0IsSUFBQyxJQUFJLEVBQUUsQ0FBQyxHQUFJLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QixPQUFPLENBQ0wsdUJBQUMsZUFBSSxJQUFDLElBQUksa0JBQ1IsOEJBQ0UsU0FBUyxFQUFDLHNGQUFzRixFQUNoRyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLEVBQzVCLEtBQUssRUFBRTtvQkFDTCxNQUFNLEVBQUUsU0FBUztvQkFDakIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNO29CQUNwQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU07b0JBQ2hELFVBQVUsRUFBRSxrQ0FBa0M7aUJBQy9DLEVBQ0QsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFDdEMsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsWUFFdEMsaUJBQWlCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEdBQ2hELEdBQ0MsQ0FDUixDQUFDO0lBQ0osQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLGtEQUFLLENBQUM7SUFDZixDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsaUJBQWlCLENBQUMifQ==