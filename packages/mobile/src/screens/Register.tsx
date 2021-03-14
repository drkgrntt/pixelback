import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import RegisterForm from '../components/RegisterForm'
import Layout from '../components/Layout'
import Title from '../components/Title'

const Register: FC<{}> = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Title>Register</Title>
        <RegisterForm />
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
  },
})

export default Register
