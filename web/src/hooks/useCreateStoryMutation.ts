import { gql, useMutation } from '@apollo/client'

export const useCreateStoryMutation = () => {
  const CREATE_STORY = gql`
    mutation CreateStory(
      $title: String!
      $summary: String!
      $body: String!
      $status: Float!
      $enableCommenting: Boolean!
      $genreIds: [String!]!
    ) {
      createStory(
        title: $title
        summary: $summary
        body: $body
        status: $status
        enableCommenting: $enableCommenting
        genreIds: $genreIds
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

  return useMutation(CREATE_STORY)
}
