import { gql, useMutation } from '@apollo/client'
import { StoryInfo } from '@/fragments/StoryInfo'

export const useRemoveGenreFromStoryMutation = () => {
  const REMOVE_GENRE_FROM_STORY = gql`
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

  return useMutation(REMOVE_GENRE_FROM_STORY)
}
