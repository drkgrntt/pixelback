import DataLoader from 'dataloader'
import { Story } from '../entities/Story'
import { In } from 'typeorm'

export const createStoryIdsByUserLoader = () => {
  return new DataLoader<string, string[]>(async (authorIds) => {
    const stories = await Story.find({
      select: ['id', 'authorId'],
      where: {
        authorId: In(authorIds as string[]),
      },
    })

    // Essentially is of type Record<authorId: storyId[]>
    const storyIdsMap = stories.reduce((map, story) => {
      map[story.authorId] = stories
        .filter((ch) => story.authorId === ch.authorId)
        .map((ch) => ch.id)
      return map
    }, {} as Record<string, string[]>)

    const sortedStoryIds = authorIds.map(
      (id) => storyIdsMap[id] || []
    )

    return sortedStoryIds
  })
}
