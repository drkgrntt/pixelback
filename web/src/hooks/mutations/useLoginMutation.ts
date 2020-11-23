import { gql, useMutation } from '@apollo/client'
import { UserInfo } from '@/fragments/UserInfo'

export const useLoginMutation = () => {
  const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        user {
          ...UserInfo
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

  return useMutation(LOGIN)
}
