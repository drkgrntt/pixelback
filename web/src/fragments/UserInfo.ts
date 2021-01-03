import { gql } from '@apollo/client'

export const UserInfo = gql`
  fragment UserInfo on User {
    id
    email
    role
    penName
    canAcceptPayments
    favoriteStories {
      id
      title
      author {
        id
        penName
      }
      genres {
        id
        name
      }
    }
    createdAt
    updatedAt
  }
`
