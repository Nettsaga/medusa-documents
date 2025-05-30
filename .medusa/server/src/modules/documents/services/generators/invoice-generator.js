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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputForProvidedKind = validateInputForProvidedKind;
exports.generateInvoice = generateInvoice;
const template_kind_1 = require("../../types/template-kind");
const basic_1 = __importStar(require("../templates/invoices/basic/basic"));
const basic_logo_1 = __importStar(require("../templates/invoices/basic/basic-logo"));
function validateInputForProvidedKind(templateKind, documentSettings) {
    switch (templateKind) {
        case template_kind_1.InvoiceTemplateKind.BASIC:
            return (0, basic_1.validateInput)(documentSettings);
        case template_kind_1.InvoiceTemplateKind.BASIC_LOGO:
            return (0, basic_logo_1.validateInput)(documentSettings);
        default:
            return [false, 'Not supported template'];
    }
}
function generateInvoice(kind, documentSettings, invoice, order, invoiceSettings) {
    switch (kind) {
        case template_kind_1.InvoiceTemplateKind.BASIC:
            return (0, basic_1.default)(documentSettings, invoice, order, invoiceSettings);
        case template_kind_1.InvoiceTemplateKind.BASIC_LOGO:
            return (0, basic_logo_1.default)(documentSettings, invoice, order, invoiceSettings);
        default:
            return Promise.resolve(Buffer.from('Not supported template'));
    }
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2ljZS1nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvc2VydmljZXMvZ2VuZXJhdG9ycy9pbnZvaWNlLWdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7R0FVRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRSCxvRUFTQztBQUVELDBDQVNDO0FBeEJELDZEQUFnRTtBQUNoRSwyRUFBc0c7QUFDdEcscUZBQW1IO0FBRW5ILFNBQWdCLDRCQUE0QixDQUFDLFlBQWlDLEVBQUUsZ0JBQXFCO0lBQ25HLFFBQVEsWUFBWSxFQUFFLENBQUM7UUFDckIsS0FBSyxtQ0FBbUIsQ0FBQyxLQUFLO1lBQzVCLE9BQU8sSUFBQSxxQkFBa0IsRUFBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlDLEtBQUssbUNBQW1CLENBQUMsVUFBVTtZQUNqQyxPQUFPLElBQUEsMEJBQXNCLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNsRDtZQUNFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0FBQ0gsQ0FBQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxJQUF5QixFQUFFLGdCQUFxQyxFQUFFLE9BQTJCLEVBQUUsS0FBZSxFQUFFLGVBQTRDO0lBQzFMLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDYixLQUFLLG1DQUFtQixDQUFDLEtBQUs7WUFDNUIsT0FBTyxJQUFBLGVBQWEsRUFBQyxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzFFLEtBQUssbUNBQW1CLENBQUMsVUFBVTtZQUNqQyxPQUFPLElBQUEsb0JBQWlCLEVBQUMsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxlQUFlLENBQUMsQ0FBQztRQUM5RTtZQUNFLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0FBQ0gsQ0FBQztBQUFBLENBQUMifQ==