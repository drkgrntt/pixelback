import { NextPage } from 'next'
import { withApollo } from '@/utils/withApollo'
import { useStoriesQuery } from '@/queries/useStoriesQuery'
import styles from "./Stories.module.scss"
import Loader from '@/components/Loader'
import { Story } from '@/types'

interface Props {

}

const Stories: NextPage<Props> = (props) => {
  const { loading, data } = useStoriesQuery()

  if (loading) {
    return <Loader />
  }

  const stories = data?.stories.stories

  const renderStories = () => {
    return stories.map((story: Story) => {
      return (
        <li key={story.id}>
          <h3>{story.title}</h3>
          {story.summary}
        </li>
      )
    })
  }

  return (
    <div>
      <h2>Stories</h2>
      <ul>
        {renderStories()}
      </ul>
    </div>
  )
}

export default withApollo({ ssr: true })(Stories)
