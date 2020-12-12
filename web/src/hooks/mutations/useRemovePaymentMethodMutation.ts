import { gql, MutationHookOptions, useMutation } from '@apollo/client'

export const removePaymeneMethodMutation = gql`
  mutation RemovePaymentMethod($sourceId: String!) {
    removePaymentMethod(sourceId: $sourceId)
  }
`

export const useRemovePaymentMethodMutation = () => {
  const options: MutationHookOptions = {
    update: (cache, result) => {
      cache.evict({
        id: `StripeSource:${result.data?.removePaymentMethod}`,
      })
    },
  }

  return useMutation(removePaymeneMethodMutation, options)
}
