import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RootStackParamList } from '../../types'
import theme from '../../theme'

const Header: FC<{}> = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.text}>Pixelback</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
  },
  container: {
    alignSelf: 'stretch',
    backgroundColor: theme.colors.primary,
    height: 60,
    justifyContent: 'center',
    padding: 25,
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.sizes.h4,
  },
})

export default Header
