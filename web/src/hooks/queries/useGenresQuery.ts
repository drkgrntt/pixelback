import { gql, QueryHookOptions, useQuery } from '@apollo/client'

export const useGenresQuery = (options?: QueryHookOptions) => {
  const GENRES = gql`
    query Genres($search: String!) {
      genres(search: $search) {
        id
        name
      }
    }
  `

  return useQuery(GENRES, options)
}
