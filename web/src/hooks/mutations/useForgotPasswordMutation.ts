import { gql, useMutation } from '@apollo/client'

export const forgotPasswordMutation = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`

export const useForgotPasswordMutation = () => {
  return useMutation(forgotPasswordMutation)
}
