import DataLoader from 'dataloader'
import { StoryGenre } from '../entities/StoryGenre'
import { In } from 'typeorm'

export const createGenreIdsByStoryLoader = () => {
  return new DataLoader<string, string[]>(async (storyIds) => {
    const storyGenres = await StoryGenre.find({
      select: ['id', 'storyId', 'genreId'],
      where: {
        storyId: In(storyIds as string[]),
      },
    })

    // Essentially is of type Record<storyId: genreId[]>
    const genreIdsMap = storyGenres.reduce((map, storyGenre) => {
      map[storyGenre.storyId] = storyGenres
        .filter((sg) => storyGenre.storyId === sg.storyId)
        .map((sg) => sg.genreId)
      return map
    }, {} as Record<string, string[]>)

    const sortedGenreIds = storyIds.map((id) => genreIdsMap[id] || [])

    return sortedGenreIds
  })
}
