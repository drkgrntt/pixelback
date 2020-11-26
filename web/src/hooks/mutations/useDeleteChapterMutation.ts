import { gql, MutationHookOptions, useMutation } from '@apollo/client'

export const useDeleteChapterMutation = () => {
  const DELETE_CHAPTER = gql`
    mutation DeleteChapter($id: String!) {
      deleteChapter(id: $id)
    }
  `

  return useMutation(DELETE_CHAPTER)
}
