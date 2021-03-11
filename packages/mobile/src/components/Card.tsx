import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import theme from '../theme'

interface Props {
  style?: object
}

const Card: FC<Props> = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.white,
    padding: 25,
    borderRadius: 20,
    elevation: 9,
    shadowColor: theme.colors.black,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 15,
  },
})

export default Card
