import { gql, QueryHookOptions, useQuery } from '@apollo/client'

export const useGenresQuery = () => {
  const GENRES = gql`
    query Genres($search: String!) {
      genres(search: $search) {
        id
        name
      }
    }
  `

  return (options?: QueryHookOptions) => useQuery(GENRES, options)
}
