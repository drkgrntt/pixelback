import { NextPage } from 'next'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import styles from './Dashboard.module.scss'
import Error from 'next/error'
import Loader from '@/components/Loader'
import ChapterInfo from '@/components/ChapterInfo'
import DeleteChapterForm from '@/components/DeleteChapterForm'
import Card from '@/components/Card'
import { useStoryQuery } from '@/queries/useStoryQuery'
import { useChapterQuery } from '@/queries/useChapterQuery'
import { Story, Chapter, User } from '@/types'
import { useMeQuery } from '@/hooks/queries/useMeQuery'
import { useIsAuth } from '@/hooks/useIsAuth'

interface Props {
  query: ParsedUrlQuery
}

const Dashboard: NextPage<Props> = ({ query }) => {
  const storyVariables = { id: query.storyId }
  const storyResult = useStoryQuery({
    variables: storyVariables,
    skip: !query.storyId,
  })
  const story: Story = storyResult.data?.story
  const chapterVariables = { id: query.chapterId }
  const chapterResult = useChapterQuery({
    variables: chapterVariables,
    skip: !query.chapterId,
  })
  const chapter: Chapter = chapterResult.data?.chapter
  const meResult = useMeQuery()
  const me: User = meResult.data?.me
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

  return (
    <div>
      <h2>{story.title}</h2>

      <Link href={`/stories/${story.id}/dashboard`}>
        <a>Back to the story dashboard</a>
      </Link>

      <br />

      <Link href="/writer-dashboard">
        <a>Back to writer's dashboard</a>
      </Link>

      <Card>
        <ChapterInfo chapter={chapter} story={story} />
        <Link
          href={`/stories/${story.id}/chapters/${chapter.id}/edit`}
        >
          <a>Edit the chapter</a>
        </Link>
      </Card>

      <Card>
        <DeleteChapterForm story={story} chapter={chapter} />
      </Card>
    </div>
  )
}

Dashboard.getInitialProps = ({ query }) => {
  return { query }
}

export default Dashboard
