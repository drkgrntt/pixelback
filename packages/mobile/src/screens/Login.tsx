import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'
import Text from '../components/Text'

const Login: FC<{}> = (props) => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text h1>Login</Text>
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
