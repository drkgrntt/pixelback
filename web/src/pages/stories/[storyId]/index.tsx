import Error from 'next/error'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import styles from './[storyId].module.scss'
import Loader from '@/components/Loader'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import CreditCardForm from '@/components/CreditCardForm'
import TipForm from '@/components/TipForm'
import { useStoryQuery } from '@/queries/useStoryQuery'
import { withApollo } from '@/utils/withApollo'
import { useEffect } from 'react'
import { useLogRead } from '@/hooks/useLogRead'
import { useMeQuery } from '@/queries/useMeQuery'
import { useAddFavoriteStoryMutation } from '@/mutations/useAddFavoriteStoryMutation'
import { useRateMutation } from '@/mutations/useRateMutation'
import { Genre, Story } from '@/types'
import StarScale from '@/components/StarScale'
import Comments from '@/components/Comments'
import Head from '@/components/Head'

interface Props {
  query: ParsedUrlQuery
}

const StoryPage: NextPage<Props> = ({ query }) => {
  const { replace } = useRouter()
  const variables = { id: query.storyId as string }
  const storyResult = useStoryQuery({
    variables,
    skip: !query.storyId,
  })
  const story = storyResult.data?.story
  const meResult = useMeQuery()
  const [addFavoriteStory] = useAddFavoriteStoryMutation()
  const [rate] = useRateMutation()

  useLogRead(story?.id)

  useEffect(() => {
    if (!story?.body && story?.chapters.length) {
      replace(`/stories/${story.id}/chapters`)
    }
  }, [story])

  // In order to get rateStatus, which is based on user data
  // This should be fixed when the user state is available on ssr
  useEffect(() => {
    storyResult.refetch()
  }, [meResult.data])

  switch (true) {
    case !!storyResult.error:
      return <Error statusCode={404} />
    case storyResult.loading && !storyResult.data:
      return <Loader />
  }

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
    <div className={styles.story}>
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

      <h2>{story.title}</h2>
      <Link href={`/profile/${story.author.id}`}>
        <a>{story.author.penName}</a>
      </Link>
      {story.body}
      <hr />
      <Link href={`/profile/${story.author.id}`}>
        <a>{story.author.penName}</a>
      </Link>
      <Card>
        <StarScale
          allowHover={!!meResult.data?.me}
          onStarClick={rateStory}
          score={story.score}
          rateStatus={story.rateStatus}
        />
        {renderFavoriteButton()}
      </Card>
      <Card>
        <Modal
          buttonText="Tip the author"
          className={styles.tipModal}
        >
          <h3>Tip {story.author.penName}</h3>
          <TipForm author={story.author} />
        </Modal>
      </Card>
      <Comments story={story} comments={story.comments} />
    </div>
  )
}

StoryPage.getInitialProps = ({ query }) => {
  return { query }
}

export default withApollo({ ssr: true })(StoryPage as any)
