import { gql, useMutation } from '@apollo/client'
import { StoryInfo } from '@/fragments/StoryInfo'

export const removeGenreFromStoryMutation = gql`
  mutation RemoveGenreFromStory(
    $genreId: String!
    $storyId: String!
  ) {
    removeGenreFromStory(genreId: $genreId, storyId: $storyId) {
      ...StoryInfo
      genres {
        id
        name
      }
      chapters {
        id
        title
        number
      }
    }
  }
  ${StoryInfo}
`

export const useRemoveGenreFromStoryMutation = () => {
  return useMutation(removeGenreFromStoryMutation)
}
