import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { ApolloProvider } from '@apollo/client'
import { StyleSheet, View } from 'react-native'
import { client } from './apollo'
import LoginForm from './components/LoginForm'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <LoginForm />
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
