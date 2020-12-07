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
        level
        subscribedTo {
          id
          penName
        }
      }
      subscribers {
        id
        level
      }
      comments {
        id
        author {
          id
        }
        body
        story {
          id
          title
        }
        chapter {
          id
          title
          story {
            id
          }
        }
        createdAt
        updatedAt
      }
    }
  }
  ${UserInfo}
`

export const useMeQuery = (options: QueryHookOptions = {}) => {
  let token
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token')
  }
  options.skip = options.skip || !token
  return useQuery(meQuery, options)
}
