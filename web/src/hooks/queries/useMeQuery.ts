import { gql, QueryHookOptions, useQuery } from '@apollo/client'
import { UserInfo } from '@/fragments/UserInfo'

export const meQuery = gql`
  query Me {
    me {
      ...UserInfo
      paymentMethods {
        id
        brand
        last4
        exp_month
        exp_year
      }
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
  return useQuery(meQuery, options)
}
