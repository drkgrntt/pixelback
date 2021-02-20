import { NextPage } from 'next'
import { useState } from 'react'
import styles from './New.module.scss'
import AuthorshipForm from '@/components/AuthorshipForm'
import Card from '@/components/Card'
import ContentForm from '@/components/ContentForm'
import {
  useMeQuery,
  useUpdateStoryMutation,
  useCreateStoryMutation,
  PublishStatus,
  Story,
  UserRole,
} from '@pixelback/shared'
import { useRouter } from 'next/router'
import { useIsAuth } from '@/hooks/useIsAuth'
import Loader from '@/components/Loader'
import { withApollo } from '@/utils/withApollo'
import Modal from '@/components/Modal'
import CreditCardForm from '@/components/CreditCardForm'
import GenreList from '@/components/GenreList'

const New: NextPage<{}> = () => {
  const { push } = useRouter()
  const [createStory] = useCreateStoryMutation()
  const [updateStory] = useUpdateStoryMutation()
  const [story, setStory] = useState<Story | undefined>()
  const { data } = useMeQuery()
  const { loading } = useIsAuth()

  if (loading) {
    return <Loader />
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
    push(`/stories/${story.id}/dashboard`)
  }

  if (
    data?.me?.role < UserRole.Author &&
    data?.me?.stories.length >= 10
  ) {
    return (
      <Card>
        <h2>Great work!</h2>
        <p>
          You are on a roll! You have reached the free limit of
          stories. Please upgrade to Author status to write more
          stories.
        </p>
        <AuthorshipForm />
        <Modal
          buttonText="Use a different card"
          className={styles.cardModal}
        >
          <h3>Add new card</h3>
          <CreditCardForm />
        </Modal>
      </Card>
    )
  }

  return (
    <div className={styles.new}>
      <h2>New Story</h2>
      <Card>
        <ContentForm
          content={story}
          autoSave={save}
          onSubmit={handleSubmit}
        />
      </Card>
      <Card>
        <GenreList story={story} />
      </Card>
    </div>
  )
}

export default withApollo({ ssr: false })(New)
