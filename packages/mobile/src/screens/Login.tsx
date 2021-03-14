import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'
import Title from '../components/Title'

const Login: FC<{}> = (props) => {
  return (
    <Layout>
      <View style={styles.container}>
        <Title>Login</Title>
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
