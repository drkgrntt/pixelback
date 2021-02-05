import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import Header from './Header'
import Footer from './Footer'

const Layout: FC<{}> = (props) => {
  return (
    <>
      <Header />
      <View style={styles.container}>{props.children}</View>
      <Footer />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Layout
