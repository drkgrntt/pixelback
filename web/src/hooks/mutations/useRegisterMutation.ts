import { gql, useMutation } from '@apollo/client'
import { UserInfo } from '@/fragments/UserInfo'

export const useRegisterMutation = () => {
  const REGISTER = gql`
    mutation Register($email: String!, $password: String!) {
      register(email: $email, password: $password) {
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

  return useMutation(REGISTER)
}
