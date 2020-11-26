import { gql, MutationHookOptions, useMutation } from '@apollo/client'
import { meQuery } from '@/queries/useMeQuery'

export const logoutMutation = gql`
  mutation Logout {
    logout
  }
`

export const useLogoutMutation = () => {
  const options: MutationHookOptions = {
    update: (cache) => {
      cache.writeQuery({
        query: meQuery,
        data: {
          __typename: "Query",
          me: null,
        },
      })
      localStorage.removeItem('token')
    }
  }

  return useMutation(logoutMutation, options)
}
