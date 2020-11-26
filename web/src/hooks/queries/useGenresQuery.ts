import { gql, QueryHookOptions, useQuery } from '@apollo/client'

export const genresQuery = gql`
  query Genres($search: String!) {
    genres(search: $search) {
      id
      name
    }
  }
`

export const useGenresQuery = (options?: QueryHookOptions) => {
  return useQuery(genresQuery, options)
}
