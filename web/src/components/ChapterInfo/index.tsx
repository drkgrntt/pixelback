import Link from 'next/link'
import styles from './ChapterInfo.module.scss'
import { Story, PublishStatus, Chapter } from '@/types'

interface Props {
  story: Story
  chapter: Chapter
}

const ChapterInfo: React.FC<Props> = ({ story, chapter }) => {
  return (
    <>
      <h3>Info</h3>
      <ul>
        <li>
          Location:{' '}
          <Link href={`/stories/${story.id}/chapters/${chapter.id}`}>
            <a>{`${process.env.NEXT_PUBLIC_ROOT_URL}/stories/${story.id}/chapters/${chapter.id}`}</a>
          </Link>
        </li>
        <li>Score: {chapter.score}/5</li>
        <li>Number of ratings: {chapter.ratings.length}</li>
        <li>Status: {PublishStatus[chapter.status]}</li>
        <li>Created: {chapter.createdAt.toLocaleDateString()}</li>
        <li>Last updated: {chapter.updatedAt.toLocaleDateString()}</li>
        {chapter.publishedAt && (
          <li>Published: {chapter.publishedAt.toLocaleDateString()}</li>
        )}
      </ul>
    </>
  )
}

export default ChapterInfo
