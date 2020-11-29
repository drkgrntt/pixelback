import styles from "./Comments.module.scss"
import { Comment } from '@/types'

interface Props {
  comments: Comment[]
}

const Comments: React.FC<Props> = (props) => {
  return (
    <div>
      These are the comments
    </div>
  )
}

export default Comments
