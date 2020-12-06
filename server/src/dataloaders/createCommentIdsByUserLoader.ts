import DataLoader from 'dataloader'
import { Comment } from '../entities/Comment'
import { In } from 'typeorm'

export const createCommentIdsByUserLoader = () => {
  return new DataLoader<string, string[]>(async (userIds) => {
    const comments = await Comment.find({
      select: ['id', 'authorId'],
      where: {
        authorId: In(userIds as string[]),
      },
    })

    // Essentially is of type Record<userId: commentId[]>
    const commentIdsMap = comments.reduce((map, comment) => {
      map[comment.authorId] = comments
        .filter((c) => comment.authorId === c.authorId)
        .map((c) => c.id)
      return map
    }, {} as Record<string, string[]>)

    const sortedCommentIds = userIds.map(
      (id) => commentIdsMap[id] || []
    )

    return sortedCommentIds
  })
}
