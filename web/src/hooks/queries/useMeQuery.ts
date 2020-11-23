import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { UserInfo } from '@/fragments/UserInfo'

export const useMeQuery = () => {
  const ME = gql`
    query Me {
      me {
        ...UserInfo
        stories {
          id
          title
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

  return (options?: QueryHookOptions) => useQuery(ME, options)
}
