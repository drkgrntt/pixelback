import { gql, MutationHookOptions, useMutation } from '@apollo/client'
import { UserInfo } from '@/fragments/UserInfo'
import { meQuery } from '@/queries/useMeQuery'

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        ...UserInfo
        roleSubscription {
          id
          createdAt
          currentPeriodStart
          currentPeriodEnd
          daysUntilDue
        }
        paymentMethods {
          id
          brand
          last4
          expMonth
          expYear
          name
        }
        stories {
          id
          title
        }
        ratings {
          id
        }
        subscriptions {
          id
        }
        subscribers {
          id
          level
        }
      }
      token {
        value
      }
    }
  }
  ${UserInfo}
`

export const useLoginMutation = () => {
  const options: MutationHookOptions = {
    update: (cache, result) => {
      cache.writeQuery({
        query: meQuery,
        data: {
          __typename: 'Query',
          me: result.data?.login.user,
        },
      })
    },
  }

  return useMutation(loginMutation, options)
}
