"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailsOrderController = void 0;
const DetailsOrder_service_1 = require("../../services/order/DetailsOrder.service");
class DetailsOrderController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const order_id = req.query.order_id;
            const detailsOrderService = new DetailsOrder_service_1.DetailsOrderService();
            const details = yield detailsOrderService.execute({
                order_id
            });
            res.json({ details });
        });
    }
}
exports.DetailsOrderController = DetailsOrderController;
