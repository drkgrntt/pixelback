import { useRouter } from 'next/router'
import Link from 'next/link'
import Button from '../Button'
import styles from './ChapterList.module.scss'
import { useMeQuery, Chapter, Story } from '@pixelback/shared'

interface Props {
  story: Story
}

const ChapterList: React.FC<Props> = ({ story }) => {
  const { push } = useRouter()
  const { data } = useMeQuery()

  const renderDashboardLink = (chapter: Chapter) => {
    if (data?.me?.id !== story.authorId) return

    return (
      <>
        {' | '}
        <Link
          href={`/stories/${story.id}/chapters/${chapter.id}/dashboard`}
        >
          Dashboard
        </Link>
      </>
    )
  }

  const renderChapters = () => {
    if (!story.chapters.length) return null

    const sortedChapters = [...story.chapters].sort(
      (a, b) => a.number - b.number
    )

    return sortedChapters.map((chapter) => {
      return (
        <li key={chapter.id} className={styles.chapter}>
          <Link href={`/stories/${story.id}/chapters/${chapter.id}`}>
            {`${chapter.number}. ${chapter.title}`}
          </Link>
          {renderDashboardLink(chapter)}
        </li>
      )
    })
  }

  const renderNewChapterButton = () => {
    if (data?.me?.id !== story.authorId) return

    if (story.chapters.length) {
      return (
        <>
          <hr />
          <p className={styles.ctaText}>Write a new chapter!</p>
          <Button
            onClick={() => push(`/stories/${story.id}/chapters/new`)}
            styleTypes={['cta']}
          >
            Start writing
          </Button>
        </>
      )
    }

    return (
      <>
        <hr />
        <p className={styles.ctaText}>Write the first chapter!</p>
        <Button
          onClick={() => push(`/stories/${story.id}/chapters/new`)}
          styleTypes={['cta']}
        >
          Start writing
        </Button>
      </>
    )
  }

  return (
    <>
      <h3>Chapters</h3>
      <ul className={styles.chapters}>{renderChapters()}</ul>
      {renderNewChapterButton()}
    </>
  )
}

export default ChapterList
