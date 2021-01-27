import { gql, MutationHookOptions, useMutation } from '@apollo/client'

export const deleteStoryMutation = gql`
  mutation DeleteStory($id: String!) {
    deleteStory(id: $id)
  }
`

export const useDeleteStoryMutation = () => {
  const options: MutationHookOptions = {
    update: (cache, result) => {
      cache.evict({ id: `Story:${result.data?.deleteStory}` })
      cache.gc()
    },
  }

  return useMutation(deleteStoryMutation, options)
}
