import { gql, useMutation } from '@apollo/client'

export const readMutation = gql`
  mutation Read(
    $storyId: String!
    $chapterId: String
  ) {
    read(
      storyId: $storyId
      chapterId: $chapterId
    ) {
      id
    }
  }
`

export const useReadMutation = () => {
  return useMutation(readMutation)
}
