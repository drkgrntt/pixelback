import DataLoader from 'dataloader'
import { FavoriteStory } from '../entities/FavoriteStory'
import { In } from 'typeorm'

export const createFavoriteStoryIdsLoader = () => {
  return new DataLoader<string, string[]>(async (userIds) => {
    const favoriteStories = await FavoriteStory.find({
      select: ['id', 'userId', 'storyId'],
      where: {
        userId: In(userIds as string[]),
      },
    })

    // Essentially is of type Record<userId: storyId[]>
    const userIdsMap = favoriteStories.reduce(
      (map, favoriteStory) => {
        map[favoriteStory.userId] = favoriteStories
          .filter((fs) => favoriteStory.userId === fs.userId)
          .map((fs) => fs.userId)
        return map
      },
      {} as Record<string, string[]>
    )

    const sortedStoryIds = userIds.map(
      (userId) => userIdsMap[userId] || []
    )

    return sortedStoryIds
  })
}
