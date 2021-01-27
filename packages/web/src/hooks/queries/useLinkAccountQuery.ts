import { gql, QueryHookOptions, useQuery } from '@apollo/client'

export const linkAccountQuery = gql`
  query LinkAccount {
    linkAccount
  }
`

export const useLinkAccountQuery = (
  options: QueryHookOptions = {}
) => {
  return useQuery(linkAccountQuery, options)
}
