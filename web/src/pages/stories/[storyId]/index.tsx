import Error from 'next/error'
import { NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import styles from './[id].module.scss'
import Loader from '@/components/Loader'
import { useStoryQuery } from '@/hooks/useStoryQuery'

interface Props {
  query: ParsedUrlQuery
}

const StoryPage: NextPage<Props> = (props) => {

  const result = useStoryQuery({ id: props.query.storyId as string })
  
  switch (true) {
    case !!result.error:
      return <Error statusCode={404} />
    case !!result.loading:
      return <Loader />
  }
      
  const story = result.data.story

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
