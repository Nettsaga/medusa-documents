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
exports.validateInput = validateInput;
const pdfkit_1 = __importDefault(require("pdfkit"));
const customer_info_1 = require("./parts/customer-info");
const table_1 = require("./parts/table");
const invoice_info_1 = require("./parts/invoice-info");
const header_for_logo_1 = require("./parts/header-for-logo");
const header_logo_1 = require("./parts/header-logo");
const path_1 = __importDefault(require("path"));
function validateInput(settings) {
    if (settings && settings.storeAddress && settings.storeAddress.company &&
        settings.storeAddress.address_1 &&
        settings.storeAddress.city &&
        settings.storeAddress.postal_code &&
        settings.storeLogoSource)
        return [true, ''];
    return [false, `Not all settings are defined to generate template. Following settings are checked: logo, company, address, city, postal_code`];
}
exports.default = async (settings, invoice, order, invoiceSettings) => {
    var doc = new pdfkit_1.default();
    doc.registerFont('Regular', path_1.default.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Regular.ttf'));
    doc.registerFont('Bold', path_1.default.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Bold.ttf'));
    doc.font('Regular');
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    const endHeader = (0, header_for_logo_1.generateHeaderForLogo)(doc, 50, settings);
    await (0, header_logo_1.generateHeaderLogo)(doc, 50, settings.storeLogoSource);
    const endInvoice = (0, invoice_info_1.generateInvoiceInformation)(doc, endHeader, invoice, settings, invoiceSettings);
    const endDetails = (0, customer_info_1.generateCustomerInformation)(doc, endInvoice, order);
    (0, table_1.generateInvoiceTable)(doc, endDetails, order, order.items || []);
    doc.end();
    const bufferPromise = new Promise(resolve => {
        doc.on("end", () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });
    });
    return await bufferPromise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtbG9nby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlcy90ZW1wbGF0ZXMvaW52b2ljZXMvYmFzaWMvYmFzaWMtbG9nby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7R0FVRzs7Ozs7QUFZSCxzQ0FRQztBQWhCRCxvREFBaUM7QUFDakMseURBQW9FO0FBQ3BFLHlDQUFxRDtBQUNyRCx1REFBa0U7QUFDbEUsNkRBQWdFO0FBQ2hFLHFEQUF5RDtBQUN6RCxnREFBd0I7QUFFeEIsU0FBZ0IsYUFBYSxDQUFDLFFBQThCO0lBQzFELElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxZQUFZLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPO1FBQ3BFLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUztRQUMvQixRQUFRLENBQUMsWUFBWSxDQUFDLElBQUk7UUFDMUIsUUFBUSxDQUFDLFlBQVksQ0FBQyxXQUFXO1FBQ2pDLFFBQVEsQ0FBQyxlQUFlO1FBQ3hCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEIsT0FBTyxDQUFDLEtBQUssRUFBRSw4SEFBOEgsQ0FBQyxDQUFDO0FBQ2pKLENBQUM7QUFFRCxrQkFBZSxLQUFLLEVBQUUsUUFBNkIsRUFBRSxPQUEyQixFQUFFLEtBQWUsRUFBRSxlQUE0QyxFQUFtQixFQUFFO0lBQ2xLLElBQUksR0FBRyxHQUFHLElBQUksZ0JBQVcsRUFBRSxDQUFDO0lBQzVCLEdBQUcsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLGNBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGtEQUFrRCxDQUFDLENBQUMsQ0FBQTtJQUN4RyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSwrQ0FBK0MsQ0FBQyxDQUFDLENBQUE7SUFDbEcsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVwQixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUE7SUFDbEIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUUxQyxNQUFNLFNBQVMsR0FBRyxJQUFBLHVDQUFxQixFQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0QsTUFBTSxJQUFBLGdDQUFrQixFQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLGVBQWdCLENBQUMsQ0FBQztJQUM3RCxNQUFNLFVBQVUsR0FBRyxJQUFBLHlDQUEwQixFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUNsRyxNQUFNLFVBQVUsR0FBRyxJQUFBLDJDQUEyQixFQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkUsSUFBQSw0QkFBb0IsRUFBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRWhFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUVWLE1BQU0sYUFBYSxHQUFHLElBQUksT0FBTyxDQUFTLE9BQU8sQ0FBQyxFQUFFO1FBQ2xELEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUNqQixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3RDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBRUYsT0FBTyxNQUFNLGFBQWEsQ0FBQztBQUM3QixDQUFDLENBQUMifQ==