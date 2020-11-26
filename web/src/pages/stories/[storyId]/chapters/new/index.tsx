import { NextPage } from 'next'
import { useContext, useState } from 'react'
import { ParsedUrlQuery } from 'querystring'
import Error from 'next/error'
import styles from './New.module.scss'
import Card from '@/components/Card'
import Loader from '@/components/Loader'
import ContentForm from '@/components/ContentForm'
import { useCreateChapterMutation } from '@/mutations/useCreateChapterMutation'
import { useUpdateChapterMutation } from '@/mutations/useUpdateChapterMutation'
import { useStoryQuery } from '@/queries/useStoryQuery'
import { Genre, PublishStatus, Chapter } from '@/types'
import { useRouter } from 'next/router'
import userContext from '@/context/userContext'

interface Props {
  query: ParsedUrlQuery
}

const New: NextPage<Props> = ({ query }) => {
  const { push } = useRouter()
  const [createChapter] = useCreateChapterMutation()
  const [updateChapter] = useUpdateChapterMutation()
  const [chapter, setChapter] = useState<Chapter | undefined>()
  const { currentUser } = useContext(userContext)
  const variables = { id: query.storyId as string }
  const queryResult = useStoryQuery({ variables, skip: !query.storyId })

  if (!currentUser) {
    return <Error statusCode={403} />
  }

  switch (true) {
    case !!queryResult.error:
      return <Error statusCode={404} />
    case !!queryResult.loading:
      return <Loader />
  }

  const { story } = queryResult.data

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
      queryResult.refetch() // Not ideal, would be better to update the cache
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
    push(`/stories/${story.id}/chapters/${chapter.id}`)
  }

  return (
    <div>
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

export default New
