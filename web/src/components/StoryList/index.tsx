import Link from 'next/link'
import Card from '@/components/Card'
import { Story } from '@/types'
import styles from './StoryList.module.scss'

interface Props {
  stories: Story[]
}

const StoryList: React.FC<Props> = ({ stories }) => {
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
          <p>By {story.author.penName}</p>
          <Link href={`/stories/${story.id}`}>
            <a>Read</a>
          </Link>
        </Card>
      )
    })
  }

  return <>{renderStories()}</>
}

export default StoryList
