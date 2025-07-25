import { Request, Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategory.service";

class ListCategoryController {
  async handle(req: Request, res: Response) {
    const listCategoryService = new ListCategoryService();
    const category = await listCategoryService.execute();

    res.json(category);
  }
}

export { ListCategoryController };