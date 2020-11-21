import { gql, useMutation } from '@apollo/client'

export const useUpdateStoryMutation = () => {
  const UPDATE_STORY = gql`
    mutation UpdateStory(
      $id: String!
      $title: String!
      $summary: String!
      $body: String!
      $status: Float!
      $enableCommenting: Boolean!
    ) {
      updateStory(
        id: $id
        title: $title
        summary: $summary
        body: $body
        status: $status
        enableCommenting: $enableCommenting
      ) {
        id
        title
        body
        summary
        enableCommenting
        status
        publishedAt
        createdAt
        updatedAt
      }
    }
  `

  return useMutation(UPDATE_STORY)
}
