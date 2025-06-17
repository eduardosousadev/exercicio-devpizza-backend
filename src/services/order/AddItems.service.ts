import prismaClient from "../../prisma";

type ItemProps = {
  order_id: string;
  product_id: string;
  amount: number;
}

class AddItemsService {
  async execute(data: ItemProps[]) {
    const itens = await prismaClient.item.createMany({
      data
    })

    return itens;
  }
}

export { AddItemsService };