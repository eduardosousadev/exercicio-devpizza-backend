import { Request, Response } from "express";
import { AddItemsService } from "../../services/order/AddItems.service";

class AddItemsController {
  async handle(req: Request, res: Response) {
    if (!Array.isArray(req.body)) {
      res.status(400).json({ error: "Envie um array de itens" });
      return;
    }

    const addItemsService = new AddItemsService();

    try {
      const itens = await addItemsService.execute(req.body);
      res.json(itens);
    } catch (error) {
      console.error("ERRO AO ADICIONAR ITENS: ", error);
      res.status(400).json({ error: "Erro ao adicionar itens!" });
    }
  }
}

export { AddItemsController };