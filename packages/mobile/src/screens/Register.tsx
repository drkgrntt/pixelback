import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import RegisterForm from '../components/RegisterForm'
import Layout from '../components/Layout'

const Register: FC<{}> = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text h2>Register</Text>
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
