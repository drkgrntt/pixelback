import styles from './Comments.module.scss'
import { Chapter, Comment, Story } from '@/types'
import Card from '@/components/Card'
import CommentForm from '../CommentForm'
import { useMeQuery } from '@/hooks/queries/useMeQuery'

interface Props {
  story?: Story
  chapter?: Chapter
  comments: Comment[]
}

const Comments: React.FC<Props> = ({ comments, story, chapter }) => {
  const { data } = useMeQuery()

  const renderAuthorship = (comment: Comment) => {
    if (
      !(story && story.author.id === comment.author.id) &&
      !(chapter && chapter.author.id === comment.author.id)
    ) {
      return
    }

    return '(author)'
  }

  const renderComments = () => {
    return comments.map((comment) => {
      return (
        <Card key={comment.id}>
          <p>{comment.body}</p>
          <p>
            -{comment.author.penName} {renderAuthorship(comment)}
          </p>
          <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
        </Card>
      )
    })
  }

  return (
    <div>
      {data?.me && <CommentForm story={story} chapter={chapter} />}
      {renderComments()}
    </div>
  )
}

export default Comments
