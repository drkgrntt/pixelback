import { gql } from '@apollo/client'
import { CommentInfo } from './CommentInfo'

export const ChapterInfo = gql`
  fragment ChapterInfo on Chapter {
    id
    number
    title
    body
    summary
    enableCommenting
    status
    score
    reads
    author {
      id
    }
    previous {
      id
    }
    next {
      id
    }
    ratings {
      id
    }
    comments {
      ...CommentInfo
    }
    rateStatus
    publishedAt
    createdAt
    updatedAt
  }
  ${CommentInfo}
`
