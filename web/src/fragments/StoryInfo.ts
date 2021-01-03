import { gql } from '@apollo/client'
import { CommentInfo } from './CommentInfo'

export const StoryInfo = gql`
  fragment StoryInfo on Story {
    id
    title
    body
    summary
    enableCommenting
    status
    score
    authorId
    author {
      id
      penName
    }
    reads
    ratings {
      id
      score
    }
    comments {
      ...CommentInfo
    }
    genres {
      id
      name
    }
    rateStatus
    publishedAt
    createdAt
    updatedAt
  }
  ${CommentInfo}
`
