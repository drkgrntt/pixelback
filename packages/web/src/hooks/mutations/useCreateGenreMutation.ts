import { gql, useMutation } from '@apollo/client'

export const createGenreMutation = gql`
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

export const useCreateGenreMutation = () => {
  return useMutation(createGenreMutation)
}
