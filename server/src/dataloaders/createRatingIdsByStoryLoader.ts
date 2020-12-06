import DataLoader from 'dataloader'
import { In } from 'typeorm'
import { Rating } from '../entities/Rating'

interface LoaderKey {
  storyId: string
  exclusive?: boolean
}

export const createRatingIdsByStoryLoader = () => {
  return new DataLoader<LoaderKey, string[]>(async (loaderKeys) => {
    const storyIds = [
      ...new Set(loaderKeys.map((key) => key.storyId)),
    ]
    const ratings = await Rating.find({
      select: ['id', 'storyId', 'chapterId'],
      where: {
        storyId: In(storyIds),
      },
    })

    const ratingIdsMap = ratings.reduce((map, rating) => {
      map[`${rating.storyId}:inclusive`] = ratings
        .filter((r) => rating.storyId === r.storyId)
        .map((r) => r.id)
      map[`${rating.storyId}:exclusive`] = ratings
        .filter(
          (r) => rating.storyId === r.storyId && r.chapterId === null
        )
        .map((r) => r.id)
      return map
    }, {} as Record<string, string[]>)

    const sortedRatings = loaderKeys.map((loaderKey) => {
      return ratingIdsMap[
        `${loaderKey.storyId}:${
          loaderKey.exclusive ? 'exclusive' : 'inclusive'
        }`
      ]
    })

    return sortedRatings
  })
}
