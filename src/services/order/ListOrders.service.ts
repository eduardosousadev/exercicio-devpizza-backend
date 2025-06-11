import prismaClient from "../../prisma";

class ListOrdersService {
  async execute() {
    const orders = await prismaClient.order.findMany({
      where: {
        draft: false,
        status: false
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        table: true,
        status: true,
        draft: true,
        name: true
      }    
    })

    const filteredOrders = orders.map(order => {
      if(order.name === null) {
        const { name, ...newOrder } = order;
        return newOrder;
      }

      return order;
    })

    return filteredOrders;
  }
}

export { ListOrdersService };