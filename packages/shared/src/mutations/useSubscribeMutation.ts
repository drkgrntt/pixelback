import { gql, MutationHookOptions, useMutation } from '@apollo/client'
import { UserInfo } from '../fragments/UserInfo'
import { meQuery } from '../queries/useMeQuery'
import { User } from '../types'

export const subscribeMutation = gql`
  mutation Subscribe($id: String!) {
    subscribe(id: $id) {
      id
      level
      subscriber {
        ...UserInfo
      }
      subscribedTo {
        ...UserInfo
      }
    }
  }
  ${UserInfo}
`

export const useSubscribeMutation = () => {
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
            subscriptions: [
              ...meRes.me.subscriptions,
              result.data.subscribe,
            ],
          },
        },
      })
    },
  }

  return useMutation(subscribeMutation, options)
}
