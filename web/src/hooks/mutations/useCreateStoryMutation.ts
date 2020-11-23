import { gql, useMutation } from '@apollo/client'
import { StoryInfo } from '@/fragments/StoryInfo'

export const useCreateStoryMutation = () => {
  const CREATE_STORY = gql`
    mutation CreateStory(
      $title: String!
      $summary: String!
      $body: String!
      $status: Float!
      $enableCommenting: Boolean!
    ) {
      createStory(
        title: $title
        summary: $summary
        body: $body
        status: $status
        enableCommenting: $enableCommenting
      ) {
        ...StoryInfo
      }
    }
    ${StoryInfo}
  `

  return useMutation(CREATE_STORY)
}
