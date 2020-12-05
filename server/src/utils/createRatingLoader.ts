import DataLoader from 'dataloader'
import { In } from 'typeorm'
import { Rating } from '../entities/Rating'

export const createRatingLoader = () => {
  return new DataLoader<string, Rating>(async (ratingIds) => {
    const ratings = await Rating.find({
      where: {
        id: In(ratingIds as string[]),
      },
    })

    const ratingMap = ratings.reduce((map, rating) => {
      map[rating.id] = rating
      return map
    }, {} as Record<string, Rating>)

    const sortedRatings = ratingIds.map((id) => ratingMap[id])

    return sortedRatings
  })
}
