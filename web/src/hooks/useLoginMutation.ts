import { gql, useMutation } from '@apollo/client'

export const useLoginMutation = () => {

  const LOGIN = gql`
    mutation Login($email: String! $password: String!) {
      login(
        email: $email
        password: $password
      ) {
        user {
          id
          email
          displayName
          role
        }
        token {
          value
        }
      }
    }
  `
  
  return useMutation(LOGIN)
}
