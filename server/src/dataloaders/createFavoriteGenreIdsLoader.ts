import DataLoader from 'dataloader'
import { FavoriteGenre } from '../entities/FavoriteGenre'
import { In } from 'typeorm'

export const createFavoriteGenreIdsLoader = () => {
  return new DataLoader<string, string[]>(async (userIds) => {
    const favoriteStories = await FavoriteGenre.find({
      select: ['id', 'userId', 'genreId'],
      where: {
        userId: In(userIds as string[]),
      },
    })

    // Essentially is of type Record<userId: genreId[]>
    const userIdsMap = favoriteStories.reduce(
      (map, favoriteGenre) => {
        map[favoriteGenre.userId] = favoriteStories
          .filter((fg) => favoriteGenre.userId === fg.userId)
          .map((fg) => fg.userId)
        return map
      },
      {} as Record<string, string[]>
    )

    const sortedGenreIds = userIds.map(
      (userId) => userIdsMap[userId] || []
    )

    return sortedGenreIds
  })
}
