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
exports.GET = exports.POST = void 0;
const documents_1 = require("../../../../modules/documents");
const utils_1 = require("@medusajs/framework/utils");
const utils_2 = require("@medusajs/framework/utils");
const assign_invoice_1 = __importDefault(require("../../../../workflows/assign-invoice"));
const POST = async (req, res) => {
    const documentsModuleService = req.scope.resolve(documents_1.DOCUMENTS_MODULE);
    const orderModuleService = req.scope.resolve(utils_1.Modules.ORDER);
    const query = req.scope.resolve(utils_2.ContainerRegistrationKeys.QUERY);
    try {
        const body = req.body;
        const order = await orderModuleService.retrieveOrder(body.order_id, {
            select: ['*', 'item_total', 'shipping_total', 'tax_total'],
            relations: ['shipping_address', 'billing_address', 'items']
        });
        if (order) {
            /* 1 ─ look for an existing linked invoice */
            const { data: [orderWithInvoice], } = await query.graph({
                entity: 'order',
                filters: { id: [order.id] },
                fields: ['document_invoice.*'],
            });
            let result;
            if (orderWithInvoice?.document_invoice) {
                /* 1a ─ reuse existing invoice, include buffer */
                result = await documentsModuleService.getInvoice(order, orderWithInvoice.document_invoice.id, true);
            }
            else {
                /* 1b ─ create a fresh one */
                result = await documentsModuleService.generateInvoiceForOrder(order);
                await (0, assign_invoice_1.default)(req.scope).run({
                    input: {
                        orderId: order.id,
                        newInvoiceId: result.invoice.id,
                        oldInvoiceId: undefined,
                    },
                });
            }
            res.status(201).json(result);
        }
    }
    catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};
exports.POST = POST;
const GET = async (req, res) => {
    const documentsModuleService = req.scope.resolve(documents_1.DOCUMENTS_MODULE);
    const orderId = req.query.orderId;
    const includeBuffer = req.query.includeBuffer;
    try {
        const query = req.scope.resolve(utils_2.ContainerRegistrationKeys.QUERY);
        const { data: [orderWithInvoice], } = await query.graph({
            entity: "order",
            filters: {
                id: [
                    orderId
                ]
            },
            fields: [
                "document_invoice.*",
            ],
        });
        if (orderWithInvoice.document_invoice && orderId) {
            const orderModuleService = req.scope.resolve(utils_1.Modules.ORDER);
            const orderDto = await orderModuleService.retrieveOrder(orderId, {
                select: ['*', 'item_total', 'shipping_total', 'tax_total'],
                relations: ['shipping_address', 'billing_address', 'items']
            });
            const result = await documentsModuleService.getInvoice(orderDto, orderWithInvoice.document_invoice.id, includeBuffer !== undefined);
            res.status(200).json(result);
        }
        else {
            const result = {
                invoice: undefined
            };
            res.status(200).json(result);
        }
    }
    catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2RvY3VtZW50cy9pbnZvaWNlL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOzs7Ozs7QUFTSCw2REFBZ0U7QUFDaEUscURBQW9EO0FBQ3BELHFEQUFzRTtBQUN0RSwwRkFBK0U7QUFHeEUsTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUN2QixHQUFrQixFQUNsQixHQUFtQixFQUNuQixFQUFFO0lBRUYsTUFBTSxzQkFBc0IsR0FBMkIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsNEJBQWdCLENBQUMsQ0FBQTtJQUMxRixNQUFNLGtCQUFrQixHQUF3QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDL0QsZUFBTyxDQUFDLEtBQUssQ0FDZCxDQUFDO0lBQ0YsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFaEUsSUFBSSxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQVEsR0FBRyxDQUFDLElBQVcsQ0FBQztRQUNsQyxNQUFNLEtBQUssR0FBYSxNQUFNLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzVFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDO1lBQzFELFNBQVMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLE9BQU8sQ0FBQztTQUM1RCxDQUFDLENBQUE7UUFDRixJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ1YsNkNBQTZDO1lBQzdDLE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUN6QixHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDcEIsTUFBTSxFQUFF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