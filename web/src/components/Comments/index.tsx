import { useEffect, useState } from 'react'
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
  const [editingComment, setEditingComment] = useState<
    Comment | undefined
  >(undefined)
  useEffect(() => {
    if (editingComment) setEditingComment(undefined)
  }, [comments])

  const renderAuthorship = (comment: Comment) => {
    if (
      !(story && story.author.id === comment.author.id) &&
      !(chapter && chapter.author.id === comment.author.id)
    ) {
      return
    }

    return '(author)'
  }

  const renderEdited = (comment: Comment) => {
    const createdAt = new Date(comment.createdAt)
    const updatedAt = new Date(comment.updatedAt)
    if (createdAt.toISOString() === updatedAt.toISOString()) return

    return <p>(edited {updatedAt.toLocaleDateString()})</p>
  }

  const renderComments = () => {
    return comments.map((comment) => {
      return (
        <Card key={comment.id}>
          <div className={styles.row}>
            <p>{comment.body}</p>
            <a onClick={() => setEditingComment(comment)}>Edit</a>
          </div>
          <p>
            -{comment.author.penName} {renderAuthorship(comment)}
          </p>
          <div className={styles.row}>
            <div className={styles.column}>
              <p>
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
              {renderEdited(comment)}
            </div>
            <a>Delete</a>
          </div>
        </Card>
      )
    })
  }

  return (
    <div>
      {data?.me && (
        <CommentForm
          comment={editingComment}
          story={story}
          chapter={chapter}
        />
      )}
      {renderComments()}
    </div>
  )
}

export default Comments
