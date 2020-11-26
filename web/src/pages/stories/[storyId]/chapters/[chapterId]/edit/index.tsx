import { ParsedUrlQuery } from 'querystring'
import { NextPage } from 'next'
import Error from 'next/error'
import styles from './Edit.module.scss'
import Card from '@/components/Card'
import ContentForm from '@/components/ContentForm'
import { useUpdateChapterMutation } from '@/mutations/useUpdateChapterMutation'
import { useStoryQuery } from '@/queries/useStoryQuery'
import { useChapterQuery } from '@/queries/useChapterQuery'
import { Genre, PublishStatus } from '@/types'
import { useRouter } from 'next/router'
import { useMeQuery } from '@/queries/useMeQuery'

interface Props {
  query: ParsedUrlQuery
}

const Edit: NextPage<Props> = ({ query }) => {
  const { push } = useRouter()
  const [updateChapter] = useUpdateChapterMutation()
  const { data } = useMeQuery()
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

  if (!chapter || !story) {
    return <Error statusCode={404} />
  }

  if (data?.me?.id !== story.authorId) {
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
    <div>
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

export default Edit
