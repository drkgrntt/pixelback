import { gql, useMutation } from '@apollo/client'

export const resetPasswordMutation = gql`
  mutation ResetPassword(
    $oldPassword: String!
    $newPassword: String!
  ) {
    resetPassword(
      oldPassword: $oldPassword
      newPassword: $newPassword
    )
  }
`

export const useResetPasswordMutation = () => {
  return useMutation(resetPasswordMutation)
}
