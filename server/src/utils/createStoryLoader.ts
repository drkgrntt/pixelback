import DataLoader from 'dataloader'
import { PublishStatus } from '../types'
import { Story } from '../entities/Story'

export const createStoryLoader = () => {
  return new DataLoader<string, Story>(async (storyIds) => {
    const query = {
      where: {
        status: PublishStatus.Published,
      },
    }
    const stories = await Story.findByIds(storyIds as string[], query)
    const storyIdToStory: Record<string, Story> = {}
    stories.forEach((story) => {
      storyIdToStory[story.id] = story
    })

    const sortedStories = storyIds.map(
      (storyId) => storyIdToStory[storyId]
    )

    return sortedStories
  })
}
