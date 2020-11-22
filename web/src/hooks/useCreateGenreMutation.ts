import { gql, useMutation } from '@apollo/client'

export const useCreateGenreMutation = () => {
  const CREATE_GENRE = gql`
    mutation CreateGenre(
      $name: String!
    ) {
      createGenre(
        name: $name
      ) {
        id
        name
      }
    }
  `

  return useMutation(CREATE_GENRE)
}
