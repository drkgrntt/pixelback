import DataLoader from 'dataloader'
import { In } from 'typeorm'
import { Story } from '../entities/Story'

export const createStoryLoader = () => {
  return new DataLoader<string, Story>(async (storyIds) => {
    const stories = await Story.find({
      where: {
        id: In(storyIds as string[]),
      },
    })

    const storyMap = stories.reduce((map, story) => {
      map[story.id] = story
      return map
    }, {} as Record<string, Story>)

    const sortedStories = storyIds.map((storyId) => storyMap[storyId])

    return sortedStories
  })
}
