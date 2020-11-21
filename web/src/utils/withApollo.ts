import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink
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

/**
 * The server will return dates as stringified unix timestanps,
 * so this will to convert those to date objects
 */
const convertDates = (data: any) => {
  Object.keys(data).forEach(key => {
    switch (typeof data[key]) {
      case 'string':
        if (
          key === 'createdAt' ||
          key === 'publishedAt' ||
          key === 'updatedAt'
        ) {
          // This is what we came here to do
          data[key] = new Date(parseInt(data[key]))
        }
        break
      case 'object':
        if (Array.isArray(data[key])) {
          data[key].forEach((item: any) => convertDates(item))
          break
        }
        convertDates(data[key])
        break
    }
  })

  return data
}

const dataMutationLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((data) => {
    data = convertDates(data)
    return data
  })
})

export const client = new ApolloClient({
  link: dataMutationLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache(),
  name: 'react-web-client',
  version: '1.0.0',
  ssrMode: true
})

export default withApollo(client)
