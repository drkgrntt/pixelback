import DataLoader from 'dataloader'
import { PublishStatus } from '../types'
import { Chapter } from '../entities/Chapter'

export const createChapterLoader = () => {
  return new DataLoader<string, Chapter>(async (chapterIds) => {
    const query = {
      where: {
        status: PublishStatus.Published,
      },
    }
    const chapters = await Chapter.findByIds(
      chapterIds as string[],
      query
    )
    const chapterIdToChapter: Record<string, Chapter> = {}
    chapters.forEach((chapter) => {
      chapterIdToChapter[chapter.id] = chapter
    })

    const sortedChapters = chapterIds.map(
      (chapterId) => chapterIdToChapter[chapterId]
    )

    return sortedChapters
  })
}
