import React, { FC } from 'react'
import { Text, StyleSheet } from 'react-native'
import theme from '../theme'
import Title from './Title'

interface Props {
  validation?: boolean
  p?: boolean
  a?: boolean
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  style?: object
}

const CustomText: FC<Props> = ({ style = {}, ...props }) => {
  if (props.h1 || props.h2 || props.h3 || props.h4) {
    return <Title {...props} />
  }

  let type: keyof typeof styles = 'p'
  switch (true) {
    case props.validation:
      type = 'validation'
      break

    case props.a:
      type = 'a'
      break

    case props.p:
    default:
      type = 'p'
      break
  }

  return (
    <Text style={{ ...styles.text, ...styles[type], ...style }}>
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: theme.sizes.text,
  },
  p: {
    color: theme.colors.greyDark,
  },
  validation: {
    color: theme.colors.error,
  },
  a: {
    color: theme.colors.grey,
  },
})

export default CustomText
