import React, { FC, useContext } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../types'
import theme from '../theme'
import menuContext from '../context/menuContext'

interface Props {
  href: keyof RootStackParamList
  params?: object
  style?: object
}

const Link: FC<Props> = (props) => {
  const navigation = useNavigation()
  const { isOpen } = useContext(menuContext)

  const handlePress = () => {
    if (isOpen) return
    navigation.navigate(props.href, props.params)
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
    fontSize: theme.sizes.text,
    color: theme.colors.grey,
    fontFamily: 'Raleway_400Regular_Italic',
    textDecorationLine: 'underline',
  },
})

export default Link
