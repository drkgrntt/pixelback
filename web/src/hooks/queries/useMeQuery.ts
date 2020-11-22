import { gql, QueryHookOptions, useQuery } from '@apollo/client'

export const useMeQuery = () => {
  const ME = gql`
    query Me {
      me {
        id
        email
        role
        displayName
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
        createdAt
        updatedAt
      }
    }
  `

  return (options?: QueryHookOptions) => useQuery(ME, options)
}
