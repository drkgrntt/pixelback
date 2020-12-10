import { gql, useMutation } from '@apollo/client'

export const logoutEverywhereMutation = gql`
  mutation LogoutEverywhere {
    logoutEverywhere {
      value
    }
  }
`

export const useLogoutEverywhereMutation = () => {
  return useMutation(logoutEverywhereMutation)
}
