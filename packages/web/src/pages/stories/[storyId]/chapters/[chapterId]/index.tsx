import { useEffect } from 'react'
import { NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Error from 'next/error'
import Loader from '@/components/Loader'
import {
  useRateMutation,
  useMeQuery,
  useChapterQuery,
  useStoryQuery,
  Chapter,
  Story,
  Genre,
} from '@pixelback/shared'
import styles from './[chapterId].module.scss'
import Link from 'next/link'
import { withApollo } from '@/utils/withApollo'
import { useLogRead } from '@/hooks/useLogRead'
import StarScale from '@/components/StarScale'
import Head from '@/components/Head'
import Comments from '@/components/Comments'
import Card from '@/components/Card'
import Modal from '@/components/Modal'
import TipForm from '@/components/TipForm'
import { useRouter } from 'next/router'
import Button from '@/components/Button'

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

  const { push } = useRouter()

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
    case storyResult.loading || chapterResult.loading:
      return <Loader />

    case !!storyResult.error ||
      !!chapterResult.error ||
      !story ||
      !chapter:
      return <Error statusCode={404} />
  }

  const renderPrev = () => {
    if (!chapter.previous) return <div /> // Placeholder so "next" will float right

    return (
      <Button
        onClick={(event: any, reset: Function) => {
          push(`/stories/${story.id}/chapters/${chapter.previous.id}`)
          reset()
        }}
      >
        <i aria-hidden className="fas fa-arrow-left"></i>
      </Button>
    )
  }

  const renderNext = () => {
    if (!chapter.next) return

    return (
      <Button
        onClick={(event: any, reset: Function) => {
          push(`/stories/${story.id}/chapters/${chapter.next.id}`)
          reset()
        }}
      >
        <i aria-hidden className="fas fa-arrow-right"></i>
      </Button>
    )
  }

  const renderBack = () => {
    return (
      <Link href={`/stories/${story.id}`}>
        <a>{story.title}</a>
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
      <Head
        title={`${chapter.number}. ${chapter.title} | ${story.title} | Pixelback`}
        description={chapter.summary}
        keywords={story.genres
          .reduce(
            (keywords: string, genre: Genre) =>
              `${keywords}${genre.name}, `,
            ''
          )
          .slice(0, -2)}
      />

      <div>
        <h2>{story.title}</h2>
        <div className={styles.storyActions}>
          <Link href={`/profile/${story.author.id}`}>
            <a>{story.author.penName}</a>
          </Link>
          {renderBack()}
        </div>
      </div>

      <hr />

      <h3>{`${chapter.number}. ${chapter.title}`}</h3>
      <span>{chapter.reads} reads</span>

      <p>{chapter.body}</p>

      <div className={styles.storyActions}>
        <Link href={`/profile/${story.author.id}`}>
          <a>{story.author.penName}</a>
        </Link>
        {renderBack()}
      </div>

      <hr />

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
      <div className={styles.actions}>
        {story.author.canAcceptPayments && (
          <Modal
            buttonText="Tip the author"
            className={styles.tipModal}
          >
            <h3>Tip {story.author.penName}</h3>
            <TipForm author={story.author} />
          </Modal>
        )}
      </div>
      <Comments chapter={chapter} comments={chapter.comments} />
    </div>
  )
}

ChapterPage.getInitialProps = ({ query }) => {
  return { query }
}

export default withApollo({ ssr: true })(ChapterPage as any)
