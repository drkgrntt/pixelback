import { gql, MutationHookOptions, useMutation } from '@apollo/client'

export const deleteCommentMutation = gql`
  mutation DeleteComment($id: String!) {
    deleteComment(id: $id)
  }
`

export const useDeleteCommentMutation = () => {
  const options: MutationHookOptions = {
    update: (cache, result) => {
      cache.evict({ id: `Comment:${result.data?.deleteComment}` })
      cache.gc()
    },
  }

  return useMutation(deleteCommentMutation, options)
}
