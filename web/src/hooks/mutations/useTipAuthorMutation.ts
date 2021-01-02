import { gql, useMutation } from '@apollo/client'

export const tipAuthorMutation = gql`
  mutation TipAuthor(
    $authorId: String!
    $sourceId: String!
    $amount: Float!
  ) {
    tipAuthor(
      authorId: $authorId
      sourceId: $sourceId
      amount: $amount
    )
  }
`

export const useTipAuthorMutation = () => {
  return useMutation(tipAuthorMutation)
}
