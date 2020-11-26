import { NextPage } from 'next'
import Link from 'next/link'
import styles from './Dashboard.module.scss'
import { useContext } from 'react'
import Error from 'next/error'
import { useRouter } from 'next/router'
import StoryInfo from '@/components/StoryInfo'
import DeleteStoryForm from '@/components/DeleteStoryForm'
import ChapterList from '@/components/ChapterList'
import Card from '@/components/Card'
import { useStoryQuery } from '@/queries/useStoryQuery'
import userContext from '@/context/userContext'
import { Story } from '@/types'
import GenreList from '@/components/GenreList'

interface Props {}

const Dashboard: NextPage<Props> = () => {
  const { query } = useRouter()
  const { currentUser } = useContext(userContext)
  const variables = { id: query.storyId as string }
  const result = useStoryQuery({ variables, skip: !query.storyId })
  const story: Story = result.data?.story

  if (!story) {
    return <Error statusCode={404} />
  }

  if (currentUser?.id !== story.authorId) {
    return <Error statusCode={403} />
  }

  return (
    <div>
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
        <Link href={`/stories/${story.id}/edit`}>
          <a>Edit the story</a>
        </Link>
      </Card>

      <Card>
        <DeleteStoryForm story={story} />
      </Card>
    </div>
  )
}

export default Dashboard
