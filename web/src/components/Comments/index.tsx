import styles from './Comments.module.scss'
import { Chapter, Comment, Story } from '@/types'
import Card from '@/components/Card'
import CommentForm from '../CommentForm'

interface Props {
  story?: Story
  chapter?: Chapter
  comments: Comment[]
}

const Comments: React.FC<Props> = ({ comments, story, chapter }) => {
  const renderComments = () => {
    return comments.map((comment) => {
      return (
        <Card key={comment.id}>
          <p>{comment.body}</p>
          <p>{comment.author.penName}</p>
        </Card>
      )
    })
  }

  return (
    <div>
      <CommentForm story={story} chapter={chapter} />
      {renderComments()}
    </div>
  )
}

export default Comments
