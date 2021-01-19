import { gql, MutationHookOptions, useMutation } from '@apollo/client'

export const unsubscribeMutation = gql`
  mutation Unsubscribe($id: String!) {
    unsubscribe(id: $id)
  }
`

export const useUnsubscribeMutation = () => {
  const options: MutationHookOptions = {
    update: (cache, result) => {
      cache.evict({ id: `Subscription:${result.data?.unsubscribe}` })
      cache.gc()
    },
  }

  return useMutation(unsubscribeMutation, options)
}
