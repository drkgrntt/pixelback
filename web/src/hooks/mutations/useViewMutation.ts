import { gql, useMutation } from '@apollo/client'

export const viewMutation = gql`
  mutation View(
    $storyId: String!
    $chapterId: String
  ) {
    view(
      storyId: $storyId
      chapterId: $chapterId
    ) {
      id
    }
  }
`

export const useViewMutation = () => {
  return useMutation(viewMutation)
}
