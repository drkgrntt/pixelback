import { gql, useQuery } from '@apollo/client'

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
        }
        ratings {
          id
        }
        subscriptions {
          id
        }
        subscribers {
          id
        }
        createdAt
        updatedAt
      }
    }
  `
  
  return useQuery(ME)
}
