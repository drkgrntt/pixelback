import DataLoader from 'dataloader'
import { Rating } from '../entities/Rating'
import { In } from 'typeorm'

export const createRatingIdsByUserLoader = () => {
  return new DataLoader<string, string[]>(async (readerIds) => {
    const ratings = await Rating.find({
      select: ['id', 'readerId'],
      where: {
        readerId: In(readerIds as string[]),
      },
    })

    // Essentially is of type Record<readerId: ratingId[]>
    const ratingIdsMap = ratings.reduce((map, rating) => {
      map[rating.readerId] = ratings
        .filter((r) => rating.readerId === r.readerId)
        .map((r) => r.id)
      return map
    }, {} as Record<string, string[]>)

    const sortedRatingIds = readerIds.map(
      (id) => ratingIdsMap[id] || []
    )

    return sortedRatingIds
  })
}
