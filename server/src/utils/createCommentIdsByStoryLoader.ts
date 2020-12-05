import DataLoader from 'dataloader'
import { Comment } from '../entities/Comment'
import { In } from 'typeorm'

export const createCommentIdsByStoryLoader = () => {
  return new DataLoader<string, string[]>(async (storyIds) => {
    const comments = await Comment.find({
      select: ['id', 'storyId'],
      where: {
        storyId: In(storyIds as string[]),
      },
    })

    // Essentially is of type Record<storyId: commentId[]>
    const commentIdsMap = comments.reduce((map, comment) => {
      map[comment.storyId] = comments
        .filter((ch) => comment.storyId === ch.storyId)
        .map((ch) => ch.id)
      return map
    }, {} as Record<string, string[]>)

    const sortedCommentIds = storyIds.map(
      (id) => commentIdsMap[id] || []
    )

    return sortedCommentIds
  })
}
