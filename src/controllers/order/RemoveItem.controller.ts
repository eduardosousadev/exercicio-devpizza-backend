import{ Request, Response } from "express";
import { RemoveItemService } from "../../services/order/RemoveItem.service";

class RemoveItemController {
 async handle(req: Request, res: Response) {
  const item_id = req.query.item_id as string;

  const removeItemService = new RemoveItemService();
  const order = await removeItemService.execute({
    item_id
  })

  res.json({
    message: 'Item removido do pedido com sucesso!',
    order
  })
 }
}

export { RemoveItemController };