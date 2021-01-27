import { gql, useMutation } from '@apollo/client'

export const exchangeTokenMutation = gql`
  mutation ExchangeToken($token: String) {
    exchangeToken(token: $token) {
      value
    }
  }
`

export const useExchangeTokenMutation = () => {
  return useMutation(exchangeTokenMutation)
}
