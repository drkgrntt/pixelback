import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import Nav from './Nav'
import Header from './Header'
import Footer from './Footer'

const Layout: FC<{}> = (props) => {
  return (
    <View>
      <Nav />
      <Header />
      {props.children}
      <Footer />
    </View>
  )
}

export default Layout
