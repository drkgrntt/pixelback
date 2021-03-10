import React, { FC, useState, useRef, useEffect } from 'react'
import { Text, StyleSheet, Animated, Easing } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import theme from '../../theme'
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'

interface Props {}

const ANIMATION_DURATION = 300

const Nav: FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const menuOpacity = useRef(new Animated.Value(0)).current
  const menuHeight = useRef(new Animated.Value(0)).current
  const line1Rotation = useRef(new Animated.Value(0)).current
  const line1PositionX = useRef(new Animated.Value(0)).current
  const line1PositionY = useRef(new Animated.Value(0)).current
  const line2Opacity = useRef(new Animated.Value(0)).current
  const line3Rotation = useRef(new Animated.Value(0)).current
  const line3PositionX = useRef(new Animated.Value(0)).current
  const line3PositionY = useRef(new Animated.Value(0)).current

  const menuOpacityOpening = Animated.timing(menuOpacity, {
    toValue: 0.9,
    duration: ANIMATION_DURATION,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.quad),
  })
  const menuHeightOpening = Animated.timing(menuHeight, {
    toValue: 250,
    duration: ANIMATION_DURATION,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.quad),
  })
  const menuOpacityClosing = Animated.timing(menuOpacity, {
    toValue: 0,
    duration: ANIMATION_DURATION,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.quad),
  })
  const menuHeightClosing = Animated.timing(menuHeight, {
    toValue: 0,
    duration: ANIMATION_DURATION,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.quad),
  })
  const line1RotationOpening = Animated.timing(line1Rotation, {
    toValue: 135,
    duration: ANIMATION_DURATION,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.quad),
  })
  const line1RotationClosing = Animated.timing(line1Rotation, {
    toValue: 0,
    duration: ANIMATION_DURATION,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.quad),
  })
  const line1PositionXOpening = Animated.timing(line1PositionX, {
    toValue: 7.5,
    duration: ANIMATION_DURATION,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.quad),
  })
  const line1PositionXClosing = Animated.timing(line1PositionX, {
    toValue: 0,
    duration: ANIMATION_DURATION,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.quad),
  })
  const line1PositionYOpening = Animated.timing(line1PositionY, {
    toValue: -7.5,
    duration: ANIMATION_DURATION,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.quad),
  })
  const line1PositionYClosing = Animated.timing(line1PositionY, {
    toValue: 0,
    duration: ANIMATION_DURATION,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.quad),
  })
  const line2OpacityOpening = Animated.timing(line2Opacity, {
    toValue: 0,
    duration: ANIMATION_DURATION,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.quad),
  })
  const line2OpacityClosing = Animated.timing(line2Opacity, {
    toValue: 1,
    duration: ANIMATION_DURATION,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.quad),
  })
  const line3RotationOpening = Animated.timing(line3Rotation, {
    toValue: 135,
    duration: ANIMATION_DURATION,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.quad),
  })
  const line3RotationClosing = Animated.timing(line3Rotation, {
    toValue: 0,
    duration: ANIMATION_DURATION,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.quad),
  })
  const line3PositionXOpening = Animated.timing(line3PositionX, {
    toValue: 7.5,
    duration: ANIMATION_DURATION / 2,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.quad),
  })
  const line3PositionXClosing = Animated.timing(line3PositionX, {
    toValue: 0,
    duration: ANIMATION_DURATION / 2,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.quad),
  })
  const line3PositionYOpening = Animated.timing(line3PositionY, {
    toValue: 7.5,
    duration: ANIMATION_DURATION / 2,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.quad),
  })
  const line3PositionYClosing = Animated.timing(line3PositionY, {
    toValue: 0,
    duration: ANIMATION_DURATION / 2,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.quad),
  })
  useEffect(() => {
    if (open) {
      menuOpacityOpening.start()
      menuHeightOpening.start()
      line1RotationOpening.start()
      line1PositionXOpening.start()
      line1PositionYOpening.start()
      line2OpacityOpening.start()
      line3RotationOpening.start()
      line3PositionXOpening.start()
      line3PositionYOpening.start()
    } else {
      menuOpacityClosing.start()
      menuHeightClosing.start()
      line1RotationClosing.start()
      line1PositionXClosing.start()
      line1PositionYClosing.start()
      line2OpacityClosing.start()
      line3RotationClosing.start()
      line3PositionXClosing.start()
      line3PositionYClosing.start()
    }
  }, [
    open,
    menuOpacityOpening,
    menuHeightOpening,
    line1RotationOpening,
    line1PositionXOpening,
    line1PositionYOpening,
    line2OpacityOpening,
    line3RotationOpening,
    line3PositionYOpening,
    line3PositionXOpening,
    menuOpacityClosing,
    menuHeightClosing,
    line1RotationClosing,
    line1PositionXClosing,
    line1PositionYClosing,
    line2OpacityClosing,
    line3RotationClosing,
    line3PositionXClosing,
    line3PositionYClosing,
  ])

  const renderMenuItem = (title: string) => {
    return (
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => setOpen((current) => !current)}
      >
        <Text style={styles.menuItemText}>{title}</Text>
      </TouchableOpacity>
    )
  }

  const renderMenu = () => {
    return (
      <Animated.View
        style={{
          ...styles.menu,
          opacity: menuOpacity,
          height: menuHeight,
        }}
      >
        {renderMenuItem('Stories')}
        {renderMenuItem('Login')}
        {renderMenuItem('Register')}
        {renderMenuItem('Feedback')}
      </Animated.View>
    )
  }

  const line1RotationValue = line1Rotation.interpolate({
    inputRange: [0, 135],
    outputRange: ['0deg', '135deg'],
  })
  const line3RotationValue = line3Rotation.interpolate({
    inputRange: [0, 135],
    outputRange: ['0deg', '-135deg'],
  })

  const renderHamburger = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => setOpen((current) => !current)}
        style={styles.hamburger}
      >
        <Animated.View
          style={{
            ...styles.line,
            transform: [
              { rotate: line1RotationValue },
              { translateY: line1PositionY },
              { translateX: line1PositionX },
            ],
          }}
        />
        <Animated.View
          style={{ ...styles.line, opacity: line2Opacity }}
        />
        <Animated.View
          style={{
            ...styles.line,
            transform: [
              { rotate: line3RotationValue },
              { translateY: line3PositionY },
              { translateX: line3PositionX },
            ],
          }}
        />
      </TouchableWithoutFeedback>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderMenu()}
      {renderHamburger()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 100,
  },
  hamburger: {
    alignSelf: 'flex-end',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginRight: 16,
    marginTop: 9,
    height: 32,
  },
  line: {
    borderBottomColor: theme.colors.white,
    borderBottomWidth: 2,
    width: 32,
  },
  menu: {
    backgroundColor: theme.colors.black,
    opacity: 0.8,
    position: 'absolute',
    width: '100%',
    top: 0,
    paddingTop: 65,
  },
  menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
  menuItemText: {
    color: theme.colors.white,
    fontSize: 24,
  },
})

export default Nav
