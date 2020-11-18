import { gql, useMutation } from '@apollo/client'

export const useRegisterMutation = () => {

  const REGISTER = gql`
    mutation Register($email: String! $password: String!) {
      register(
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
  
  return useMutation(REGISTER)
}
