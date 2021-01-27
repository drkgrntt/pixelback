import { gql } from '@apollo/client'

export const CommentInfo = gql`
  fragment CommentInfo on Comment {
    id
    body
    updatedAt
    createdAt
    author {
      id
      penName
    }
  }
`
