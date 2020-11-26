import { gql, MutationHookOptions, useMutation } from '@apollo/client'

export const deleteChapterMutation = gql`
  mutation DeleteChapter($id: String!) {
    deleteChapter(id: $id)
  }
`

export const useDeleteChapterMutation = () => {
  const options: MutationHookOptions = {
    update: (cache, result) => {
      cache.evict({ id: `Chapter:${result.data?.deleteChapter}` })
    }
  }

  return useMutation(deleteChapterMutation, options)
}
