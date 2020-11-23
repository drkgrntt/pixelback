import { gql } from '@apollo/client'

export const UserInfo = gql`
  fragment UserInfo on User {
    id
    email
    role
    displayName
    createdAt
    updatedAt
  }
`
