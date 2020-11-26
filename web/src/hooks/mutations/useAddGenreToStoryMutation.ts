import { gql, useMutation } from '@apollo/client'
import { StoryInfo } from '@/fragments/StoryInfo'

export const addGenreToStoryMutation = gql`
  mutation AddGenreToStory($genreId: String!, $storyId: String!) {
    addGenreToStory(genreId: $genreId, storyId: $storyId) {
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

export const useAddGenreToStoryMutation = () => {
  return useMutation(addGenreToStoryMutation)
}
