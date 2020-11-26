import { NextPage } from 'next'
import { useState } from 'react'
import Error from 'next/error'
import styles from './New.module.scss'
import Card from '@/components/Card'
import ContentForm from '@/components/ContentForm'
import { useCreateStoryMutation } from '@/mutations/useCreateStoryMutation'
import { useUpdateStoryMutation } from '@/mutations/useUpdateStoryMutation'
import { PublishStatus, Story } from '@/types'
import { useRouter } from 'next/router'
import { useMeQuery } from '@/hooks/queries/useMeQuery'

const New: NextPage<{}> = () => {
  const { push } = useRouter()
  const [createStory] = useCreateStoryMutation()
  const [updateStory] = useUpdateStoryMutation()
  const [story, setStory] = useState<Story | undefined>()
  const { data } = useMeQuery()

  if (!data?.me) {
    return <Error statusCode={403} />
  }

  const save = async (formState: any) => {
    formState.values.status = formState.values.publish
      ? PublishStatus.Published
      : PublishStatus.Draft

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
        validation: error.message,
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
        <ContentForm
          content={story}
          autoSave={save}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  )
}

export default New
