import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { UserInfo } from '@/fragments/UserInfo'

export const meQuery = gql`
  query Me {
    me {
      ...UserInfo
      stories {
        id
        title
        genres {
          id
          name
        }
      }
      ratings {
        id
      }
      subscriptions {
        id
      }
      subscribers {
        id
        level
      }
    }
  }
  ${UserInfo}
`

export const useMeQuery = (options?: QueryHookOptions) => {
  return useQuery(meQuery, options)
}
