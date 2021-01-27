import { gql, MutationHookOptions, useMutation } from '@apollo/client'
import { StoryInfo } from '@/fragments/StoryInfo'

export const updateStoryMutation = gql`
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

const options: MutationHookOptions = {
  update: (cache) => {
    cache.evict({ fieldName: 'stories:{}' })
    cache.gc()
  },
}

export const useUpdateStoryMutation = () => {
  return useMutation(updateStoryMutation, options)
}
