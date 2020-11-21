import { useState } from 'react'
import styles from './New.module.scss'
import Card from '../../../components/Card'
import StoryForm from '../../../components/StoryForm'
import { useCreateStoryMutation } from '../../../hooks/useCreateStoryMutation'
import { useUpdateStoryMutation } from '../../../hooks/useUpdateStoryMutation'
import { Genre, PublishStatus, Story } from '../../../types'
import { useRouter } from 'next/router'

const New: React.FC<{}> = () => {

  const { push } = useRouter()
  const [createStory] = useCreateStoryMutation()
  const [updateStory] = useUpdateStoryMutation()
  const [story, setStory] = useState<Story | undefined>()

  const save = async (formState: any) => {
    formState.values.status = formState.values.publish
      ? PublishStatus.Published
      : PublishStatus.Draft
    formState.values.genreIds = formState.values.genres.map((g: Genre) => g.id)

    try {
      let result: Record<string, any>
      let updatedStory: Story
      if (story) {
        result = await updateStory({ variables: formState.values })
        updatedStory = result.data.updateStory
      } else {
        result = await createStory({ variables: formState.values })
        updatedStory = result.data.createStory
      }
      setStory(updatedStory)
      return updatedStory
    } catch (error) {
      console.warn(error)
      formState.setValues({
        ...formState.values,
        validation: error.message
      })
      return null
    }
  }

  const handleSubmit = async (formState: any) => {
    const story = await save(formState)
    if (!story) return
    push(`/stories/${story.id}`)
  }

  return (
    <div>
      <h2>New Story</h2>
      <Card>
        <StoryForm
          story={story}
          autoSave={save}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  )
}

export default New
