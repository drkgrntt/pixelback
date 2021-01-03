import { ParsedUrlQuery } from 'querystring'
import { NextPage } from 'next'
import Error from 'next/error'
import styles from './Edit.module.scss'
import Card from '@/components/Card'
import ContentForm from '@/components/ContentForm'
import { useUpdateStoryMutation } from '@/mutations/useUpdateStoryMutation'
import { useStoryQuery } from '@/queries/useStoryQuery'
import { PublishStatus } from '@/types'
import { useRouter } from 'next/router'
import { useMeQuery } from '@/hooks/queries/useMeQuery'
import { useIsAuth } from '@/hooks/useIsAuth'
import Loader from '@/components/Loader'
import { withApollo } from '@/utils/withApollo'

interface Props {
  query: ParsedUrlQuery
}

const Edit: NextPage<Props> = ({ query }) => {
  const { push } = useRouter()
  const [updateStory] = useUpdateStoryMutation()
  const meResult = useMeQuery()
  const variables = { id: query.storyId as string }
  const storyResult = useStoryQuery({
    variables,
    skip: !query.storyId,
  })
  const story = storyResult.data?.story
  useIsAuth()

  if (meResult.loading || storyResult.loading) {
    return <Loader />
  }

  if (!story) {
    return <Error statusCode={404} />
  }

  if (meResult.data?.me?.id !== story.authorId) {
    return <Error statusCode={403} />
  }

  const save = async (formState: any) => {
    formState.values.status = formState.values.publish
      ? PublishStatus.Published
      : PublishStatus.Draft

    try {
      const result = await updateStory({
        variables: formState.values,
      })
      const updatedStory = result.data.updateStory
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

  return (
    <div className={styles.edit}>
      <h2>Edit Story</h2>
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

Edit.getInitialProps = ({ query }) => {
  return { query }
}

export default withApollo({ ssr: false })(Edit)
