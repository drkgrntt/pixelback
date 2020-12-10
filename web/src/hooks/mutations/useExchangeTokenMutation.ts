import { gql, useMutation } from '@apollo/client'

export const exchangeTokenMutation = gql`
  mutation ExchangeToken {
    exchangeToken {
      value
    }
  }
`

export const useExchangeTokenMutation = () => {
  return useMutation(exchangeTokenMutation)
}
