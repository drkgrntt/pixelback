import React, { FC } from 'react'
import Svg, {
  LinearGradient,
  Text,
  Defs,
  Stop,
  TSpan,
} from 'react-native-svg'
import theme from '../theme'

interface Props {
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
}

const Title: FC<Props> = (props) => {
  let fontSize: number
  switch (true) {
    case props.h4:
      fontSize = theme.sizes.h4
      break

    case props.h3:
      fontSize = theme.sizes.h3
      break

    case props.h2:
      fontSize = theme.sizes.h2
      break

    case props.h1:
    default:
      fontSize = theme.sizes.h1
      break
  }

  return (
    <Svg height={fontSize * 1.25} width="100%">
      <Defs>
        <LinearGradient
          id="title"
          x1="0"
          x2="0"
          y1="0"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={theme.colors.greyDark} offset="0%" />
          <Stop stopColor={theme.colors.primary} offset="100%" />
        </LinearGradient>
      </Defs>
      <Text fill="url(#title)">
        <TSpan
          fontWeight="600"
          fontSize={fontSize}
          fontFamily="Raleway_300Light"
          x="0"
          dy={fontSize}
        >
          {props.children}
        </TSpan>
      </Text>
    </Svg>
  )
}

export default Title
