import { gql, useMutation, MutationHookOptions } from '@apollo/client'

export const logoutEverywhereMutation = gql`
  mutation LogoutEverywhere {
    logoutEverywhere {
      value
    }
  }
`

export const useLogoutEverywhereMutation = () => {
  const options: MutationHookOptions = {
    update: (cache, result) => {
      localStorage.setItem('token', result.data?.logoutEverywhere.value)
    }
  }

  return useMutation(logoutEverywhereMutation, options)
}
