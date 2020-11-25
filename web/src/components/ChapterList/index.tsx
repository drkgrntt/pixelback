import { useRouter } from 'next/router'
import Link from 'next/link'
import Button from '../Button'
import { Story } from '@/types'
import styles from './ChapterList.module.scss'

interface Props {
  story: Story
}

const ChapterList: React.FC<Props> = ({ story }) => {
  const { push } = useRouter()

  const renderChapters = () => {
    if (!story.chapters.length) return null

    return story.chapters.map((chapter) => {
      return (
        <li key={chapter.id} className={styles.chapter}>
          <Link href={`/stories/${chapter.id}`}>
            {chapter.number}. {chapter.title}
          </Link>
          {' | '}
          <Link href={`/stories/${chapter.id}/dashboard`}>
            Dashboard
          </Link>
        </li>
      )
    })
  }

  const renderNewChapterButton = () => {
    if (story.chapters.length) {
      return (
        <>
          <p className={styles.ctaText}>Write a new chapter!</p>
          <Button
            onClick={() => push('/stories/new')}
            styleTypes={['cta']}
          >
            Start writing
          </Button>
        </>
      )
    }

    return (
      <>
        <p className={styles.ctaText}>Write the first chapter!</p>
        <Button
          onClick={() => push('/stories/new')}
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
      <hr />
      {renderNewChapterButton()}
    </>
  )
}

export default ChapterList
