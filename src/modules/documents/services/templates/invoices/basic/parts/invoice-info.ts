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

import { DocumentInvoiceDTO, DocumentSettingsDTO, DocumentInvoiceSettingsDTO } from "../../../../../../../modules/documents/types/dto";
import { generateHr } from "./hr";
import { t } from "i18next";

export function generateInvoiceInformation(doc, y: number, invoice: DocumentInvoiceDTO, settings?: DocumentSettingsDTO, invoiceSettings?: DocumentInvoiceSettingsDTO): number {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text(t("invoice", "Invoice"), 50, y + 40);

  generateHr(doc, y + 65);

  const invoiceInformationTop = y + 80;
  let currentY = invoiceInformationTop;

  doc
    .fontSize(10)
    .text(`${t("invoice-number", "Invoice number")}:`, 50, currentY)
    .font("Bold")
    .text(invoice.displayNumber, 150, currentY)
    .font("Regular")

  currentY += 15;
  doc
    .text(`${t("invoice-date", "Invoice date")}:`, 50, currentY)
    .text(invoice.created_at.toLocaleDateString(), 150, currentY)

  if (invoice.kidNumber) {
    currentY += 15;
    doc
      .font("Regular")
      .text(`${t("kid-number", "KID")}:`, 50, currentY)
      .font("Bold")
      .text(invoice.kidNumber, 150, currentY);
  }

  if (invoice.dueDate) {
    currentY += 15;
    doc
      .font("Regular")
      .text(`${t("due-date", "Due Date")}:`, 50, currentY)
      .font("Bold")
      .text(invoice.dueDate.toLocaleDateString(), 150, currentY);
  }

  if (invoiceSettings?.bankAccount) {
    currentY += 15;
    doc
      .font("Regular")
      .text(`${t("bank-account", "Bank Account")}:`, 50, currentY)
      .font("Bold")
      .text(invoiceSettings.bankAccount, 150, currentY);
  }

  doc.moveDown();

  return currentY + 15;
}