import DataLoader from 'dataloader'
import { In } from 'typeorm'
import { Comment } from '../entities/Comment'

export const createCommentLoader = () => {
  return new DataLoader<string, Comment>(async (commentIds) => {
    const comments = await Comment.find({
      where: {
        id: In(commentIds as string[]),
      },
    })

    const commentMap = comments.reduce((map, comment) => {
      map[comment.id] = comment
      return map
    }, {} as Record<string, Comment>)

    const sortedComments = commentIds.map((id) => commentMap[id])

    return sortedComments
  })
}
