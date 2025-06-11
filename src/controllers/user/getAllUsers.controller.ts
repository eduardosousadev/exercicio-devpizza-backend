import { Request, Response } from "express";
import { GetAllUsersService } from "../../services/user/GetAllUsers.service";

export class GetAllUsersController {
  async handle(req: Request, res: Response) {
    const getAllUsersService = new GetAllUsersService();
    const users = await getAllUsersService.execute();

    res.json({ users });
  }
}