import { gql, MutationHookOptions, useMutation } from '@apollo/client'

export const deleteStory = gql`
  mutation DeleteStory($id: String!) {
    deleteStory(id: $id)
  }
`

export const useDeleteStoryMutation = () => {
  const options: MutationHookOptions = {
    update: (cache, result) => {
      cache.evict({ id: `Story:${result.data?.deleteStory}` })
    }
  }

  return useMutation(deleteStory, options)
}
