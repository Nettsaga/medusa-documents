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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoiceInformation = generateInvoiceInformation;
const hr_1 = require("./hr");
const i18next_1 = require("i18next");
function generateInvoiceInformation(doc, y, invoice, settings, invoiceSettings) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text((0, i18next_1.t)("invoice", "Invoice"), 50, y + 40);
    (0, hr_1.generateHr)(doc, y + 65);
    const invoiceInformationTop = y + 80;
    let currentY = invoiceInformationTop;
    doc
        .fontSize(10)
        .text(`${(0, i18next_1.t)("invoice-number", "Invoice number")}:`, 50, currentY)
        .font("Bold")
        .text(invoice.displayNumber, 200, currentY)
        .font("Regular");
    currentY += 15;
    doc
        .text(`${(0, i18next_1.t)("invoice-date", "Invoice date")}:`, 50, currentY)
        .text(invoice.created_at.toLocaleDateString(), 200, currentY);
    if (invoice.kidNumber) {
        currentY += 15;
        doc
            .font("Regular")
            .text(`${(0, i18next_1.t)("kid-number", "KID")}:`, 50, currentY)
            .font("Bold")
            .text(invoice.kidNumber, 200, currentY);
    }
    if (invoice.dueDate) {
        currentY += 15;
        doc
            .font("Regular")
            .text(`${(0, i18next_1.t)("due-date", "Due Date")}:`, 50, currentY)
            .font("Bold")
            .text(invoice.dueDate.toLocaleDateString(), 200, currentY);
    }
    if (invoiceSettings?.bankAccount) {
        currentY += 15;
        doc
            .font("Regular")
            .text(`${(0, i18next_1.t)("bank-account", "Bank Account")}:`, 50, currentY)
            .font("Bold")
            .text(invoiceSettings.bankAccount, 200, currentY);
    }
    if (invoiceSettings?.organizationNumber) {
        currentY += 15;
        doc
            .font("Regular")
            .text(`${(0, i18next_1.t)("organization-number", "Organization Number")}:`, 50, currentY)
            .font("Bold")
            .text(invoiceSettings.organizationNumber, 200, currentY);
    }
    doc.moveDown();
    return currentY + 15;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2ljZS1pbmZvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZG9jdW1lbnRzL3NlcnZpY2VzL3RlbXBsYXRlcy9pbnZvaWNlcy9iYXNpYy9wYXJ0cy9pbnZvaWNlLWluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7O0FBTUgsZ0VBOERDO0FBakVELDZCQUFrQztBQUNsQyxxQ0FBNEI7QUFFNUIsU0FBZ0IsMEJBQTBCLENBQUMsR0FBRyxFQUFFLENBQVMsRUFBRSxPQUEyQixFQUFFLFFBQThCLEVBQUUsZUFBNEM7SUFDbEssR0FBRztTQUNBLFNBQVMsQ0FBQyxTQUFTLENBQUM7U0FDcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQztTQUNaLElBQUksQ0FBQyxJQUFBLFdBQUMsRUFBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUU3QyxJQUFBLGVBQVUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBRXhCLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyQyxJQUFJLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQztJQUVyQyxHQUFHO1NBQ0EsUUFBUSxDQUFDLEVBQUUsQ0FBQztTQUNaLElBQUksQ0FBQyxHQUFHLElBQUEsV0FBQyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDO1NBQy9ELElBQUksQ0FBQyxNQUFNLENBQUM7U0FDWixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDO1NBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUVsQixRQUFRLElBQUksRUFBRSxDQUFDO0lBQ2YsR0FBRztTQUNBLElBQUksQ0FBQyxHQUFHLElBQUEsV0FBQyxFQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUM7U0FDM0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFL0QsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEIsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUNmLEdBQUc7YUFDQSxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ2YsSUFBSSxDQUFDLEdBQUcsSUFBQSxXQUFDLEVBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQzthQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNwQixRQUFRLElBQUksRUFBRSxDQUFDO1FBQ2YsR0FBRzthQUNBLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDZixJQUFJLENBQUMsR0FBRyxJQUFBLFdBQUMsRUFBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDO2FBQ25ELElBQUksQ0FBQyxNQUFNLENBQUM7YUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsSUFBSSxlQUFlLEVBQUUsV0FBVyxFQUFFLENBQUM7UUFDakMsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUNmLEdBQUc7YUFDQSxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ2YsSUFBSSxDQUFDLEdBQUcsSUFBQSxXQUFDLEVBQUMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQzthQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxJQUFJLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxDQUFDO1FBQ3hDLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDZixHQUFHO2FBQ0EsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUNmLElBQUksQ0FBQyxHQUFHLElBQUEsV0FBQyxFQUFDLHFCQUFxQixFQUFFLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDO2FBQ3pFLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDWixJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRWYsT0FBTyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLENBQUMifQ==