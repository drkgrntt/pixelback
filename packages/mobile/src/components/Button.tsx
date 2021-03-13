import React, { FC } from 'react'
import {
  TouchableOpacity,
  View,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native'
import theme from '../theme'
import Text from './Text'

interface Props {
  onPress: (event: GestureResponderEvent) => void
  containerStyle?: object
  textStyle?: object
}

const Button: FC<Props> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.container, ...props.containerStyle }}>
        <Text style={{ ...styles.text, ...props.textStyle }}>
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.white,
    fontSize: 20,
  },
})

export default Button
