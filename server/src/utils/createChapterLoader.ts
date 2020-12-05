import DataLoader from 'dataloader'
import { In } from 'typeorm'
import { Chapter } from '../entities/Chapter'

export const createChapterLoader = () => {
  return new DataLoader<string, Chapter>(async (chapterIds) => {
    const chapters = await Chapter.find({
      where: {
        id: In(chapterIds as string[]),
      },
    })

    const chapterMap = chapters.reduce((map, chapter) => {
      map[chapter.id] = chapter
      return map
    }, {} as Record<string, Chapter>)

    const sortedChapters = chapterIds.map((id) => chapterMap[id])

    return sortedChapters
  })
}
