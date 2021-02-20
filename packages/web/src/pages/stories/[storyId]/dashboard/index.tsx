import { NextPage } from 'next'
import Link from 'next/link'
import styles from './Dashboard.module.scss'
import Error from 'next/error'
import StoryInfo from '@/components/StoryInfo'
import DeleteStoryForm from '@/components/DeleteStoryForm'
import ChapterList from '@/components/ChapterList'
import Card from '@/components/Card'
import { useMeQuery, useStoryQuery, Story } from '@pixelback/shared'
import GenreList from '@/components/GenreList'
import { useIsAuth } from '@/hooks/useIsAuth'
import { ParsedUrlQuery } from 'querystring'
import Loader from '@/components/Loader'
import { withApollo } from '@/utils/withApollo'
import Button from '@/components/Button'
import { useRouter } from 'next/router'

interface Props {
  query: ParsedUrlQuery
}

const Dashboard: NextPage<Props> = ({ query }) => {
  const meResult = useMeQuery()
  const variables = { id: query.storyId as string }
  const storyResult = useStoryQuery({
    variables,
    skip: !query.storyId,
  })
  const story: Story = storyResult.data?.story
  useIsAuth()
  const { push } = useRouter()

  if (meResult.loading || storyResult.loading) {
    return <Loader />
  }

  if (!story) {
    return <Error statusCode={404} />
  }

  if (meResult.data?.me?.id !== story.authorId) {
    return <Error statusCode={403} />
  }

  return (
    <div className={styles.dashboard}>
      <h2>{story.title}</h2>
      <Link href="/writer-dashboard">
        <a>Back to writer's dashboard</a>
      </Link>

      <Card>
        <GenreList story={story} />
      </Card>

      <Card>
        <ChapterList story={story} />
      </Card>

      <Card>
        <StoryInfo story={story} />
        <Button
          onClick={(event: any, reset: Function) => {
            push(`/stories/${story.id}/edit`)
            reset()
          }}
        >
          Edit the story
        </Button>
      </Card>

      <Card>
        <DeleteStoryForm story={story} />
      </Card>
    </div>
  )
}

Dashboard.getInitialProps = ({ query }) => {
  return { query }
}

export default withApollo({ ssr: false })(Dashboard)
