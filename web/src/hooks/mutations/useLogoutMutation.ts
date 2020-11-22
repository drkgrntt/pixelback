import { gql, useMutation } from '@apollo/client'

export const useLogoutMutation = () => {
  const LOGOUT = gql`
    mutation Logout {
      logout
    }
  `

  return useMutation(LOGOUT)
}
