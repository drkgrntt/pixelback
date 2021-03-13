import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from './Header'
import Footer from './Footer'

interface Props {
  style?: object
}

const Layout: FC<Props> = (props) => {
  return (
    <>
      <Header />
      <SafeAreaView style={{ ...styles.container, ...props.style }}>
        {props.children}
      </SafeAreaView>
      <Footer />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Layout
