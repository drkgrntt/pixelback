import { gql, useMutation } from '@apollo/client'
import { CommentInfo } from '../fragments/CommentInfo'

export const editCommentMutation = gql`
  mutation Comment($body: String!, $id: String!) {
    editComment(body: $body, id: $id) {
      ...CommentInfo
    }
  }
  ${CommentInfo}
`

export const useEditCommentMutation = () => {
  return useMutation(editCommentMutation)
}
