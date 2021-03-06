import { useEffect } from 'react'
import { NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Error from 'next/error'
import Link from 'next/link'
import {
  useRateMutation,
  useAddFavoriteStoryMutation,
  useMeQuery,
  useStoryQuery,
  Genre,
  Story,
} from '@pixelback/shared'
import Loader from '@/components/Loader'
import Modal from '@/components/Modal'
import TipForm from '@/components/TipForm'
import styles from './Chapters.module.scss'
import ChapterList from '@/components/ChapterList'
import Card from '@/components/Card'
import Head from '@/components/Head'
import Button from '@/components/Button'
import StarScale from '@/components/StarScale'
import { withApollo } from '@/utils/withApollo'

interface Props {
  query: ParsedUrlQuery
}

const Chapters: NextPage<Props> = ({ query }) => {
  const variables = { id: query.storyId as string }
  const storyResult = useStoryQuery({
    variables,
    skip: !query.storyId,
  })
  const meResult = useMeQuery()
  const [addFavoriteStory] = useAddFavoriteStoryMutation()
  const [rate] = useRateMutation()

  // In order to get rateStatus, which is based on user data
  // This should be fixed when the user state is available on ssr
  useEffect(() => {
    storyResult.refetch()
  }, [meResult.data])

  switch (true) {
    case !!storyResult.error:
      return <Error statusCode={404} />
    case storyResult.loading:
      return <Loader />
  }

  const { story } = storyResult.data

  const favoriteStory = async () => {
    const variables = { storyId: story.id }
    try {
      await addFavoriteStory({ variables })
    } catch (err) {
      console.warn(err)
    }
  }

  const renderFavoriteButton = () => {
    if (
      !meResult.data?.me ||
      meResult.data?.me.favoriteStories.some(
        (fStory: Story) => fStory.id === story.id
      )
    ) {
      return null
    }

    return <Button onClick={favoriteStory}>Add to favorites</Button>
  }

  const rateStory = async (score: number) => {
    if (!meResult.data?.me) return

    const variables = {
      storyId: story.id,
      score,
    }
    try {
      await rate({ variables })
      await storyResult.refetch()
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <div className={styles.chapters}>
      <Head
        title={`${story.title} | Pixelback`}
        description={story.summary}
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
        <Link href={`/profile/${story.author.id}`}>
          <a>{story.author.penName}</a>
        </Link>
      </div>

      <p>{story.summary}</p>

      <Card>
        <ChapterList story={story} />
      </Card>

      <StarScale
        allowHover={!!meResult.data?.me}
        onStarClick={rateStory}
        score={story.score}
        rateStatus={story.rateStatus}
      />
      <div className={styles.actions}>
        {renderFavoriteButton()}
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
    </div>
  )
}

Chapters.getInitialProps = ({ query }) => {
  return { query }
}

export default withApollo({ ssr: true })(Chapters as any)
