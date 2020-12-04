import { gql, useMutation, MutationHookOptions } from '@apollo/client'

export const exchangeTokenMutation = gql`
  mutation LogoutEverywhere {
    exchangeToken {
      value
    }
  }
`

export const useExchangeTokenMutation = () => {
  const options: MutationHookOptions = {
    update: (cache, result) => {
      localStorage.setItem('token', result.data?.exchangeToken.value)
    },
  }

  return useMutation(exchangeTokenMutation, options)
}
