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
const header_1 = require("./parts/header");
const customer_info_1 = require("./parts/customer-info");
const table_1 = require("./parts/table");
const invoice_info_1 = require("./parts/invoice-info");
const path_1 = __importDefault(require("path"));
function validateInput(settings) {
    if (settings && settings.storeAddress && settings.storeAddress.company &&
        settings.storeAddress.address_1 &&
        settings.storeAddress.city &&
        settings.storeAddress.postal_code)
        return [true, ''];
    return [false, `Not all settings are defined to generate template. Following settings are checked: company, address, city, postal_code`];
}
exports.default = async (settings, invoice, order, invoiceSettings) => {
    var doc = new pdfkit_1.default();
    doc.registerFont('Regular', path_1.default.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Regular.ttf'));
    doc.registerFont('Bold', path_1.default.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Bold.ttf'));
    doc.font('Regular');
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    const endHeader = (0, header_1.generateHeader)(doc, 50, settings);
    const endInvoiceInfo = (0, invoice_info_1.generateInvoiceInformation)(doc, endHeader, invoice, settings, invoiceSettings);
    const endY = (0, customer_info_1.generateCustomerInformation)(doc, endInvoiceInfo, order);
    (0, table_1.generateInvoiceTable)(doc, endY, order, order.items || []);
    doc.end();
    const bufferPromise = new Promise(resolve => {
        doc.on("end", () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });
    });
    return await bufferPromise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvc2VydmljZXMvdGVtcGxhdGVzL2ludm9pY2VzL2Jhc2ljL2Jhc2ljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOzs7OztBQVdILHNDQU9DO0FBaEJELG9EQUFpQztBQUVqQywyQ0FBZ0Q7QUFDaEQseURBQW9FO0FBQ3BFLHlDQUFxRDtBQUNyRCx1REFBa0U7QUFDbEUsZ0RBQXdCO0FBR3hCLFNBQWdCLGFBQWEsQ0FBQyxRQUE4QjtJQUMxRCxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsWUFBWSxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTztRQUNwRSxRQUFRLENBQUMsWUFBWSxDQUFDLFNBQVM7UUFDL0IsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJO1FBQzFCLFFBQVEsQ0FBQyxZQUFZLENBQUMsV0FBVztRQUNqQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsd0hBQXdILENBQUMsQ0FBQztBQUMzSSxDQUFDO0FBRUQsa0JBQWUsS0FBSyxFQUFFLFFBQTZCLEVBQUUsT0FBMkIsRUFBRSxLQUFlLEVBQUUsZUFBNEMsRUFBbUIsRUFBRTtJQUNsSyxJQUFJLEdBQUcsR0FBRyxJQUFJLGdCQUFXLEVBQUUsQ0FBQztJQUM1QixHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxrREFBa0QsQ0FBQyxDQUFDLENBQUE7SUFDeEcsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsK0NBQStDLENBQUMsQ0FBQyxDQUFBO0lBQ2xHLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFcEIsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFFMUMsTUFBTSxTQUFTLEdBQUcsSUFBQSx1QkFBYyxFQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEQsTUFBTSxjQUFjLEdBQUcsSUFBQSx5Q0FBMEIsRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDdEcsTUFBTSxJQUFJLEdBQUcsSUFBQSwyQ0FBMkIsRUFBQyxHQUFHLEVBQUUsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JFLElBQUEsNEJBQW9CLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztJQUUxRCxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFVixNQUFNLGFBQWEsR0FBRyxJQUFJLE9BQU8sQ0FBUyxPQUFPLENBQUMsRUFBRTtRQUNsRCxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDakIsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUN0QyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDbEIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU8sTUFBTSxhQUFhLENBQUM7QUFDN0IsQ0FBQyxDQUFDIn0=