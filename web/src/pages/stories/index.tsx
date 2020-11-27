import { NextPage } from 'next'
import Link from 'next/link'
import { withApollo } from '@/utils/withApollo'
import { useStoriesQuery } from '@/queries/useStoriesQuery'
import styles from './Stories.module.scss'
import Loader from '@/components/Loader'
import Card from '@/components/Card'
import { Story } from '@/types'
import Button from '@/components/Button'

interface Props {}

const PER_PAGE = 10

const Stories: NextPage<Props> = (props) => {
  const { loading, data, fetchMore, variables } = useStoriesQuery({
    variables: { take: PER_PAGE, skip: 0 },
  })

  if (loading) {
    return <Loader />
  }

  const stories = data?.stories.stories

  const renderRating = (story: Story) => {
    if (story.ratings.length < 5) return null

    return <p>Rated {story.score}/5</p>
  }

  const renderStories = () => {
    return stories.map((story: Story) => {
      return (
        <Card key={story.id}>
          <Link href={`/stories/${story.id}`}>
            <h3>{story.title}</h3>
          </Link>
          {renderRating(story)}
          {story.summary}
          <p>By {story.author.displayName}</p>
          <Link href={`/stories/${story.id}`}>
            <a>Read</a>
          </Link>
        </Card>
      )
    })
  }

  const loadMore = (event: any, reset: Function) => {
    event.preventDefault()
    const newVars = {
      skip: data.stories.pageData.skip,
      take: variables?.take,
    }
    fetchMore({ variables: newVars })
    reset()
  }

  const renderMore = () => {
    if (!data?.stories.pageData.hasMore) return

    return <Button onClick={loadMore}>Get more</Button>
  }

  return (
    <div>
      <h2>Stories</h2>
      {renderStories()}
      {renderMore()}
    </div>
  )
}

export default withApollo({ ssr: true })(Stories)
