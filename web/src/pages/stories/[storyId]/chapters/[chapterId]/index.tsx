import { NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Error from 'next/error'
import Loader from '@/components/Loader'
import { useStoryQuery } from '@/queries/useStoryQuery'
import { useChapterQuery } from '@/queries/useChapterQuery'
import styles from './[chapterId].module.scss'
import Link from 'next/link'
import { Chapter, Story } from '@/types'

interface Props {
  query: ParsedUrlQuery
}

const ChapterPage: NextPage<Props> = ({ query }) => {
  const getStory = useStoryQuery()
  const storyVariables = { id: query.storyId }
  const storyResult = getStory({ variables: storyVariables, skip: !query.storyId })
  const getChapter = useChapterQuery()
  const chapterVariables = { id: query.chapterId }
  const chapterResult = getChapter({ variables: chapterVariables, skip: !query.chapterId })

  switch (true) {
    case !!storyResult.error || !!chapterResult.error:
      return <Error statusCode={404} />

    case !!storyResult.loading || !!chapterResult.loading:
      return <Loader />
  }

  const { story }: { story: Story } = storyResult.data
  const { chapter }: { chapter: Chapter } = chapterResult.data

  const renderPrev = () => {
    if (!chapter.previous) return

    return (
      <Link href={`/stories/${story.id}/chapters/${chapter.previous.id}`}>
        <a>
          &#8249; Previous
        </a>
      </Link>
    )
  }

  const renderNext = () => {
    if (!chapter.next) return

    return (
      <Link href={`/stories/${story.id}/chapters/${chapter.next.id}`}>
        <a>
          Next &#8250;
        </a>
      </Link>
    )
  }

  return (
    <div className={styles.chapter}>
      <h2>{story.title}</h2>
      <hr />
      <h3>{`${chapter.number}. ${chapter.title}`}</h3>
      {chapter.body}
      <Link href={`/stories/${story.id}`}>
        <a>Back to the story</a>
      </Link>
      <div className={styles.prevNext}>
        {renderPrev()}
        {renderNext()}
      </div>
    </div>
  )
}

ChapterPage.getInitialProps = ({ query }) => {
  return { query }
}

export default ChapterPage
