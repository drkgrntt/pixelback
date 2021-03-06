import { NextPage } from 'next'
import { useState } from 'react'
import { ParsedUrlQuery } from 'querystring'
import Error from 'next/error'
import styles from './New.module.scss'
import Card from '@/components/Card'
import Loader from '@/components/Loader'
import ContentForm from '@/components/ContentForm'
import {
  useMeQuery,
  useStoryQuery,
  useCreateChapterMutation,
  useUpdateChapterMutation,
  PublishStatus,
  Chapter,
} from '@pixelback/shared'
import { useRouter } from 'next/router'
import { useIsAuth } from '@/hooks/useIsAuth'
import { withApollo } from '@/utils/withApollo'

interface Props {
  query: ParsedUrlQuery
}

const New: NextPage<Props> = ({ query }) => {
  const { push } = useRouter()
  const [createChapter] = useCreateChapterMutation(
    query.storyId as string
  )
  const [updateChapter] = useUpdateChapterMutation()
  const [chapter, setChapter] = useState<Chapter | undefined>()
  const meResult = useMeQuery()
  const variables = { id: query.storyId as string }
  const storyResult = useStoryQuery({
    variables,
    skip: !query.storyId,
  })
  useIsAuth()

  if (meResult.loading || storyResult.loading) {
    return <Loader />
  }

  if (!meResult.data?.me) {
    return <Error statusCode={403} />
  }

  if (!storyResult.data) {
    return <Error statusCode={404} />
  }

  const { story } = storyResult.data

  const save = async (formState: any) => {
    formState.values.status = formState.values.publish
      ? PublishStatus.Published
      : PublishStatus.Draft

    formState.values.number = parseInt(formState.values.number)
    formState.values.storyId = story.id

    try {
      let result: Record<string, any>
      let updatedStory: Chapter
      if (chapter) {
        result = await updateChapter({ variables: formState.values })
        updatedStory = result.data.updateChapter
      } else {
        result = await createChapter({ variables: formState.values })
        updatedStory = result.data.createChapter
      }
      setChapter(updatedStory)
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
    const chapter = await save(formState)
    if (!chapter) return
    push(`/stories/${story.id}/chapters/${chapter.id}/dashboard`)
  }

  return (
    <div className={styles.new}>
      <h2>New Chapter</h2>
      <Card>
        <ContentForm
          content={chapter}
          autoSave={save}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  )
}

New.getInitialProps = ({ query }) => {
  return { query }
}

export default withApollo({ ssr: false })(New)
