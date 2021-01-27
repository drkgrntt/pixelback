import DataLoader from 'dataloader'
import { Rating } from '../entities/Rating'
import { In } from 'typeorm'

export const createRatingIdsByChapterLoader = () => {
  return new DataLoader<string, string[]>(async (chapterIds) => {
    const ratings = await Rating.find({
      select: ['id', 'chapterId'],
      where: {
        chapterId: In(chapterIds as string[]),
      },
    })

    // Essentially is of type Record<chapterId: ratingId[]>
    const ratingIdsMap = ratings.reduce((map, rating) => {
      map[rating.chapterId] = ratings
        .filter((r) => rating.chapterId === r.chapterId)
        .map((r) => r.id)
      return map
    }, {} as Record<string, string[]>)

    const sortedRatingIds = chapterIds.map(
      (id) => ratingIdsMap[id] || []
    )

    return sortedRatingIds
  })
}
