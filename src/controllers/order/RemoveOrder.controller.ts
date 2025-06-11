import { Request, Response } from "express";
import { RemoveOrderService } from "../../services/order/RemoveOrder.service";

class RemoveOrderController {
  async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string;

    const removeOrder = new RemoveOrderService();
    const order = await removeOrder.execute({
      order_id
    });

    res.json({
      message: 'Mesa removida com sucesso!',
      order
    });
  }
}

export { RemoveOrderController };