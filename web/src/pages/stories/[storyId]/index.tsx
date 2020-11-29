import Error from 'next/error'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import styles from './[storyId].module.scss'
import Loader from '@/components/Loader'
import Card from '@/components/Card'
import Button from '@/components/Button'
import { useStoryQuery } from '@/queries/useStoryQuery'
import { withApollo } from '@/utils/withApollo'
import { useEffect } from 'react'
import { useLogRead } from '@/hooks/useLogRead'
import { useMeQuery } from '@/queries/useMeQuery'
import { useAddFavoriteStoryMutation } from '@/mutations/useAddFavoriteStoryMutation'
import { useRateMutation } from '@/mutations/useRateMutation'
import { Story } from '@/types'
import StarScale from '@/components/StarScale'
import CommentForm from '@/components/CommentForm'
import Comments from '@/components/Comments'

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

  const renderCommentsSection = () => {
    if (!story.enableCommenting) return
    return (
      <>
        <CommentForm />
        <Comments comments={story.comments} />
      </>
    )
  }

  return (
    <div className={styles.story}>
      <h2>{story.title}</h2>
      {story.body}
      <hr />
      <p>{story.author.penName}</p>
      <Card>
        <StarScale
          allowHover={!!meResult.data?.me}
          onStarClick={rateStory}
          score={story.score}
          rateStatus={story.rateStatus}
        />
        {renderFavoriteButton()}
      </Card>
      {renderCommentsSection()}
    </div>
  )
}

StoryPage.getInitialProps = ({ query }) => {
  return { query }
}

export default withApollo({ ssr: true })(StoryPage as any)
