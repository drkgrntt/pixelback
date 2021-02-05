import React, { FC } from 'react'
import { Header } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import theme from '../../theme'
import { RootStackParamList } from '../../types'

const Head: FC<{}> = () => {
  const navigation = useNavigation<
    DrawerNavigationProp<RootStackParamList, never>
  >()

  return (
    <Header
      backgroundColor={theme.colors.primary}
      // leftComponent={{ icon: 'home', color: theme.colors.white }}
      centerComponent={{
        text: 'Pixelback',
        style: {
          color: theme.colors.white,
          fontSize: 20,
        },
      }}
      rightComponent={{
        icon: 'menu',
        color: theme.colors.white,
        onPress: () => navigation.openDrawer(),
      }}
    />
  )
}

export default Head
