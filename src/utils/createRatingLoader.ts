import DataLoader from 'dataloader'
import { In } from 'typeorm'
import { Rating } from '../entities/Rating'

export const createRatingLoader = () => {
  return new DataLoader<{ storyId: string, chapterId?: string }, Rating>(async keys => {
    const storyIds = keys.map(key => key.storyId)
    const chapterIds = keys.map(key => key.chapterId)
    const ratings = await Rating.find({ where: { storyId: In(storyIds), chapterId: In(chapterIds) } })
    const ratingIdToRating: Record<string, Rating> = {}
    ratings.forEach(rating => {
      const key = `${rating.storyId}|${rating.chapterId}`
      ratingIdToRating[key] = rating
    })

    const sortedRatings = keys.map(key => ratingIdToRating[`${key.storyId}|${key.chapterId}`])

    return sortedRatings
  })
}
