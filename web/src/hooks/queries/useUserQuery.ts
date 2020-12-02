import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { UserInfo } from '@/fragments/UserInfo'

export const userQuery = gql`
  query User($id: String!) {
    user(id: $id) {
      ...UserInfo
      stories {
        id
        title
        genres {
          id
          name
        }
      }
      subscribers {
        id
        level
      }
    }
  }
  ${UserInfo}
`

export const useUserQuery = (options?: QueryHookOptions) => {
  return useQuery(userQuery, options)
}
