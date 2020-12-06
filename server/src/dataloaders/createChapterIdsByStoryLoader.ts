import DataLoader from 'dataloader'
import { Chapter } from '../entities/Chapter'
import { In } from 'typeorm'

export const createChapterIdsByStoryLoader = () => {
  return new DataLoader<string, string[]>(async (storyIds) => {
    const chapters = await Chapter.find({
      select: ['id', 'storyId'],
      where: {
        storyId: In(storyIds as string[]),
      },
    })

    // Essentially is of type Record<storyId: chapterId[]>
    const chapterIdsMap = chapters.reduce((map, chapter) => {
      map[chapter.storyId] = chapters
        .filter((ch) => chapter.storyId === ch.storyId)
        .map((ch) => ch.id)
      return map
    }, {} as Record<string, string[]>)

    const sortedChapterIds = storyIds.map(
      (id) => chapterIdsMap[id] || []
    )

    return sortedChapterIds
  })
}
