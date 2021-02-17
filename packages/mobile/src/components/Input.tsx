import React, { FC } from 'react'
import {
  Text,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  View,
} from 'react-native'
import theme from '../theme'

interface Props {
  value: string
  onChangeText: (text: string) => void
  validation?: string
  label?: string
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  placeholder?: string
  numberOfLines?: number
  secureTextEntry?: boolean
  textAlign?: 'center' | 'left' | 'right'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  autoCompleteType?:
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'email'
    | 'name'
    | 'password'
    | 'postal-code'
    | 'street-address'
    | 'tel'
    | 'username'
    | 'off'
  textContentType?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
}

const Input: FC<Props> = ({
  value,
  onChangeText,
  validation,
  label,
  onBlur,
  placeholder,
  numberOfLines,
  autoCompleteType,
  secureTextEntry,
  textAlign,
  textContentType,
  autoCapitalize,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        numberOfLines={numberOfLines}
        autoCompleteType={autoCompleteType}
        secureTextEntry={secureTextEntry}
        textAlign={textAlign}
        textContentType={textContentType}
        autoCapitalize={autoCapitalize}
      />
      <Text style={styles.validation}>{validation}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  label: {
    color: theme.colors.grey,
  },
  input: {
    padding: 10,
    height: 40,
    borderColor: theme.colors.grey,
    borderWidth: 1,
    borderRadius: 3,
  },
  validation: {
    color: theme.colors.error,
  },
})

export default Input
