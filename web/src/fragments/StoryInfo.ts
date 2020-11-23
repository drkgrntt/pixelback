import { gql } from '@apollo/client'

export const StoryInfo = gql`
  fragment StoryInfo on Story {
    id
    title
    body
    summary
    enableCommenting
    status
    score
    publishedAt
    createdAt
    updatedAt
  }
`
