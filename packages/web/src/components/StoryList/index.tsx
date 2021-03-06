import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '@/components/Button'
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
  hideGenres?: boolean
  hideSummary?: boolean
}

const StoryList: React.FC<Props> = ({
  stories = [],
  showRating,
  cardWrap,
  action,
  actionText,
  hideGenres = false,
  hideSummary = false,
}) => {
  const { push } = useRouter()
  const renderRating = (story: Story) => {
    if (!showRating || story.ratings.length < 5) return null

    return <StarScale small score={story.score} />
  }

  const renderStory = (story: Story) => {
    return (
      <>
        <div className={styles.storyHeader}>
          <div className={styles.storyHeaderTop}>
            <Link href={`/stories/${story.id}`}>
              <h3>{story.title}</h3>
            </Link>
            {renderRating(story)}
          </div>
          <Link href={`/profile/${story.author.id}`}>
            <a>{story.author.penName}</a>
          </Link>
        </div>

        {!hideSummary && <p>{story.summary}</p>}

        {!hideGenres && (
          <em>
            {story.genres.map((genre) => genre.name).join(', ')}
          </em>
        )}

        <div className={styles.row}>
          <Button
            onClick={() => push(`/stories/${story.id}`)}
            styleTypes={['primary']}
          >
            Read
          </Button>
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

      return (
        <Card className={styles.card} key={story.id}>
          {renderStory(story)}
        </Card>
      )
    })
  }

  return <>{renderStories()}</>
}

export default StoryList
