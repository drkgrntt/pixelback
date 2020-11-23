import { gql, useMutation } from '@apollo/client'
import { StoryInfo } from '@/fragments/StoryInfo'

export const useAddGenreToStoryMutation = () => {
  const ADD_GENRE_TO_STORY = gql`
    mutation AddGenreToStory(
      $genreId: String!
      $storyId: String!
    ) {
      addGenreToStory(
        genreId: $genreId
        storyId: $storyId
      ) {
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

  return useMutation(ADD_GENRE_TO_STORY)
}
