import { gql, QueryHookOptions, useQuery } from '@apollo/client'

export const useStoryQuery = () => {
  const STORY = gql`
    query Story($id: String!) {
      story(id: $id) {
        id
        title
        body
        summary
        enableCommenting
        status
        score
        genres {
          id
          name
        }
        chapters {
          id
          title
          number
        }
        publishedAt
        createdAt
        updatedAt
      }
    }
  `

  return (options: QueryHookOptions) => useQuery(STORY, options)
}
