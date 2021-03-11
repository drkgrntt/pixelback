import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import RegisterForm from '../components/RegisterForm'
import Layout from '../components/Layout'
import Text from '../components/Text'

const Register: FC<{}> = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text h1>Register</Text>
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
