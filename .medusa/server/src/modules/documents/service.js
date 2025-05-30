"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/utils");
const utils_2 = require("@medusajs/framework/utils");
const document_invoice_1 = __importDefault(require("./models/document-invoice"));
const document_packing_slip_1 = __importDefault(require("./models/document-packing-slip"));
const document_settings_1 = __importDefault(require("./models/document-settings"));
const document_invoice_settings_1 = __importDefault(require("./models/document-invoice-settings"));
const document_packing_slip_settings_1 = __importDefault(require("./models/document-packing-slip-settings"));
const template_kind_1 = require("./types/template-kind");
const constants_1 = require("./types/constants");
const invoice_generator_1 = require("./services/generators/invoice-generator");
const packing_slip_generator_1 = require("./services/generators/packing-slip-generator");
const kid_generator_1 = require("./utils/kid-generator");
class DocumentsModuleService extends (0, utils_2.MedusaService)({
    DocumentInvoice: document_invoice_1.default,
    DocumentPackingSlip: document_packing_slip_1.default,
    DocumentSettings: document_settings_1.default,
    DocumentInvoiceSettings: document_invoice_settings_1.default,
    DocumentPackingSlipSettings: document_packing_slip_settings_1.default
}) {
    constructor({}, options) {
        super(...arguments);
        this.options_ = options;
    }
    async resetForcedNumberByCreatingNewSettings() {
        const lastDocumentInvoiceSettings = await this.listDocumentInvoiceSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentInvoiceSettings && lastDocumentInvoiceSettings.length) {
            const result = await this.createDocumentInvoiceSettings({
                forcedNumber: undefined,
                numberFormat: lastDocumentInvoiceSettings[0].numberFormat,
                template: lastDocumentInvoiceSettings[0].template
            });
            return result;
        }
        else {
            const result = await this.createDocumentInvoiceSettings({
                forcedNumber: undefined
            });
            return result;
        }
    }
    async getInvoiceForcedNumber() {
        const lastDocumentInvoiceSettings = await this.listDocumentInvoiceSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentInvoiceSettings && lastDocumentInvoiceSettings.length && lastDocumentInvoiceSettings[0].forcedNumber) {
            const nextNumber = lastDocumentInvoiceSettings[0].forcedNumber.toString();
            return nextNumber;
        }
        return undefined;
    }
    async getNextInvoiceNumber(resetForcedNumber) {
        const forcedNumber = await this.getInvoiceForcedNumber();
        if (forcedNumber !== undefined) {
            if (resetForcedNumber) {
                await this.resetForcedNumberByCreatingNewSettings();
            }
            return forcedNumber;
        }
        const lastInvoice = await this.listDocumentInvoices({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastInvoice && lastInvoice.length) {
            return (lastInvoice[0].number + 1).toString();
        }
        return '1';
    }
    async getNextPackingSlipNumber() {
        const lastPackingSlip = await this.listDocumentPackingSlips({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastPackingSlip && lastPackingSlip.length) {
            return (lastPackingSlip[0].number + 1).toString();
        }
        return '1';
    }
    async getInvoice(order, invoiceId, includeBuffer = false) {
        if (includeBuffer) {
            const invoice = await this.retrieveDocumentInvoice(invoiceId, {
                relations: ['invoiceSettings', 'settings']
            });
            if (invoice) {
                const calculatedTemplateKind = this.calculateTemplateKind(invoice.invoiceSettings);
                const buffer = await (0, invoice_generator_1.generateInvoice)(calculatedTemplateKind, invoice.settings, invoice, order, invoice.invoiceSettings);
                return {
                    invoice: invoice,
                    buffer: buffer
                };
            }
        }
        else {
            const invoice = await this.retrieveDocumentInvoice(invoiceId);
            return {
                invoice: invoice,
                buffer: undefined
            };
        }
    }
    async getPackingSlip(order, packingSlipId, includeBuffer = false) {
        if (includeBuffer) {
            const packingSlip = await this.retrieveDocumentPackingSlip(packingSlipId, {
                relations: ['packingSlipSettings', 'settings']
            });
            if (packingSlip) {
                const calculatedTemplateKind = this.calculatePackingSlipTemplateKind(packingSlip.packingSlipSettings);
                const buffer = await (0, packing_slip_generator_1.generatePackingSlip)(calculatedTemplateKind, packingSlip.settings, packingSlip, order);
                return {
                    packingSlip: packingSlip,
                    buffer: buffer
                };
            }
        }
        else {
            const packingSlip = await this.retrieveDocumentPackingSlip(packingSlipId);
            return {
                packingSlip: packingSlip,
                buffer: undefined
            };
        }
    }
    async generateTestPackingSlip(order, templateKind) {
        const lastDocumentSettings = await this.listDocumentSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentSettings && lastDocumentSettings.length) {
            const nextNumber = await this.getNextPackingSlipNumber();
            const [validationPassed, info] = (0, packing_slip_generator_1.validateInputForProvidedKind)(templateKind, lastDocumentSettings[0]);
            if (validationPassed) {
                const testPackingSlip = {
                    number: parseInt(nextNumber),
                    displayNumber: nextNumber,
                    created_at: new Date(Date.now())
                };
                const buffer = await (0, packing_slip_generator_1.generatePackingSlip)(templateKind, lastDocumentSettings[0], testPackingSlip, order);
                return {
                    packingSlip: testPackingSlip,
                    buffer: buffer
                };
            }
            else {
                throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, info);
            }
        }
        else {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Document settings are not defined');
        }
    }
    async generateTestInvoice(order, templateKind) {
        const lastDocumentSettings = await this.listDocumentSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentSettings && lastDocumentSettings.length) {
            const lastInvoiceSettings = await this.listDocumentInvoiceSettings({}, {
                order: {
                    created_at: "DESC"
                },
                take: 1
            });
            if (lastInvoiceSettings && lastInvoiceSettings.length) {
                const invoiceSettings = lastInvoiceSettings[0];
                const nextNumber = await this.getNextInvoiceNumber();
                const [validationPassed, info] = (0, invoice_generator_1.validateInputForProvidedKind)(templateKind, lastDocumentSettings[0]);
                if (validationPassed) {
                    const testInvoice = {
                        number: parseInt(nextNumber),
                        displayNumber: invoiceSettings.numberFormat ? invoiceSettings.numberFormat.replace(constants_1.INVOICE_NUMBER_PLACEHOLDER, nextNumber) : nextNumber,
                        created_at: new Date(Date.now()),
                        kidNumber: (0, kid_generator_1.kidForOrder)("test-order-id"),
                        dueDate: null
                    };
                    const buffer = await (0, invoice_generator_1.generateInvoice)(templateKind, lastDocumentSettings[0], testInvoice, order, invoiceSettings);
                    return {
                        invoice: testInvoice,
                        buffer: buffer
                    };
                }
                else {
                    throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, info);
                }
            }
            else {
                throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Invoice settings are not defined');
            }
        }
        else {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Document settings are not defined');
        }
    }
    calculateTemplateKind(documentInvoiceSettings) {
        if (documentInvoiceSettings && documentInvoiceSettings.template) {
            return documentInvoiceSettings.template;
        }
        return template_kind_1.InvoiceTemplateKind.BASIC;
    }
    async generateInvoiceForOrder(order) {
        if (order) {
            const lastDocumentSettings = await this.listDocumentSettings({}, {
                order: {
                    created_at: "DESC"
                },
                take: 1
            });
            if (lastDocumentSettings && lastDocumentSettings.length) {
                const lastDocumentInvoiceSettings = await this.listDocumentInvoiceSettings({}, {
                    order: {
                        created_at: "DESC"
                    },
                    take: 1
                });
                if (lastDocumentInvoiceSettings && lastDocumentInvoiceSettings.length) {
                    const invoiceSettings = lastDocumentInvoiceSettings[0];
                    const calculatedTemplateKind = this.calculateTemplateKind(lastDocumentInvoiceSettings[0]);
                    const [validationPassed, info] = (0, invoice_generator_1.validateInputForProvidedKind)(calculatedTemplateKind, lastDocumentSettings[0]);
                    if (validationPassed) {
                        const RESET_FORCED_NUMBER = true;
                        const nextNumber = await this.getNextInvoiceNumber(RESET_FORCED_NUMBER);
                        const createdAt = new Date(Date.now());
                        // Generate KID number from order ID
                        const kidNumber = (0, kid_generator_1.kidForOrder)(order.id);
                        // Calculate due date from creation date + due days setting
                        let dueDate = null;
                        if (invoiceSettings.dueDays && invoiceSettings.dueDays > 0) {
                            dueDate = new Date(createdAt);
                            dueDate.setDate(dueDate.getDate() + invoiceSettings.dueDays);
                        }
                        const entryInvoiceData = {
                            number: parseInt(nextNumber),
                            displayNumber: invoiceSettings.numberFormat ? invoiceSettings.numberFormat.replace(constants_1.INVOICE_NUMBER_PLACEHOLDER, nextNumber) : nextNumber,
                            created_at: createdAt,
                            invoice_settings_id: invoiceSettings.id,
                            settings_id: lastDocumentSettings[0].id,
                            kidNumber: kidNumber,
                            dueDate: dueDate
                        };
                        const createData = {};
                        for (const [key, value] of Object.entries(entryInvoiceData)) {
                            if (value !== undefined) {
                                createData[key] = value;
                            }
                        }
                        const createdInvoiceEntity = await this.createDocumentInvoices(createData);
                        const buffer = await (0, invoice_generator_1.generateInvoice)(calculatedTemplateKind, lastDocumentSettings[0], createdInvoiceEntity, order, invoiceSettings);
                        return {
                            invoice: createdInvoiceEntity,
                            buffer: buffer
                        };
                    }
                    else {
                        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, info);
                    }
                }
                else {
                    throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Invoice settings are not defined');
                }
            }
            else {
                throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Document settings are not defined');
            }
        }
        return undefined;
    }
    calculatePackingSlipTemplateKind(documentPackingSlipSettings) {
        if (documentPackingSlipSettings && documentPackingSlipSettings.template) {
            return documentPackingSlipSettings.template;
        }
        return template_kind_1.PackingSlipTemplateKind.BASIC;
    }
    async generatePackingSlipForOrder(order) {
        const lastDocumentSettings = await this.listDocumentSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentSettings && lastDocumentSettings.length) {
            const lastDocumentPackingSlipSettings = await this.listDocumentPackingSlipSettings({}, {
                order: {
                    created_at: "DESC"
                },
                take: 1
            });
            if (lastDocumentPackingSlipSettings && lastDocumentPackingSlipSettings.length) {
                const packingSlipSettings = lastDocumentPackingSlipSettings[0];
                const calculatedTemplateKind = this.calculatePackingSlipTemplateKind(lastDocumentPackingSlipSettings[0]);
                const [validationPassed, info] = (0, packing_slip_generator_1.validateInputForProvidedKind)(calculatedTemplateKind, lastDocumentSettings[0]);
                if (validationPassed) {
                    const nextNumber = await this.getNextPackingSlipNumber();
                    const entryPackingSlip = {
                        number: parseInt(nextNumber),
                        displayNumber: packingSlipSettings.numberFormat ? packingSlipSettings.numberFormat.replace(constants_1.PACKING_SLIP_NUMBER_PLACEHOLDER, nextNumber) : nextNumber,
                        created_at: new Date(Date.now()),
                        packing_slip_settings_id: packingSlipSettings.id,
                        settings_id: lastDocumentSettings[0].id
                    };
                    const packingSlipResult = await this.createDocumentPackingSlips(entryPackingSlip);
                    const buffer = await (0, packing_slip_generator_1.generatePackingSlip)(calculatedTemplateKind, lastDocumentSettings[0], packingSlipResult, order);
                    return {
                        packingSlip: packingSlipResult,
                        buffer: buffer
                    };
                }
                else {
                    throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, info);
                }
            }
            else {
                throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Retrieve packing slip settings failed. Please check if they are set - e.g. if you set template or other settings.');
            }
        }
        else {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Document settings are not defined');
        }
    }
    async updateInvoiceTemplate(invoiceTemplate) {
        const lastDocumentInvoiceSettings = await this.listDocumentInvoiceSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentInvoiceSettings && lastDocumentInvoiceSettings.length) {
            const newDocumentSettings = {
                template: invoiceTemplate ?? lastDocumentInvoiceSettings[0].template,
            };
            const result = await this.createDocumentInvoiceSettings(newDocumentSettings);
            return result;
        }
        else {
            const result = await this.createDocumentInvoiceSettings({
                template: invoiceTemplate
            });
            return result;
        }
    }
    async updatePackingSlipTemplate(packingSlipTemplate) {
        const lastDocumentPackingSlipSettings = await this.listDocumentPackingSlipSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentPackingSlipSettings && lastDocumentPackingSlipSettings.length) {
            const newDocumentSettings = {
                template: packingSlipTemplate ?? lastDocumentPackingSlipSettings[0].template,
            };
            const result = await this.createDocumentPackingSlipSettings(newDocumentSettings);
            return result;
        }
        else {
            const result = await this.createDocumentPackingSlipSettings({
                template: packingSlipTemplate
            });
            return result;
        }
    }
    async updatePackingSlipSettings(newFormatNumber, forcedNumber, template) {
        const lastDocumentPackingSlipSettings = await this.listDocumentPackingSlipSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentPackingSlipSettings && lastDocumentPackingSlipSettings.length) {
            const result = await this.createDocumentPackingSlipSettings({
                numberFormat: newFormatNumber ?? lastDocumentPackingSlipSettings[0].numberFormat,
                forcedNumber: forcedNumber ? parseInt(forcedNumber) : lastDocumentPackingSlipSettings[0].forcedNumber,
                template: template ?? lastDocumentPackingSlipSettings[0].template,
            });
            return result;
        }
        else {
            const result = await this.createDocumentPackingSlipSettings({
                numberFormat: newFormatNumber,
                forcedNumber: forcedNumber ? parseInt(forcedNumber) : undefined,
                template: template
            });
            return result;
        }
    }
    async updateInvoiceSettings(newFormatNumber, forcedNumber, invoiceTemplate, bankAccount, dueDays) {
        const lastDocumentInvoiceSettings = await this.listDocumentInvoiceSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentInvoiceSettings && lastDocumentInvoiceSettings.length) {
            const result = await this.createDocumentInvoiceSettings({
                numberFormat: newFormatNumber ?? lastDocumentInvoiceSettings[0].numberFormat,
                forcedNumber: forcedNumber ? parseInt(forcedNumber) : lastDocumentInvoiceSettings[0].forcedNumber,
                template: invoiceTemplate ?? lastDocumentInvoiceSettings[0].template,
                bankAccount: bankAccount ?? lastDocumentInvoiceSettings[0].bankAccount,
                dueDays: dueDays ?? lastDocumentInvoiceSettings[0].dueDays,
            });
            return result;
        }
        else {
            const result = await this.createDocumentInvoiceSettings({
                numberFormat: newFormatNumber,
                forcedNumber: forcedNumber ? parseInt(forcedNumber) : undefined,
                template: invoiceTemplate,
                bankAccount: bankAccount,
                dueDays: dueDays,
            });
            return result;
        }
    }
    async updateStoreLogo(logoSource) {
        const lastDocumentSettings = await this.listDocumentSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentSettings && lastDocumentSettings.length) {
            const result = await this.createDocumentSettings({
                storeLogoSource: logoSource,
                storeAddress: lastDocumentSettings[0].storeAddress
            });
            return result;
        }
        else {
            const result = await this.createDocumentSettings({
                storeLogoSource: logoSource
            });
            return result;
        }
    }
    async updateStoreDocumentAddress(address) {
        const lastDocumentSettings = await this.listDocumentSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1,
            relations: ["documentInvoice", "documentPackingSlip"]
        });
        if (lastDocumentSettings && lastDocumentSettings.length) {
            const result = await this.createDocumentSettings({
                id: undefined,
                storeAddress: address,
                storeLogoSource: lastDocumentSettings[0].storeLogoSource,
            });
            return result;
        }
        else {
            const result = await this.createDocumentSettings({
                storeAddress: address,
            });
            return result;
        }
    }
    async getTestDisplayNumber(formatNumber, forcedNumber) {
        const nextNumber = forcedNumber !== undefined ? forcedNumber : await this.getNextInvoiceNumber();
        if (nextNumber) {
            return formatNumber ? formatNumber.replace(constants_1.INVOICE_NUMBER_PLACEHOLDER, nextNumber) : nextNumber;
        }
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Neither forced number is set or any order present');
    }
}
exports.default = DocumentsModuleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOzs7OztBQUVILDJDQUErRDtBQUMvRCxxREFBeUQ7QUFHekQsaUZBQXdEO0FBQ3hELDJGQUFpRTtBQUNqRSxtRkFBMEQ7QUFDMUQsbUdBQXlFO0FBQ3pFLDZHQUFrRjtBQUVsRix5REFBcUY7QUFDckYsaURBQWdHO0FBQ2hHLCtFQUF3RztBQUN4Ryx5RkFBNEo7QUFFNUoseURBQW9EO0FBVXBELE1BQU0sc0JBQXVCLFNBQVEsSUFBQSxxQkFBYSxFQUFDO0lBQ2pELGVBQWUsRUFBZiwwQkFBZTtJQUNmLG1CQUFtQixFQUFuQiwrQkFBbUI7SUFDbkIsZ0JBQWdCLEVBQWhCLDJCQUFnQjtJQUNoQix1QkFBdUIsRUFBdkIsbUNBQXVCO0lBQ3ZCLDJCQUEyQixFQUEzQix3Q0FBMkI7Q0FDNUIsQ0FBQztJQU1BLFlBQVksRUFDVyxFQUFFLE9BQXVCO1FBQzlDLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFBO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzFCLENBQUM7SUFFTyxLQUFLLENBQUMsc0NBQXNDO1FBQ2xELE1BQU0sMkJBQTJCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQUMsRUFBRSxFQUFFO1lBQzdFLEtBQUssRUFBRTtnQkFDTCxVQUFVLEVBQUUsTUFBTTthQUNuQjtZQUNELElBQUksRUFBRSxDQUFDO1NBQ1IsQ0FBQyxDQUFBO1FBQ0YsSUFBSSwyQkFBMkIsSUFBSSwyQkFBMkIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0RSxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyw2QkFBNkIsQ0FBQztnQkFDdEQsWUFBWSxFQUFFLFNBQVM7Z0JBQ3ZCLFlBQVksRUFBRSwyQkFBMkIs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