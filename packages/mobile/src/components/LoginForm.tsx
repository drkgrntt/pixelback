import React, { FC, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useLoginMutation } from '@pixelback/shared'
import { verifyEmailSyntax } from '../util/verifyEmailSyntax'
import { verifyPasswordSyntax } from '../util/verifyPasswordSyntax'
import Input from './Input'
import Button from './Button'
import Text from './Text'
import { useNavigation } from '@react-navigation/native'

const INITIAL_STATE = {
  email: '',
  emailValidation: '',
  password: '',
  passwordValidation: '',
  validation: '',
}

const LoginForm: FC<{}> = () => {
  const navigation = useNavigation()
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
      navigation.navigate('Profile')
    } catch (err) {
      setState('validation', err.message)
    }
  }

  return (
    <View style={styles.container}>
      <Input
        label="Email"
        value={values.email}
        onChange={(value) => setState('email', value)}
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
        onChange={(value) => setState('password', value)}
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
      <Text validation>{values.validation}</Text>
      <Button onPress={handleSubmit}>Login</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
})

export default LoginForm
