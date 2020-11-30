import styles from './CommentForm.module.scss'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useForm } from '@/hooks/useForm'
import { Comment, Story, Chapter } from '@/types'
import { useCommentMutation } from '@/hooks/mutations/useCommentMutation'

interface Props {
  comment?: Comment
  story?: Story
  chapter?: Chapter
}

const CommentForm: React.FC<Props> = ({
  comment,
  story,
  chapter,
}) => {
  const INITIAL_STATE = {
    body: comment?.body || '',
    storyId: story?.id,
    chapterId: chapter?.id,
  }
  const formState = useForm(INITIAL_STATE)
  const [createComment] = useCommentMutation({
    storyId: story?.id,
    chapterId: chapter?.id,
  })

  const handleSubmit = async (event: any, reset: Function) => {
    event.preventDefault()
    if (comment) {
      // updateComment
    } else {
      await createComment({ variables: formState.values })
    }
    formState.reset()
    reset()
  }

  return (
    <form>
      <Input
        name="body"
        type="textarea"
        formState={formState}
        required
      />
      <Button type="submit" onClick={handleSubmit}>
        Comment
      </Button>
    </form>
  )
}

export default CommentForm
