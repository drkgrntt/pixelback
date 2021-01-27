import { useEffect, useState } from 'react'
import styles from './Comments.module.scss'
import { Chapter, Comment, Story } from '@/types'
import Card from '@/components/Card'
import CommentForm from '../CommentForm'
import { useMeQuery } from '@/hooks/queries/useMeQuery'
import { useDeleteCommentMutation } from '@/hooks/mutations/useDeleteCommentMutation'

interface Props {
  story?: Story
  chapter?: Chapter
  comments: Comment[]
}

const Comments: React.FC<Props> = ({ comments, story, chapter }) => {
  const { data } = useMeQuery()
  const [deleteComment] = useDeleteCommentMutation()
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

  const handleDeleteClick = async (comment: Comment) => {
    const confirm = window.confirm(
      'Are you sure you want to delete your comment?'
    )
    if (!confirm) return
    await deleteComment({ variables: { id: comment.id } })
  }

  const isOwner = (comment: Comment) => {
    return comment.author.id === data?.me?.id
  }

  const renderComments = () => {
    return comments.map((comment) => {
      return (
        <Card key={comment.id}>
          <div className={styles.row}>
            <p>{comment.body}</p>
            {isOwner(comment) && (
              <a onClick={() => setEditingComment(comment)}>Edit</a>
            )}
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
            {isOwner(comment) && (
              <a onClick={() => handleDeleteClick(comment)}>Delete</a>
            )}
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
