import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'

const Login: FC<{}> = (props) => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text h2>Login</Text>
        <LoginForm />
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
  },
})

export default Login
