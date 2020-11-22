import Link from 'next/link'
import styles from './StoryInfo.module.scss'
import { Story, PublishStatus } from '@/types'

interface Props {
  story: Story
}

const StoryInfo: React.FC<Props> = ({ story }) => {
  return (
    <>
      <h3>Info</h3>
      <ul>
        <li>
          Location:{' '}
          <Link href={`/stories/${story.id}`}>
            <a>{`${process.env.NEXT_PUBLIC_ROOT_URL}/stories/${story.id}`}</a>
          </Link>
        </li>
        <li>Score: {story.score}/5</li>
        <li>Status: {PublishStatus[story.status]}</li>
        <li>Created: {story.createdAt.toLocaleDateString()}</li>
        <li>Last updated: {story.updatedAt.toLocaleDateString()}</li>
        {story.publishedAt && <li>Published: {story.publishedAt.toLocaleDateString()}</li>}
      </ul>
    </>
  )
}

export default StoryInfo
