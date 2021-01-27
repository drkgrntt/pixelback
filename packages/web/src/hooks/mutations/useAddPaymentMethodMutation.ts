import { gql, MutationHookOptions, useMutation } from '@apollo/client'
import { meQuery } from '@/queries/useMeQuery'
import { User } from '@/types'

export const addPaymentMethodMutation = gql`
  mutation AddPaymentMethod($sourceId: String!) {
    addPaymentMethod(sourceId: $sourceId) {
      id
      brand
      last4
      expMonth
      expYear
    }
  }
`

export const useAddPaymentMethodMutation = () => {
  const options: MutationHookOptions = {
    update: (cache, result) => {
      const meRes = cache.readQuery<{ me: User }>({ query: meQuery })
      if (!meRes) return
      cache.writeQuery({
        query: meQuery,
        data: {
          __typename: 'Query',
          me: {
            ...meRes.me,
            paymentMethods: [
              ...meRes.me.paymentMethods,
              result.data.addPaymentMethod,
            ],
          },
        },
      })
    },
  }

  return useMutation(addPaymentMethodMutation, options)
}
