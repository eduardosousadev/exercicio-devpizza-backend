import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrder.service";
import { ListDraftsService } from "../../services/draft/ListDrafts.service";
import { ListOrdersService } from "../../services/order/ListOrders.service";

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { table, name } = req.body;

    const listDraftsService = new ListDraftsService();
    const listOrdersService = new ListOrdersService();
    const drafts = await listDraftsService.execute();
    const orders = await listOrdersService.execute();

    const findOrder = orders.find(order => order.table === table);
    console.log(findOrder)
    if(findOrder) {
      res.json({
        message: "Já existe um rascunho para esta mesa!",
        details: findOrder
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