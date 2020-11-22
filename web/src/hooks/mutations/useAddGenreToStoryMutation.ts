import { gql, useMutation } from '@apollo/client'

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
        id
        title
        body
        summary
        enableCommenting
        status
        score
        genres {
          id
          name
        }
        chapters {
          id
          title
          number
        }
        publishedAt
        createdAt
        updatedAt
      }
    }
  `

  return useMutation(ADD_GENRE_TO_STORY)
}
