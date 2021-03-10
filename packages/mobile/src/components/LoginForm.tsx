import React, { FC, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useLoginMutation } from '@pixelback/shared'
import { verifyEmailSyntax } from '../util/verifyEmailSyntax'
import { verifyPasswordSyntax } from '../util/verifyPasswordSyntax'
import Input from './Input'
import Button from './Button'
import theme from '../theme'

const INITIAL_STATE = {
  email: '',
  emailValidation: '',
  password: '',
  passwordValidation: '',
  validation: '',
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
      <Button onPress={handleSubmit}>Login</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  validation: {
    fontSize: theme.sizes.text,
    color: theme.colors.error,
  },
})

export default LoginForm
