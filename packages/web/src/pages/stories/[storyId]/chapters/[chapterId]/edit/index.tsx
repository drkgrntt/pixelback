import { ParsedUrlQuery } from 'querystring'
import { NextPage } from 'next'
import Error from 'next/error'
import styles from './Edit.module.scss'
import Card from '@/components/Card'
import ContentForm from '@/components/ContentForm'
import {
  useMeQuery,
  useChapterQuery,
  useUpdateChapterMutation,
  useStoryQuery,
  PublishStatus,
} from '@pixelback/shared'
import { useRouter } from 'next/router'
import { useIsAuth } from '@/hooks/useIsAuth'
import Loader from '@/components/Loader'
import { withApollo } from '@/utils/withApollo'

interface Props {
  query: ParsedUrlQuery
}

const Edit: NextPage<Props> = ({ query }) => {
  const { push } = useRouter()
  const [updateChapter] = useUpdateChapterMutation()
  const meResult = useMeQuery()
  const me = meResult.data?.me
  const storyVarialbes = { id: query.storyId as string }
  const storyResult = useStoryQuery({
    variables: storyVarialbes,
    skip: !query.storyId,
  })
  const story = storyResult.data?.story
  const chapterVarialbes = { id: query.chapterId as string }
  const chapterResult = useChapterQuery({
    variables: chapterVarialbes,
    skip: !query.chapterId,
  })
  const chapter = chapterResult.data?.chapter
  useIsAuth()

  if (
    meResult.loading ||
    storyResult.loading ||
    chapterResult.loading
  ) {
    return <Loader />
  }

  if (!chapter || !story) {
    return <Error statusCode={404} />
  }

  if (me.id !== story.authorId) {
    return <Error statusCode={403} />
  }

  const save = async (formState: any) => {
    formState.values.status = formState.values.publish
      ? PublishStatus.Published
      : PublishStatus.Draft

    formState.values.number = parseInt(formState.values.number)

    try {
      const result = await updateChapter({
        variables: formState.values,
      })
      const updatedChapter = result.data.updateChapter
      return updatedChapter
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
    <div className={styles.edit}>
      <h2>Edit Chapter</h2>
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

Edit.getInitialProps = ({ query }) => {
  return { query }
}

export default withApollo({ ssr: false })(Edit)
