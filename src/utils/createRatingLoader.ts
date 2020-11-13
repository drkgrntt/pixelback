import DataLoader from 'dataloader'
import { Rating } from '../entities/Rating'

export const createRatingLoader = () => {
  return new DataLoader<{ readerId: string, storyId: string, chapterId: string|null }, Rating | null>(async keys => {
    const ratings = await Rating.findByIds(keys as any[])
    const ratingIdToRating: Record<string, Rating> = {}
    ratings.forEach(rating => {
      const key = `${rating.readerId}|${rating.storyId}|${rating.chapterId}`
      ratingIdToRating[key] = rating
    })

    const sortedRatings = keys.map(key => ratingIdToRating[`${key.readerId}|${key.storyId}|${key.chapterId}`])
    
    return sortedRatings
  })
}
