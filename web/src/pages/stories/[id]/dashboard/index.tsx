import { NextPage } from 'next'
import Link from 'next/link'
import styles from './Dashboard.module.scss'
import { useContext } from 'react'
import Error from 'next/error'
import { useRouter } from 'next/router'
import StoryInfo from '../../../../components/StoryInfo'
import DeleteStoryForm from '../../../../components/DeleteStoryForm'
import Card from '../../../../components/Card'
import { useStoryQuery } from '../../../../hooks/useStoryQuery'
import userContext from '../../../../context/userContext'

interface Props {

}

const Dashboard: NextPage<Props> = () => {

  const { query } = useRouter()
  const { currentUser } = useContext(userContext)
  const result = useStoryQuery({ id: query.id as string })
  const story = result.data?.story

  if (!currentUser || !story) {
    return <Error statusCode={404} />
  }

  return (
    <div>
      <h2>{story.title}</h2>
      <Link href="/writer-dashboard">
        <a>Back to writer's dashboard</a>
      </Link>

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
