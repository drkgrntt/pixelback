import { gql, useMutation } from '@apollo/client'
import { UserInfo } from '@/fragments/UserInfo'

export const removeFavoriteStoryMutation = gql`
  mutation RemoveFavoriteStory($storyId: String!) {
    removeFavoriteStory(storyId: $storyId) {
      ...UserInfo
    }
  }
  ${UserInfo}
`

export const useRemoveFavoriteStoryMutation = () => {
  return useMutation(removeFavoriteStoryMutation)
}
