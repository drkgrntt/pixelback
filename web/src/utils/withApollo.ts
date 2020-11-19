import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { withApollo } from 'next-apollo'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default withApollo(client)
