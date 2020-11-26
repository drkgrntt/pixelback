import Error from 'next/error'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import styles from './[id].module.scss'
import Loader from '@/components/Loader'
import { useStoryQuery } from '@/queries/useStoryQuery'

interface Props {
  query: ParsedUrlQuery
}

const StoryPage: NextPage<Props> = ({ query }) => {
  const { replace } = useRouter()
  const variables = { id: query.storyId as string }
  const result = useStoryQuery({ variables, skip: !query.storyId })

  switch (true) {
    case !!result.error:
      return <Error statusCode={404} />
    case !!result.loading:
      return <Loader />
  }

  const { story } = result.data

  if (!story.body && story.chapters.length) {
    replace(`/stories/${story.id}/chapters`)
  }

  return (
    <div>
      <h2>{story.title}</h2>
      {story.body}
    </div>
  )
}

StoryPage.getInitialProps = ({ query }) => {
  return { query }
}

export default StoryPage
