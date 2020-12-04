import { gql, useMutation } from '@apollo/client'

export const giveFeedbackMutation = gql`
  mutation GiveFeedback(
    $type: Float!
    $firstName: String!
    $lastName: String!
    $email: String!
    $summary: String!
    $details: String!
  ) {
    giveFeedback(
      type: $type
      firstName: $firstName
      lastName: $lastName
      email: $email
      summary: $summary
      details: $details
    )
  }
`

export const useGiveFeedbackMutation = () => {
  return useMutation(giveFeedbackMutation)
}
