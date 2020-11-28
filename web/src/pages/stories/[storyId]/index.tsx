import Error from 'next/error'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import styles from './[storyId].module.scss'
import Loader from '@/components/Loader'
import Button from '@/components/Button'
import { useStoryQuery } from '@/queries/useStoryQuery'
import { withApollo } from '@/utils/withApollo'
import { useEffect } from 'react'
import { useLogRead } from '@/hooks/useLogRead'
import { useMeQuery } from '@/queries/useMeQuery'
import { useAddFavoriteStoryMutation } from '@/mutations/useAddFavoriteStoryMutation'
import { Story } from '@/types'
import StarScale from '@/components/StarScale'

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

  useLogRead(story?.id)

  useEffect(() => {
    if (!story?.body && story?.chapters.length) {
      replace(`/stories/${story.id}/chapters`)
    }
  }, [story])

  switch (true) {
    case !!storyResult.error:
      return <Error statusCode={404} />
    case storyResult.loading:
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

  return (
    <div className={styles.story}>
      <h2>{story.title}</h2>
      {story.body}
      <hr />
      <p>{story.author.penName}</p>
      {renderFavoriteButton()}
      <StarScale allowHover score={story.score} />
    </div>
  )
}

StoryPage.getInitialProps = ({ query }) => {
  return { query }
}

export default withApollo({ ssr: true })(StoryPage as any)
