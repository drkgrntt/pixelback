import Link from 'next/link'
import Card from '@/components/Card'
import { Story } from '@/types'
import styles from './StoryList.module.scss'
import StarScale from '../StarScale'

interface Props {
  showRating?: boolean
  cardWrap?: boolean
  stories: Story[]
}

const StoryList: React.FC<Props> = ({
  stories,
  showRating,
  cardWrap,
}) => {
  const renderRating = (story: Story) => {
    console.log(showRating)
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
        {story.summary}
        <p>By {story.author.penName}</p>
        <Link href={`/stories/${story.id}`}>
          <a>Read</a>
        </Link>
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
