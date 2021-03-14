import React, { FC } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../types'
import theme from '../theme'

interface Props {
  href: keyof RootStackParamList
  style?: object
}

const Link: FC<Props> = (props) => {
  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate(props.href)
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={{ ...props.style, ...styles.text }}>
        {props.children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.grey,
    fontFamily: 'Raleway_400Regular_Italic',
    textDecorationLine: 'underline',
  },
})

export default Link
