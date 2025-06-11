import prismaClient from "../../prisma"; 

class ListDraftsService {
  async execute() {
    const drafts = await prismaClient.order.findMany({
      where: {
        draft: true,
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

    const filteredDrafts = drafts.map(draft => {
      if(draft.name === null) {
        const { name, ...newDraft } = draft;
        return newDraft;
      }

      return draft;
    })

    return filteredDrafts;
  }
}

export { ListDraftsService };