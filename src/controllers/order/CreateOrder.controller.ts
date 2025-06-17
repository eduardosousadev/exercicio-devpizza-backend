import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrder.service";
import { FindDraftOrderByTableService } from "../../services/draft/FindDraftOrderByTable.service";
import { FindOpenOrderByTableService } from "../../services/order/FindOpenOrderByTable.service";

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { table, name } = req.body;

    const findOpenOrderByTableService = new FindOpenOrderByTableService();
    const findDraftOrderByTableService = new FindDraftOrderByTableService();
    const existingOpenOrder = await findOpenOrderByTableService.execute(table);
    const existingDraft = await findDraftOrderByTableService.execute(table);

    if(existingOpenOrder) {
      res.status(400).json({
        message: "Essa mesa já está aberta!",
        details: existingOpenOrder
      });
      return;
    }

    if(existingDraft) {
      res.status(400).json({
        message: "Abertura dessa mesa em andamento!",
        details: existingDraft
      });
      return;
    }

    const createOrderService = new CreateOrderService();
    const order = await createOrderService.execute({
      table,
      name
    })

    res.json(order);
  }
}

export { CreateOrderController };