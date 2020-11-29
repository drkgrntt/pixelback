import { gql } from '@apollo/client'

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
    previous {
      id
    }
    next {
      id
    }
    ratings {
      id
    }
    rateStatus
    publishedAt
    createdAt
    updatedAt
  }
`
