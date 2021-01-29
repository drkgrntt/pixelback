import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { StoryInfo } from '../fragments/StoryInfo'

export const searchStoriesQuery = gql`
  query SearchStories($search: String!, $skip: Float, $take: Float) {
    searchStories(search: $search, skip: $skip, take: $take) {
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

export const useSearchStoriesQuery = (options?: QueryHookOptions) => {
  return useQuery(searchStoriesQuery, options)
}
