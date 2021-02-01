import React, { FC, useState } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { useLoginMutation } from '@pixelback/shared'
import Input from './Input'
import theme from '../theme'

const INITIAL_STATE = {
  email: '',
  emailValidation: '',
  password: '',
  passwordValidation: '',
  validation: '',
}

const verifyEmailSyntax = (email: string): boolean => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase())
}

const verifyPasswordSyntax = (password: string): boolean => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return regex.test(String(password))
}

const LoginForm: FC<{}> = () => {
  const [login] = useLoginMutation()
  const [values, setValues] = useState(INITIAL_STATE)
  const setState = (
    key: keyof typeof INITIAL_STATE,
    value: string
  ) => {
    setValues({ ...values, [key]: value })
  }

  const handleSubmit = async () => {
    if (values.validation) {
      setState('validation', '')
    }
    if (values.emailValidation || values.passwordValidation) {
      setState(
        'validation',
        'Please enter a valid email and password.'
      )
      return
    }
    try {
      await login({ variables: values })
      setValues(INITIAL_STATE)
    } catch (err) {
      setState('validation', err.message)
    }
  }

  return (
    <View style={styles.container}>
      <Input
        label="Email"
        value={values.email}
        onChangeText={(value) => setState('email', value)}
        textContentType="emailAddress"
        autoCompleteType="email"
        validation={values.emailValidation}
        autoCapitalize="none"
        onBlur={() => {
          if (values.emailValidation) {
            setState('emailValidation', '')
          }
          if (!verifyEmailSyntax(values.email)) {
            setState('emailValidation', 'Invalid email')
          }
        }}
      />
      <Input
        label="Password"
        value={values.password}
        onChangeText={(value) => setState('password', value)}
        autoCompleteType="password"
        validation={values.passwordValidation}
        autoCapitalize="none"
        onBlur={() => {
          if (values.passwordValidation) {
            setState('passwordValidation', '')
          }
          if (!verifyPasswordSyntax(values.password)) {
            setState(
              'passwordValidation',
              'Invalid password. Make sure it is at least 8 characters and includes at least 1 letter and 1 number.'
            )
          }
        }}
        secureTextEntry
      />
      <Text style={styles.validation}>{values.validation}</Text>
      <Button
        color={theme.colors.primary}
        title="login"
        onPress={handleSubmit}
      >
        Login
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  validation: {
    color: theme.colors.error,
  },
})

export default LoginForm
