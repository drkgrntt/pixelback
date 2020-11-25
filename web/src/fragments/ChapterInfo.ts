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
    previous {
      id
    }
    next {
      id
    }
    publishedAt
    createdAt
    updatedAt
  }
`
