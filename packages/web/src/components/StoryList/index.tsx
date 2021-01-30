import Link from 'next/link'
import Card from '@/components/Card'
import { Story } from '@pixelback/shared'
import styles from './StoryList.module.scss'
import StarScale from '../StarScale'

interface Props {
  showRating?: boolean
  cardWrap?: boolean
  actionText?: string
  action?: Function
  stories: Story[]
}

const StoryList: React.FC<Props> = ({
  stories,
  showRating,
  cardWrap,
  action,
  actionText,
}) => {
  const renderRating = (story: Story) => {
    if (!showRating || story.ratings.length < 5) return null

    return <StarScale small score={story.score} />
  }

  const renderStory = (story: Story) => {
    return (
      <>
        <div className={styles.storyHeader}>
          <Link href={`/stories/${story.id}`}>
            <h3>{story.title}</h3>
          </Link>
          {renderRating(story)}
        </div>
        <em>{story.genres.map((genre) => genre.name).join(', ')}</em>
        {story.summary}
        <Link href={`/profile/${story.author.id}`}>
          <a>{story.author.penName}</a>
        </Link>
        <div className={styles.row}>
          <Link href={`/stories/${story.id}`}>
            <a>Read</a>
          </Link>
          {action && actionText && (
            <a onClick={() => action(story)}>{actionText}</a>
          )}
        </div>
      </>
    )
  }

  const renderStories = () => {
    return stories.map((story: Story) => {
      if (!cardWrap) {
        return (
          <div className={styles.wrapper} key={story.id}>
            {renderStory(story)}
          </div>
        )
      }

      return <Card key={story.id}>{renderStory(story)}</Card>
    })
  }

  return <>{renderStories()}</>
}

export default StoryList
