import DataLoader from 'dataloader'
import { Story } from '../entities/Story'

export const createStoryLoader = () => {
  return new DataLoader<string, Story>(async (storyIds) => {
    const stories = await Story.findByIds(storyIds as string[])
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
