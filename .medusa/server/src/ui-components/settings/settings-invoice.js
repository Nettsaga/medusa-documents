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
                dueDays: data.dueDays || undefined
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MtaW52b2ljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS1jb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLWludm9pY2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFFSCxxQ0FBcUY7QUFDckYsNENBQXVEO0FBQ3ZELHFEQUEwQztBQUMxQyxxQ0FBb0M7QUFDcEMsaUNBQTRDO0FBRTVDLHdHQUE2RTtBQVM3RSxNQUFNLG1CQUFtQixHQUFHLENBQUMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFvRSxFQUFFLEVBQUU7SUFFbEksTUFBTSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRyxJQUFBLHlCQUFPLEdBQW1CLENBQUE7SUFDcEYsTUFBTSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ2hGLE1BQU0sQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNoRixNQUFNLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxlQUFlLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDN0UsTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFxQixTQUFTLENBQUMsQ0FBQztJQUVsRSxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQXFCLEVBQUUsRUFBRTtRQUN6QyxLQUFLLENBQUMsNENBQTRDLEVBQUU7WUFDbEQsTUFBTSxF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