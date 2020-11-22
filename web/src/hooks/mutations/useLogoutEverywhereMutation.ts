import { gql, useMutation } from '@apollo/client'

export const useLogoutEverywhereMutation = () => {
  const LOGOUT_EVERYWHERE = gql`
    mutation LogoutEverywhere {
      logoutEverywhere {
        value
      }
    }
  `

  return useMutation(LOGOUT_EVERYWHERE)
}
