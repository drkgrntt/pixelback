import { gql, MutationHookOptions, useMutation } from '@apollo/client'
import { StoryInfo } from '@/fragments/StoryInfo'
import { meQuery } from '@/queries/useMeQuery'
import { User } from '@/types'

export const createStoryMutation = gql`
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

export const useCreateStoryMutation = () => {
  const options: MutationHookOptions = {
    update: (cache, result) => {
      const meRes = cache.readQuery<{ me: User }>({ query: meQuery })
      if (!meRes) return
      cache.writeQuery({
        query: meQuery,
        data: {
          __typename: "Query",
          me: {
            ...meRes.me,
            stories: [...meRes.me.stories, result.data.createStory]
          }
        }
      })
    }
  }

  return useMutation(createStoryMutation, options)
}
