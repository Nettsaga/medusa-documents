"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
const ui_1 = require("@medusajs/ui");
const material_1 = require("@mui/material");
const react_hook_form_1 = require("react-hook-form");
const ui_2 = require("@medusajs/ui");
const react_1 = require("react");
const settings_invoice_display_number_1 = __importDefault(require("./settings-invoice-display-number"));
const InvoiceSettingsForm = ({ invoiceSettings, setOpenModal }) => {
    const { register, handleSubmit, formState: { errors } } = (0, react_hook_form_1.useForm)();
    const [formatNumber, setFormatNumber] = (0, react_1.useState)(invoiceSettings?.numberFormat);
    const [forcedNumber, setForcedNumber] = (0, react_1.useState)(invoiceSettings?.forcedNumber);
    const [bankAccount, setBankAccount] = (0, react_1.useState)(invoiceSettings?.bankAccount);
    const [dueDays, setDueDays] = (0, react_1.useState)(invoiceSettings?.dueDays);
    const [organizationNumber, setOrganizationNumber] = (0, react_1.useState)(invoiceSettings?.organizationNumber);
    const [error, setError] = (0, react_1.useState)(undefined);
    const onSubmit = (data) => {
        fetch(`/admin/documents/document-invoice-settings`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                formatNumber: data.formatNumber,
                forcedNumber: data.forcedNumber !== undefined && data.forcedNumber.toString().length ? data.forcedNumber : undefined,
                bankAccount: data.bankAccount || undefined,
                dueDays: data.dueDays || undefined,
                organizationNumber: data.organizationNumber || undefined
            })
        })
            .then(async (response) => {
            if (response.ok) {
                ui_2.toast.success('Invoice settings', {
                    description: "New invoice settings saved",
                });
                setOpenModal(false);
            }
            else {
                const error = await response.json();
                ui_2.toast.error('Invoice settings', {
                    description: `New invoice settings cannot be saved, some error happened. ${error.message}`,
                });
            }
        })
            .catch((e) => {
            ui_2.toast.error('Invoice settings', {
                description: `New invoice settings cannot be saved, some error happened. ${e.toString()}`,
            });
            console.error(e);
        });
    };
    const INVOICE_NUMBER_PLACEHOLDER = '{invoice_number}';
    const errorText = `Text ${INVOICE_NUMBER_PLACEHOLDER} needs to be included in input.`;
    const LABEL_MUST_FORMAT = `Format must include ${INVOICE_NUMBER_PLACEHOLDER}`;
    const LABEL_MUST_FORCED = `Forced number must be a number`;
    const LABEL_INFO_FORCED = `It will auto-increment starting from this number.`;
    const LABEL_MUST_DUE_DAYS = `Due days must be a positive number`;
    const validateFormatNumber = (value) => {
        if (!value.includes(INVOICE_NUMBER_PLACEHOLDER)) {
            return LABEL_MUST_FORMAT;
        }
        return true;
    };
    const validateForcedNumber = (value) => {
        if (value.length && isNaN(Number(value))) {
            return LABEL_MUST_FORCED;
        }
        return true;
    };
    const validateDueDays = (value) => {
        if (value.length && (isNaN(Number(value)) || Number(value) < 0)) {
            return LABEL_MUST_DUE_DAYS;
        }
        return true;
    };
    return ((0, jsx_runtime_1.jsx)("form", { children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', rowSpacing: 4, paddingTop: 8, children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', spacing: 1, marginTop: 2, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Label, { size: "small", children: "Number format" }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Label, { size: 'xsmall', children: LABEL_MUST_FORMAT }) })] }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Input, { placeholder: INVOICE_NUMBER_PLACEHOLDER, defaultValue: invoiceSettings?.numberFormat ? invoiceSettings.numberFormat : INVOICE_NUMBER_PLACEHOLDER, ...register('formatNumber', {
                                    validate: validateFormatNumber,
                                    onChange(e) {
                                        const value = e.target.value;
                                        if (typeof validateFormatNumber(value) === 'string') {
                                            const result = validateFormatNumber(value);
                                            setError(result);
                                        }
                                        else {
                                            setError(undefined);
                                            setFormatNumber(value);
                                        }
                                    },
                                }) }) })] }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', spacing: 1, marginTop: 2, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Label, { size: "small", children: "Forced number" }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Label, { size: 'xsmall', children: LABEL_INFO_FORCED }) })] }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Input, { defaultValue: invoiceSettings?.forcedNumber !== undefined && invoiceSettings.forcedNumber !== null
                                    ? invoiceSettings.forcedNumber : '', type: "number", ...register('forcedNumber', {
                                    validate: validateForcedNumber,
                                    onChange(e) {
                                        const value = e.target.value;
                                        if (typeof validateForcedNumber(value) === 'string') {
                                            const result = validateForcedNumber(value);
                                            setError(result);
                                        }
                                        else {
                                            setError(undefined);
                                            setForcedNumber(value);
                                        }
                                    },
                                }) }) })] }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', spacing: 1, marginTop: 2, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Label, { size: "small", children: "Bank Account" }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Input, { placeholder: "Enter bank account information", defaultValue: invoiceSettings?.bankAccount || '', ...register('bankAccount', {
                                    onChange(e) {
                                        setBankAccount(e.target.value);
                                    },
                                }) }) })] }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', spacing: 1, marginTop: 2, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Label, { size: "small", children: "Due Days" }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Label, { size: 'xsmall', children: "Number of days after invoice creation when payment is due" }) })] }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Input, { type: "number", placeholder: "30", defaultValue: invoiceSettings?.dueDays !== undefined && invoiceSettings.dueDays !== null
                                    ? invoiceSettings.dueDays : '', ...register('dueDays', {
                                    validate: validateDueDays,
                                    onChange(e) {
                                        const value = e.target.value;
                                        if (typeof validateDueDays(value) === 'string') {
                                            const result = validateDueDays(value);
                                            setError(result);
                                        }
                                        else {
                                            setError(undefined);
                                            setDueDays(value);
                                        }
                                    },
                                }) }) })] }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', spacing: 1, marginTop: 2, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Label, { size: "small", children: "Organization Number" }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Input, { placeholder: "123.456.789", defaultValue: invoiceSettings?.organizationNumber || '', ...register('organizationNumber', {
                                    onChange(e) {
                                        setOrganizationNumber(e.target.value);
                                    },
                                }) }) })] }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', spacing: 1, marginTop: 2, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Label, { size: "small", children: "Your next invoice number will be:" }) }), errors.formatNumber == undefined && errors.forcedNumber == undefined && error == undefined && (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(settings_invoice_display_number_1.default, { formatNumber: formatNumber, forcedNumber: forcedNumber !== undefined && forcedNumber !== null ? parseInt(forcedNumber) : undefined }) })] }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Button, { type: "submit", variant: 'primary', onClick: handleSubmit(onSubmit), children: "Save" }) }), (errors.formatNumber || errors.forcedNumber || errors.dueDays) && (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Alert, { variant: "error", children: errorText }) }), error && (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Alert, { variant: "error", children: error }) })] }) }));
};
const InvoiceSettingsModalDetails = ({ setOpenModal }) => {
    const [data, setData] = (0, react_1.useState)(undefined);
    const [error, setError] = (0, react_1.useState)(undefined);
    const [isLoading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            return;
        }
        fetch(`/admin/documents/document-invoice-settings`, {
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
        return ((0, jsx_runtime_1.jsx)(ui_1.FocusModal.Body, { children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, {}) }));
    }
    return ((0, jsx_runtime_1.jsx)(ui_1.FocusModal.Body, { children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', alignContent: 'center', paddingTop: 8, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Heading, { children: "Invoice settings" }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Text, { children: "These settings will be applied for newly generated invoices." }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(InvoiceSettingsForm, { invoiceSettings: data?.settings, setOpenModal: setOpenModal }) })] }) }));
};
const InvoiceSettingsModal = () => {
    const [open, setOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(ui_1.FocusModal, { open: open, onOpenChange: setOpen, children: [(0, jsx_runtime_1.jsx)(ui_1.FocusModal.Trigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(ui_1.Button, { children: "Change settings" }) }), (0, jsx_runtime_1.jsxs)(ui_1.FocusModal.Content, { children: [(0, jsx_runtime_1.jsx)(ui_1.FocusModal.Header, {}), (0, jsx_runtime_1.jsx)(InvoiceSettingsModalDetails, { setOpenModal: setOpen })] })] }));
};
exports.default = InvoiceSettingsModal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MtaW52b2ljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS1jb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLWludm9pY2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFFSCxxQ0FBcUY7QUFDckYsNENBQXVEO0FBQ3ZELHFEQUEwQztBQUMxQyxxQ0FBb0M7QUFDcEMsaUNBQTRDO0FBRTVDLHdHQUE2RTtBQVU3RSxNQUFNLG1CQUFtQixHQUFHLENBQUMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFvRSxFQUFFLEVBQUU7SUFFbEksTUFBTSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRyxJQUFBLHlCQUFPLEdBQW1CLENBQUE7SUFDcEYsTUFBTSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ2hGLE1BQU0sQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNoRixNQUFNLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxlQUFlLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDN0UsTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxxQkFBcUIsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxlQUFlLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUNsRyxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBcUIsU0FBUyxDQUFDLENBQUM7SUFFbEUsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFxQixFQUFFLEVBQUU7UUFDekMsS0FBSyxDQUFDLDRDQUE0QyxFQUFFO1lBQ2xELE1BQU0sRUFBRSxNQUFNO1lBQ2QsV0FBVyxFQUFFLFNBQVM7WUFDdEIsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxrQkFBa0I7YUFDbkM7WUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDbkIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO2dCQUMvQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVM7Z0JBQ3BILFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLFNBQVM7Z0JBQzFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLFNBQVM7Z0JBQ2xDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxTQUFTO2FBQ3pELENBQUM7U0FDSCxDQUFDO2FBQ0MsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUN2QixJQUFJLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDaEIsVUFBSyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRTtvQkFDaEMsV0FBVyxFQUFFLDRCQUE0QjtpQkFDMUMsQ0FBQyxDQUFDO2dCQUNILFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixDQUFDO2lCQUFNLENBQUM7Z0JBQ04sTUFBTSxLQUFLLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3BDLFVBQUssQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUU7b0JBQzlCLFdBQVcsRUFBRSw4REFBOEQsS0FBSyxDQUFDLE9BQU8sRUFBRTtpQkFDM0YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztRQUNILENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1gsVUFBSyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRTtnQkFDOUIsV0FBVyxFQUFFLDhEQUE4RCxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7YUFDMUYsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQTtJQUNELE1BQU0sMEJBQTBCLEdBQUcsa0JBQWtCLENBQUM7SUFDdEQsTUFBTSxTQUFTLEdBQUcsUUFBUSwwQkFBMEIsaUNBQWlDLENBQUE7SUFDckYsTUFBTSxpQkFBaUIsR0FBRyx1QkFBdUIsMEJBQTBCLEVBQUUsQ0FBQztJQUM5RSxNQUFNLGlCQUFpQixHQUFHLGdDQUFnQyxDQUFDO0lBQzNELE1BQU0saUJBQWlCLEdBQUcsbURBQW1ELENBQUM7SUFDOUUsTUFBTSxtQkFBbUIsR0FBRyxvQ0FBb0MsQ0FBQztJQUVqRSxNQUFNLG9CQUFvQixHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsRUFBRSxDQUFDO1lBQ2hELE9BQU8saUJBQWlCLENBQUM7UUFDM0IsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyxDQUFDO0lBQ0YsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3JDLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN6QyxPQUFPLGlCQUFpQixDQUFDO1FBQzNCLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQztJQUNGLE1BQU0sZUFBZSxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDaEMsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2hFLE9BQU8sbUJBQW1CLENBQUM7UUFDN0IsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyxDQUFDO0lBRUYsT0FBTyxDQUNMLDJDQUNFLHdCQUFDLGVBQUksSUFBQyxTQUFTLFFBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLGFBQy9ELHdCQUFDLGVBQUksSUFBQyxTQUFTLFFBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLGFBQzNELHVCQUFDLGVBQUksSUFBQyxJQUFJLGtCQUNSLHdCQUFDLGVBQUksSUFBQyxTQUFTLFFBQUMsU0FBUyxFQUFFLFFBQVEsYUFDakMsdUJBQUMsZUFBSSxJQUFDLElBQUksa0JBQ1IsdUJBQUMsVUFBSyxJQUFDLElBQUksRUFBQyxPQUFPLDhCQUVYLEdBQ0gsRUFDUCx1QkFBQyxlQUFJLElBQUMsSUFBSSxrQkFDUix1QkFBQyxVQUFLLElBQUMsSUFBSSxFQUFDLFFBQVEsWUFDakIsaUJBQWlCLEdBQ1osR0FDSCxJQUNGLEdBQ0YsRUFDUCx1QkFBQyxlQUFJLElBQUMsSUFBSSxrQkFDUix1QkFBQyxVQUFLLElBQ0osV0FBVyxFQUFFLDBCQUEwQixFQUN2QyxZQUFZLEVBQUUsZUFBZSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsMEJBQTBCLEtBQ25HLFFBQVEsQ0FBQyxjQUFjLEVBQUU7b0NBQzNCLFFBQVEsRUFBRSxvQkFBb0I7b0NBQzlCLFFBQVEsQ0FBQyxDQUFDO3dDQUNSLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBO3dDQUM1QixJQUFJLE9BQU8sb0JBQW9CLENBQUMsS0FBSyxDQUFDLEtBQUssUUFBUSxFQUFFLENBQUM7NENBQ3BELE1BQU0sTUFBTSxHQUFXLG9CQUFvQixDQUFDLEtBQUssQ0FBbUIsQ0FBQzs0Q0FDckUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO3dDQUNsQixDQUFDOzZDQUFNLENBQUM7NENBQ04sUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRDQUNwQixlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7d0NBQ3pCLENBQUM7b0NBQ0gsQ0FBQztpQ0FDRixDQUFDLEdBQ0YsR0FDRyxJQUNGLEVBQ1Asd0JBQUMsZUFBSSxJQUFDLFNBQVMsUUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsYUFDM0QsdUJBQUMsZUFBSSxJQUFDLElBQUksa0JBQ1Isd0JBQUMsZUFBSSxJQUFDLFNBQVMsUUFBQyxTQUFTLEVBQUUsUUFBUSxhQUNqQyx1QkFBQyxlQUFJLElBQUMsSUFBSSxrQkFDUix1QkFBQyxVQUFLLElBQUMsSUFBSSxFQUFDLE9BQU8sOEJBRVgsR0FDSCxFQUNQLHVCQUFDLGVBQUksSUFBQyxJQUFJLGtCQUNSLHVCQUFDLFVBQUssSUFBQyxJQUFJLEVBQUMsUUFBUSxZQUNqQixpQkFBaUIsR0FDWixHQUNILElBQ0YsR0FDRixFQUNQLHVCQUFDLGVBQUksSUFBQyxJQUFJLGtCQUNSLHVCQUFDLFVBQUssSUFDSixZQUFZLEVBQUUsZUFBZSxFQUFFLFlBQVksS0FBSyxTQUFTLElBQUksZUFBZSxDQUFDLFlBQVksS0FBSyxJQUFJO29DQUNoRyxDQUFDLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUNyQyxJQUFJLEVBQUMsUUFBUSxLQUNULFFBQVEsQ0FBQyxjQUFjLEVBQUU7b0NBQzNCLFFBQVEsRUFBRSxvQkFBb0I7b0NBQzlCLFFBQVEsQ0FBQyxDQUFDO3dDQUNSLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBO3dDQUM1QixJQUFJLE9BQU8sb0JBQW9CLENBQUMsS0FBSyxDQUFDLEtBQUssUUFBUSxFQUFFLENBQUM7NENBQ3BELE1BQU0sTUFBTSxHQUFXLG9CQUFvQixDQUFDLEtBQUssQ0FBbUIsQ0FBQzs0Q0FDckUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO3dDQUNsQixDQUFDOzZDQUFNLENBQUM7NENBQ04sUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRDQUNwQixlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7d0NBQ3pCLENBQUM7b0NBQ0gsQ0FBQztpQ0FDRixDQUFDLEdBQ0YsR0FDRyxJQUNGLEVBRVAsd0JBQUMsZUFBSSxJQUFDLFNBQVMsUUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsYUFDM0QsdUJBQUMsZUFBSSxJQUFDLElBQUksa0JBQ1IsdUJBQUMsVUFBSyxJQUFDLElBQUksRUFBQyxPQUFPLDZCQUVYLEdBQ0gsRUFDUCx1QkFBQyxlQUFJLElBQUMsSUFBSSxrQkFDUix1QkFBQyxVQUFLLElBQ0osV0FBVyxFQUFDLGdDQUFnQyxFQUM1QyxZQUFZLEVBQUUsZUFBZSxFQUFFLFdBQVcsSUFBSSxFQUFFLEtBQzVDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7b0NBQzFCLFFBQVEsQ0FBQyxDQUFDO3dDQUNSLGNBQWMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO29DQUNqQyxDQUFDO2lDQUNGLENBQUMsR0FDRixHQUNHLElBQ0YsRUFFUCx3QkFBQyxlQUFJLElBQUMsU0FBUyxRQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxhQUMzRCx1QkFBQyxlQUFJLElBQUMsSUFBSSxrQkFDUix3QkFBQyxlQUFJLElBQUMsU0FBUyxRQUFDLFNBQVMsRUFBRSxRQUFRLGFBQ2pDLHVCQUFDLGVBQUksSUFBQyxJQUFJLGtCQUNSLHVCQUFDLFVBQUssSUFBQyxJQUFJLEVBQUMsT0FBTyx5QkFFWCxHQUNILEVBQ1AsdUJBQUMsZUFBSSxJQUFDLElBQUksa0JBQ1IsdUJBQUMsVUFBSyxJQUFDLElBQUksRUFBQyxRQUFRLDBFQUVaLEdBQ0gsSUFDRixHQUNGLEVBQ1AsdUJBQUMsZUFBSSxJQUFDLElBQUksa0JBQ1IsdUJBQUMsVUFBSyxJQUNKLElBQUksRUFBQyxRQUFRLEVBQ2IsV0FBVyxFQUFDLElBQUksRUFDaEIsWUFBWSxFQUFFLGVBQWUsRUFBRSxPQUFPLEtBQUssU0FBUyxJQUFJLGVBQWUsQ0FBQyxPQUFPLEtBQUssSUFBSTtvQ0FDdEYsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FDNUIsUUFBUSxDQUFDLFNBQVMsRUFBRTtvQ0FDdEIsUUFBUSxFQUFFLGVBQWU7b0NBQ3pCLFFBQVEsQ0FBQyxDQUFDO3dDQUNSLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBO3dDQUM1QixJQUFJLE9BQU8sZUFBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQVEsRUFBRSxDQUFDOzRDQUMvQyxNQUFNLE1BQU0sR0FBVyxlQUFlLENBQUMsS0FBSyxDQUFtQixDQUFDOzRDQUNoRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7d0NBQ2xCLENBQUM7NkNBQU0sQ0FBQzs0Q0FDTixRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7NENBQ3BCLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3Q0FDcEIsQ0FBQztvQ0FDSCxDQUFDO2lDQUNGLENBQUMsR0FDRixHQUNHLElBQ0YsRUFFUCx3QkFBQyxlQUFJLElBQUMsU0FBUyxRQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxhQUMzRCx1QkFBQyxlQUFJLElBQUMsSUFBSSxrQkFDUix1QkFBQyxVQUFLLElBQUMsSUFBSSxFQUFDLE9BQU8sb0NBRVgsR0FDSCxFQUNQLHVCQUFDLGVBQUksSUFBQyxJQUFJLGtCQUNSLHVCQUFDLFVBQUssSUFDSixXQUFXLEVBQUMsYUFBYSxFQUN6QixZQUFZLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixJQUFJLEVBQUUsS0FDbkQsUUFBUSxDQUFDLG9CQUFvQixFQUFFO29DQUNqQyxRQUFRLENBQUMsQ0FBQzt3Q0FDUixxQkFBcUIsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO29DQUN4QyxDQUFDO2lDQUNGLENBQUMsR0FDRixHQUNHLElBQ0YsRUFFUCx3QkFBQyxlQUFJLElBQUMsU0FBUyxRQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxhQUMzRCx1QkFBQyxlQUFJLElBQUMsSUFBSSxrQkFDUix1QkFBQyxVQUFLLElBQUMsSUFBSSxFQUFDLE9BQU8sa0RBRVgsR0FDSCxFQUNOLE1BQU0sQ0FBQyxZQUFZLElBQUksU0FBUyxJQUFJLE1BQU0sQ0FBQyxZQUFZLElBQUksU0FBUyxJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksdUJBQUMsZUFBSSxJQUFDLElBQUksa0JBQ3ZHLHVCQUFDLHlDQUE0QixJQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksS0FBSyxTQUFTLElBQUksWUFBWSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUksR0FDL0osSUFDRixFQUNQLHVCQUFDLGVBQUksSUFBQyxJQUFJLGtCQUNSLHVCQUFDLFdBQU0sSUFDTCxJQUFJLEVBQUMsUUFBUSxFQUNiLE9BQU8sRUFBRSxTQUFTLEVBQ2xCLE9BQU8sRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDLHFCQUd4QixHQUNKLEVBQ04sQ0FBQyxNQUFNLENBQUMsWUFBWSxJQUFJLE1BQU0sQ0FBQyxZQUFZLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLHVCQUFDLGVBQUksSUFBQyxJQUFJLGtCQUMzRSx1QkFBQyxVQUFLLElBQUMsT0FBTyxFQUFDLE9BQU8sWUFBRSxTQUFTLEdBQVMsR0FDckMsRUFDTixLQUFLLElBQUksdUJBQUMsZUFBSSxJQUFDLElBQUksa0JBQ2xCLHVCQUFDLFVBQUssSUFBQyxPQUFPLEVBQUMsT0FBTyxZQUFFLEtBQUssR0FBUyxHQUNqQyxJQUNGLEdBQ0YsQ0FDUixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSwyQkFBMkIsR0FBRyxDQUFDLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRTtJQUV2RCxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBa0IsU0FBUyxDQUFDLENBQUE7SUFFNUQsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQU0sU0FBUyxDQUFDLENBQUM7SUFFbkQsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFFOUMsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRTtRQUNiLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNmLE9BQU87UUFDVCxDQUFDO1FBRUQsS0FBSyxDQUFDLDRDQUE0QyxFQUFFO1lBQ2xELFdBQVcsRUFBRSxTQUFTO1NBQ3ZCLENBQUM7YUFDQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN6QixJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNmLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNmLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuQixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNmLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtJQUVmLElBQUksU0FBUyxFQUFFLENBQUM7UUFDZCxPQUFPLENBQ0wsdUJBQUMsZUFBVSxDQUFDLElBQUksY0FDZCx1QkFBQywyQkFBZ0IsS0FBRyxHQUNKLENBQ25CLENBQUE7SUFDSCxDQUFDO0lBRUQsT0FBTyxDQUNMLHVCQUFDLGVBQVUsQ0FBQyxJQUFJLGNBQ2Qsd0JBQUMsZUFBSSxJQUFDLFNBQVMsUUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsYUFDeEUsdUJBQUMsZUFBSSxJQUFDLElBQUksa0JBQ1IsdUJBQUMsWUFBTyxtQ0FBMkIsR0FDOUIsRUFDUCx1QkFBQyxlQUFJLElBQUMsSUFBSSxrQkFDUix1QkFBQyxTQUFJLCtFQUVFLEdBQ0YsRUFDUCx1QkFBQyxlQUFJLElBQUMsSUFBSSxrQkFDUix1QkFBQyxtQkFBbUIsSUFBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsWUFBWSxHQUFJLEdBQy9FLElBQ0YsR0FDUyxDQUNuQixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLEVBQUU7SUFDaEMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsS0FBSyxDQUFDLENBQUE7SUFFdkMsT0FBTyxDQUNMLHdCQUFDLGVBQVUsSUFDVCxJQUFJLEVBQUUsSUFBSSxFQUNWLFlBQVksRUFBRSxPQUFPLGFBRXJCLHVCQUFDLGVBQVUsQ0FBQyxPQUFPLElBQUMsT0FBTyxrQkFDekIsdUJBQUMsV0FBTSxrQ0FBeUIsR0FDYixFQUNyQix3QkFBQyxlQUFVLENBQUMsT0FBTyxlQUNqQix1QkFBQyxlQUFVLENBQUMsTUFBTSxLQUFHLEVBQ3JCLHVCQUFDLDJCQUEyQixJQUFDLFlBQVksRUFBRSxPQUFPLEdBQUksSUFDbkMsSUFDVixDQUNkLENBQUE7QUFDSCxDQUFDLENBQUE7QUFHRCxrQkFBZSxvQkFBb0IsQ0FBQSJ9