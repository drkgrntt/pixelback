import { gql, useMutation } from '@apollo/client'
import { StoryInfo } from '@/fragments/StoryInfo'

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
        ...StoryInfo
      }
    }
    ${StoryInfo}
  `

  return useMutation(UPDATE_STORY)
}
