import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import Nav from './Nav'
import Header from './Header'
import Footer from './Footer'

const Layout: FC<{}> = (props) => {
  return (
    <View style={styles.container}>
      <Nav />
      <Header />
      {props.children}
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Layout
