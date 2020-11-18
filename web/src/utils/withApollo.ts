import { ApolloClient, InMemoryCache } from '@apollo/client'
import { withApollo } from 'next-apollo'


const client = new ApolloClient({
  uri: "http://localhost:5757/graphql",
  cache: new InMemoryCache()
})

export default withApollo(client)
