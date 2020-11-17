import '../styles/globals.scss'

const App = ({ Component, pageProps }: { Component: React.FC, pageProps: any }) => {
  return <Component {...pageProps} />
}

export default App
