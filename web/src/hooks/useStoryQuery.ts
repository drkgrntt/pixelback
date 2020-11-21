import { gql, useQuery } from '@apollo/client'

export const useStoryQuery = (variables: { id: string }) => {
  const STORY = gql`
    query Story($id: String!) {
      story(id: $id) {
        id
        title
        body
        summary
        enableCommenting
        status
        publishedAt
        createdAt
        updatedAt
      }
    }
  `

  return useQuery(STORY, { variables })
}
