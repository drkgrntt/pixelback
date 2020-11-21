import { gql, useMutation } from '@apollo/client'

export const useLoginMutation = () => {
  const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
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

  return useMutation(LOGIN)
}
