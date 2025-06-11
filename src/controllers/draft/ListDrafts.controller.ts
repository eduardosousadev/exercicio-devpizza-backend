import { Request, Response } from "express";
import { ListDraftsService } from "../../services/draft/ListDrafts.service";

class ListDraftsController {
  async handle(req: Request, res: Response) {
    const listDraftsService = new ListDraftsService();
    const drafts = await listDraftsService.execute();

    if (drafts.length === 0) {
      res.json({
        message: "Nenhum rascunho encontrado!",
        drafts
      });
      return;
    }

    res.json(drafts)
  }
}

export { ListDraftsController };

