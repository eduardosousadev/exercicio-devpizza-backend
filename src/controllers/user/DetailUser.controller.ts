import { Request, Response } from "express";
import { DetailsUserService } from "../../services/user/DetailsUser.service";     

class DetailUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const detailUserService =  new DetailsUserService();
    const user = await detailUserService.execute(user_id);

    res.json(user);
  }
}

export { DetailUserController }