import { gql, MutationHookOptions, useMutation } from '@apollo/client'
import { UserInfo } from '@/fragments/UserInfo'
import { meQuery } from '@/queries/useMeQuery'

export const registerMutation = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      user {
        ...UserInfo
        paymentMethods {
          id
          brand
          last4
          expMonth
          expYear
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

export const useRegisterMutation = () => {
  const options: MutationHookOptions = {
    update: (cache, result) => {
      cache.writeQuery({
        query: meQuery,
        data: {
          __typename: 'Query',
          me: result.data?.register.user,
        },
      })
    },
  }

  return useMutation(registerMutation, options)
}
