import prismaClient from "../../prisma";

interface ItemRequest {
  order_id: string;
  product_id: string;
  amount: number;
}

class AddItemService {
  async execute({ order_id, product_id, amount }: ItemRequest) {
    const order = await prismaClient.item.create({
      data: {
        order_id,
        product_id,
        amount
      },
      select: {
        id: true,
        amount: true,
        product_id: true,
        order_id: true,
      }
    })

    return order;
  }
}

export { AddItemService };