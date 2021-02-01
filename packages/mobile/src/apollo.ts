import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from '@apollo/client'
import { Story } from '@pixelback/shared'
import { API_URL } from './env'

interface PageData {
  hasMore: boolean
  skip?: number
}

interface PaginatedResponse {
  pageData: PageData
  stories: Story[]
}

/**
 * The server will return dates as stringified unix timestanps,
 * so this will to convert those to date objects
 */
const convertDates = (data: any) => {
  if (!data) return data
  Object.keys(data).forEach((key) => {
    switch (typeof data[key]) {
      case 'string':
        if (
          key === 'currentPeriodStart' ||
          key === 'currentPeriodEnd' ||
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

const inMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        stories: {
          keyArgs: [],
          merge(
            existing: PaginatedResponse | undefined,
            incoming: PaginatedResponse
          ): PaginatedResponse {
            return {
              ...incoming,
              stories: [
                ...(existing?.stories || []),
                ...incoming.stories,
              ],
            }
          },
        },
      },
    },
  },
})

const httpLink = createHttpLink({
  uri: API_URL,
  credentials: 'include',
})

export const client = new ApolloClient({
  link: dataMutationLink.concat(httpLink),
  cache: inMemoryCache,
  name: 'react-mobile-client',
  version: '1.0.0',
})
