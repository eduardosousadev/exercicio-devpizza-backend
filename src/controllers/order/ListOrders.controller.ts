import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrders.service";

class ListOrdersController {
  async handle(req: Request, res: Response) {
    const listOrdersService = new ListOrdersService();
    const orders = await listOrdersService.execute();

    res.json(orders)
  }
}

export { ListOrdersController };