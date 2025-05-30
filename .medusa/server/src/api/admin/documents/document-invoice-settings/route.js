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
exports.POST = exports.GET = void 0;
const documents_1 = require("../../../../modules/documents");
const GET = async (req, res) => {
    const documentsModuleService = req.scope.resolve(documents_1.DOCUMENTS_MODULE);
    try {
        const lastDocumentInvoiceSettings = await documentsModuleService.listDocumentInvoiceSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        res.status(200).json({
            settings: lastDocumentInvoiceSettings && lastDocumentInvoiceSettings.length ? lastDocumentInvoiceSettings[0] : undefined
        });
    }
    catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};
exports.GET = GET;
const POST = async (req, res) => {
    const body = req.body;
    const formatNumber = body.formatNumber;
    const forcedNumber = body.forcedNumber;
    const invoiceTemplate = body.template;
    const bankAccount = body.bankAccount;
    const dueDays = body.dueDays;
    const documentsModuleService = req.scope.resolve(documents_1.DOCUMENTS_MODULE);
    try {
        const newSettings = await documentsModuleService.updateInvoiceSettings(formatNumber, forcedNumber, invoiceTemplate, bankAccount, dueDays);
        if (newSettings !== undefined) {
            res.status(201).json({
                settings: newSettings
            });
        }
        else {
            res.status(400).json({
                message: 'Cant update invoice settings'
            });
        }
    }
    catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2RvY3VtZW50cy9kb2N1bWVudC1pbnZvaWNlLXNldHRpbmdzL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOzs7QUFPSCw2REFBZ0U7QUFJekQsTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUN0QixHQUFrQixFQUNsQixHQUFtQixFQUNuQixFQUFFO0lBRUYsTUFBTSxzQkFBc0IsR0FBMkIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsNEJBQWdCLENBQUMsQ0FBQTtJQUUxRixJQUFJLENBQUM7UUFDSCxNQUFNLDJCQUEyQixHQUFHLE1BQU0sc0JBQXNCLENBQUMsMkJBQTJCLENBQUMsRUFBRSxFQUFFO1lBQy9GLEtBQUssRUFBRTtnQkFDTCxVQUFVLEVBQUUsTUFBTTthQUNuQjtZQUNELElBQUksRUFBRSxDQUFDO1NBQ1IsQ0FBQyxDQUFBO1FBQ0YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsUUFBUSxFQUFFLDJCQUEyQixJQUFJLDJCQUEyQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDekgsQ0FBQyxDQUFDO0lBRUwsQ0FBQztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDWCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU87U0FDbkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztBQUNILENBQUMsQ0FBQTtBQXZCWSxRQUFBLEdBQUcsT0F1QmY7QUFFTSxNQUFNLElBQUksR0FBRyxLQUFLLEVBQ3ZCLEdBQWtCLEVBQ2xCLEdBQW1CLEVBQ25CLEVBQUU7SUFFRixNQUFNLElBQUksR0FBUSxHQUFHLENBQUMsSUFBVyxDQUFDO0lBQ2xDLE1BQU0sWUFBWSxHQUF1QixJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNELE1BQU0sWUFBWSxHQUF1QixJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNELE1BQU0sZUFBZSxHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDO0lBQzFELE1BQU0sV0FBVyxHQUF1QixJQUFJLENBQUMsV0FBVyxDQUFDO0lBQ3pELE1BQU0sT0FBTyxHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ2pELE1BQU0sc0JBQXNCLEdBQTJCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLDRCQUFnQixDQUFDLENBQUE7SUFFMUYsSUFBSSxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQUcsTUFBTSxzQkFBc0IsQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGVBQXNDLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQ2hLLElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzlCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNuQixRQUFRLEVBQUUsV0FBVzthQUN0QixDQUFDLENBQUM7UUFDTCxDQUFDO2FBQU0sQ0FBQztZQUNOLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNuQixPQUFPLEVBQUUsOEJBQThCO2FBQ3hDLENBQUMsQ0FBQTtRQUNKLENBQUM7SUFHSCxDQUFDO0lBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNYLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTztTQUNuQixDQUFDLENBQUE7SUFDSixDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBL0JZLFFBQUEsSUFBSSxRQStCaEIifQ==