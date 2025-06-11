import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategory.service";

class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const createCategoryService = new CreateCategoryService();
    const category = await createCategoryService.execute({
      name: req.body.name
    });

    res.json(category);
  }
}

export { CreateCategoryController }