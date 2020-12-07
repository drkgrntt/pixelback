import Head from 'next/head'
import '../styles/globals.scss'
import Layout from '@/components/Layout'
import { withApollo } from '@/utils/withApollo'
import { NextPage } from 'next'

const App = ({
  Component,
  pageProps,
}: {
  Component: NextPage
  pageProps: Record<string, any>
}) => {
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
        <script src="https://kit.fontawesome.com/6d08f4a1f7.js"></script>
        <link
          href="https://fonts.googleapis.com/css?family=Lato:300,400,700|Montserrat:200,300,400,500,600,700"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Raleway:400,500,600&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default withApollo({ ssr: false })(App as any)
