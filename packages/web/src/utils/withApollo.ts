import { NextPageContext } from 'next'
import { Story } from '@pixelback/shared'
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createWithApollo } from './createWithApollo'

const createClient = (ctx: NextPageContext) => {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
  })

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        cookie:
          (typeof window === 'undefined'
            ? ctx?.req?.headers.cookie
            : undefined) || '',
      },
    }
  })

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

  interface PageData {
    hasMore: boolean
    skip?: number
  }

  interface PaginatedResponse {
    pageData: PageData
    stories: Story[]
  }

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

  if (typeof window !== 'undefined') {
    inMemoryCache.restore(
      __NEXT_DATA__.props.pageProps.apolloState || {}
    )
  }

  return new ApolloClient({
    link: dataMutationLink.concat(authLink).concat(httpLink),
    cache: inMemoryCache,
    name: 'react-web-client',
    version: '1.0.0',
  })
}

export const withApollo = createWithApollo(createClient)
