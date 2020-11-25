import { gql, useMutation } from '@apollo/client'

export const useDeleteStoryMutation = () => {
  const DELETE_STORY = gql`
    mutation DeleteStory($id: String!) {
      deleteStory(id: $id)
    }
  `

  return useMutation(DELETE_STORY)
}
