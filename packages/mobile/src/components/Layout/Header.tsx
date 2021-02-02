import React, { FC } from 'react'
import { Header } from 'react-native-elements'
import theme from '../../theme'

const Head: FC<{}> = () => {
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
      rightComponent={{ icon: 'menu', color: theme.colors.white }}
    />
  )
}

export default Head
