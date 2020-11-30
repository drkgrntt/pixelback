import { gql } from '@apollo/client'

export const CommentInfo = gql`
  fragment CommentInfo on Comment {
    id
    body
    createdAt
    author {
      id
      penName
    }
  }
`
