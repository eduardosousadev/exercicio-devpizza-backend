import { Request, Response } from "express";
import { DetailsOrderService } from "../../services/order/DetailsOrder.service";

class DetailsOrderController {
  async handle(req: Request, res: Response): Promise<void> {
    const order_id = req.query.order_id as string;

    const detailsOrderService = new DetailsOrderService();
    const details = await detailsOrderService.execute({
      order_id
    });

    res.json({ details });
  }
}

export { DetailsOrderController };