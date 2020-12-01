import { gql } from '@apollo/client'

export const UserInfo = gql`
  fragment UserInfo on User {
    id
    email
    role
    penName
    favoriteStories {
      id
      title
      author {
        id
        penName
      }
    }
    createdAt
    updatedAt
  }
`
