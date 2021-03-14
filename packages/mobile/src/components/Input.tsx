import React, { FC } from 'react'
import {
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  View,
} from 'react-native'
import Picker from 'react-native-picker-select'
import theme from '../theme'
import Text from './Text'

interface Props {
  type?: 'text' | 'single-select'
  options?: { label: string; value: string | number }[]
  value: string | number
  onChange: (newValue: any) => void
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
  type = 'text',
  options = [],
  value,
  onChange,
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
  const renderPickerInput = () => {
    return (
      <Picker
        style={{
          inputAndroid: styles.pickerText,
          inputIOS: styles.pickerText,
          viewContainer: styles.pickerInput,
        }}
        items={options}
        value={value}
        onValueChange={onChange}
      />
    )
  }

  const renderTextInput = () => {
    return (
      <TextInput
        style={styles.textInput}
        value={value.toString()}
        onChangeText={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        numberOfLines={numberOfLines}
        autoCompleteType={autoCompleteType}
        secureTextEntry={secureTextEntry}
        textAlign={textAlign}
        textContentType={textContentType}
        autoCapitalize={autoCapitalize}
      />
    )
  }

  const renderInput = {
    text: renderTextInput,
    'single-select': renderPickerInput,
  }

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      {renderInput[type]()}
      <Text validation>{validation}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  textInput: {
    padding: 10,
    height: 40,
    borderColor: theme.colors.grey,
    borderWidth: 1,
    borderRadius: 20,
  },
  pickerInput: {
    borderColor: theme.colors.grey,
    borderWidth: 1,
    borderRadius: 20,
    height: 40,
  },
  pickerText: {
    height: 40,
    color: theme.colors.greyDark,
  },
})

export default Input
