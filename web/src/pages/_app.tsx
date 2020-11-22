import { ApolloProvider } from '@apollo/client'
import Head from 'next/head'
import '../styles/globals.scss'
import Layout from '@/components/Layout'
import UserProvider from '@/context/UserProvider'
import { client } from '@/utils/withApollo'

const App = ({ Component, pageProps }: { Component: React.FC, pageProps: any }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta name="language" content="en-us" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Pixelback | A platform for creative writers</title>
      </Head>
      <ApolloProvider client={client}>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </ApolloProvider>
    </>
  )
}

export default App
