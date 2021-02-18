import styles from './CommentForm.module.scss'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useForm } from '@/hooks/useForm'
import {
  useEditCommentMutation,
  useCommentMutation,
  Comment,
  Story,
  Chapter,
} from '@pixelback/shared'

interface Props {
  comment?: Comment
  story?: Story
  chapter?: Chapter
  setEditingComment: Function
}

const CommentForm: React.FC<Props> = ({
  comment,
  story,
  chapter,
  setEditingComment,
}) => {
  const INITIAL_STATE = {
    body: comment?.body || '',
    id: comment?.id,
    storyId: story?.id,
    chapterId: chapter?.id,
  }
  const formState = useForm(INITIAL_STATE, [comment])

  const [createComment] = useCommentMutation({
    storyId: story?.id,
    chapterId: chapter?.id,
  })
  const [editComment] = useEditCommentMutation()

  const handleSubmit = async (event: any, reset: Function) => {
    event.preventDefault()
    if (!formState.values.body) {
      reset()
      return
    }
    if (comment) {
      await editComment({ variables: formState.values })
    } else {
      await createComment({ variables: formState.values })
    }
    setEditingComment(undefined)
    formState.setValues({
      body: '',
      id: null,
      storyId: null,
      chapterId: null,
    })
    reset()
  }

  return (
    <form className={styles.form}>
      <Input
        name="body"
        label="Comment"
        type="textarea"
        formState={formState}
      />
      <Button type="submit" onClick={handleSubmit}>
        {comment ? 'Update' : 'Post'}
      </Button>
    </form>
  )
}

export default CommentForm
