import React, { FC } from 'react'
import { View, Text } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'

const Drawer: FC<{}> = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Text>Nice</Text>
      {/* <DrawerItemList {...props} /> */}
    </DrawerContentScrollView>
  )
}

export default Drawer
