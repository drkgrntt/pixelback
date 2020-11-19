import Head from 'next/head'
import '../styles/globals.scss'
import Layout from '../components/Layout'

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
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App
