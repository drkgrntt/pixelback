import DataLoader from 'dataloader'
import { Comment } from '../entities/Comment'
import { In } from 'typeorm'

export const createCommentIdsByChapterLoader = () => {
  return new DataLoader<string, string[]>(async (chapterIds) => {
    const comments = await Comment.find({
      select: ['id', 'chapterId'],
      where: {
        chapterId: In(chapterIds as string[]),
      },
    })

    // Essentially is of type Record<chapterId: commentId[]>
    const commentIdsMap = comments.reduce((map, comment) => {
      map[comment.chapterId] = comments
        .filter((c) => comment.chapterId === c.chapterId)
        .map((c) => c.id)
      return map
    }, {} as Record<string, string[]>)

    const sortedCommentIds = chapterIds.map(
      (id) => commentIdsMap[id] || []
    )

    return sortedCommentIds
  })
}
