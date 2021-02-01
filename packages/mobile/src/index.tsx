import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { ApolloProvider } from '@apollo/client'
import { View } from 'react-native'
import { client } from './apollo'
import Layout from './components/Layout'
import LoginForm from './components/LoginForm'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <LoginForm />
        <StatusBar style="auto" />
      </Layout>
    </ApolloProvider>
  )
}

export default App
