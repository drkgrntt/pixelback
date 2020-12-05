import DataLoader from 'dataloader'
import { In } from 'typeorm'
import { Genre } from '../entities/Genre'

export const createGenreLoader = () => {
  return new DataLoader<string, Genre>(async (genreIds) => {
    const genres = await Genre.find({
      where: {
        id: In(genreIds as string[]),
      },
    })

    const genreMap = genres.reduce((map, genre) => {
      map[genre.id] = genre
      return map
    }, {} as Record<string, Genre>)

    const sortedGenres = genreIds.map((id) => genreMap[id])

    return sortedGenres
  })
}
