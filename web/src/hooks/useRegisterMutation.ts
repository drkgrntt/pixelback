import { gql, useMutation } from '@apollo/client'

export const useRegisterMutation = () => {
  const REGISTER = gql`
    mutation Register($email: String!, $password: String!) {
      register(email: $email, password: $password) {
        user {
          id
          email
          role
          displayName
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
          createdAt
          updatedAt
        }
        token {
          value
        }
      }
    }
  `

  return useMutation(REGISTER)
}
