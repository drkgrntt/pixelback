import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { StoryInfo } from '../fragments/StoryInfo'

export const storyQuery = gql`
  query Story($id: String!) {
    story(id: $id) {
      ...StoryInfo
      chapters {
        id
        title
        number
      }
    }
  }
  ${StoryInfo}
`

export const useStoryQuery = (options?: QueryHookOptions) => {
  return useQuery(storyQuery, options)
}
