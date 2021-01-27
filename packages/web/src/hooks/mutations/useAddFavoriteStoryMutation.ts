import { gql, useMutation } from '@apollo/client'
import { UserInfo } from '@/fragments/UserInfo'

export const addFavoriteStoryMutation = gql`
  mutation AddFavoriteStory($storyId: String!) {
    addFavoriteStory(storyId: $storyId) {
      ...UserInfo
    }
  }
  ${UserInfo}
`

export const useAddFavoriteStoryMutation = () => {
  return useMutation(addFavoriteStoryMutation)
}
