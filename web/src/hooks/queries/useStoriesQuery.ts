import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { StoryInfo } from '@/fragments/StoryInfo'

export const storiesQuery = gql`
  query Stories($skip: Float, $take: Float) {
    stories(skip: $skip, take: $take) {
      pageData {
        hasMore
        skip
      }
      stories {
        ...StoryInfo
        author {
          id
          penName
        }
        chapters {
          id
          title
          number
        }
      }
    }
  }
  ${StoryInfo}
`

export const useStoriesQuery = (options?: QueryHookOptions) => {
  return useQuery(storiesQuery, options)
}
