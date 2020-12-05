import { useEffect } from 'react'
import { NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Error from 'next/error'
import Loader from '@/components/Loader'
import { useStoryQuery } from '@/queries/useStoryQuery'
import { useChapterQuery } from '@/queries/useChapterQuery'
import styles from './[chapterId].module.scss'
import Link from 'next/link'
import { Chapter, Story } from '@/types'
import { withApollo } from '@/utils/withApollo'
import { useLogRead } from '@/hooks/useLogRead'
import StarScale from '@/components/StarScale'
import { useMeQuery } from '@/queries/useMeQuery'
import { useRateMutation } from '@/mutations/useRateMutation'
import Comments from '@/components/Comments'

interface Props {
  query: ParsedUrlQuery
}

const ChapterPage: NextPage<Props> = ({ query }) => {
  const storyVariables = { id: query.storyId }
  const storyResult = useStoryQuery({
    variables: storyVariables,
    skip: !query.storyId,
  })
  const chapterVariables = { id: query.chapterId }
  const chapterResult = useChapterQuery({
    variables: chapterVariables,
    skip: !query.chapterId,
  })

  const story: Story = storyResult.data?.story
  const chapter: Chapter = chapterResult.data?.chapter

  const meResult = useMeQuery()
  const [rate] = useRateMutation()

  useLogRead(query.storyId as string, query.chapterId as string)

  // In order to get rateStatus, which is based on user data
  // This should be fixed when the user state is available on ssr
  useEffect(() => {
    chapterResult.refetch()
  }, [meResult.data])

  switch (true) {
    case !!storyResult.error ||
      !!chapterResult.error ||
      !story ||
      !chapter:
      return <Error statusCode={404} />

    case storyResult.loading || chapterResult.loading:
      return <Loader />
  }

  const renderPrev = () => {
    if (!chapter.previous) return <div /> // Placeholder so "next" will float right

    return (
      <Link
        href={`/stories/${story.id}/chapters/${chapter.previous.id}`}
      >
        <a>&#8249; Previous</a>
      </Link>
    )
  }

  const renderNext = () => {
    if (!chapter.next) return

    return (
      <Link href={`/stories/${story.id}/chapters/${chapter.next.id}`}>
        <a>Next &#8250;</a>
      </Link>
    )
  }

  const renderBack = () => {
    return (
      <Link href={`/stories/${story.id}`}>
        <a>Back to the story</a>
      </Link>
    )
  }

  const rateChapter = async (score: number) => {
    if (!meResult.data?.me) return

    const variables = {
      storyId: story.id,
      chapterId: chapter.id,
      score,
    }
    try {
      await rate({ variables })
      await storyResult.refetch()
      await chapterResult.refetch()
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <div className={styles.chapter}>
      <h2>{story.title}</h2>
      <Link href={`/profile/${story.author.id}`}>
        <a>{story.author.penName}</a>
      </Link>
      {renderBack()}
      <hr />
      <h3>{`${chapter.number}. ${chapter.title}`}</h3>
      {chapter.body}
      <Link href={`/profile/${story.author.id}`}>
        <a>{story.author.penName}</a>
      </Link>
      {renderBack()}
      <div className={styles.prevNext}>
        {renderPrev()}
        {renderNext()}
      </div>
      <StarScale
        allowHover={!!meResult.data?.me}
        onStarClick={rateChapter}
        score={chapter.score}
        rateStatus={chapter.rateStatus}
      />
      <Comments chapter={chapter} comments={chapter.comments} />
    </div>
  )
}

ChapterPage.getInitialProps = ({ query }) => {
  return { query }
}

export default withApollo({ ssr: true })(ChapterPage as any)
