import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import theme from '../../theme'
import Nav from './Nav'

const Header: FC<{}> = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.text}>Pixelback</Text>
      </SafeAreaView>
      <Nav />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  safeArea: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    justifyContent: 'center',
    alignSelf: 'stretch',
    height: 60,
    padding: 25,
    position: 'absolute',
    width: '100%',
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.sizes.h4,
  },
})

export default Header
