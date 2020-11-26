import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { StoryInfo } from '@/fragments/StoryInfo'

export const useStoryQuery = (options?: QueryHookOptions) => {
  const STORY = gql`
    query Story($id: String!) {
      story(id: $id) {
        ...StoryInfo
        genres {
          id
          name
        }
        chapters {
          id
          title
          number
        }
      }
    }
    ${StoryInfo}
  `

  return useQuery(STORY, options)
}
