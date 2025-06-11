import prismaClient from "../../prisma";

export class GetAllUsersService {
  async execute() {
    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        name: true,
        email: true        
      }
    })

    return users;
  }
}