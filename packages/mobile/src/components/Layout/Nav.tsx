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
  const animation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (open) {
      Animated.timing(animation, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.quad),
      }).start()
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.quad),
      }).start()
    }
  }, [open, animation])

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

  const menuOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.9],
  })
  const menuHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250],
  })

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

  const line1Rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '135deg'],
  })
  const line1PositionX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 7.5],
  })
  const line1PositionY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -7.5],
  })
  const line2Opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  })
  const line3Rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-135deg'],
  })
  const line3PositionX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 7.5],
  })
  const line3PositionY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 7.5],
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
              { rotate: line1Rotation },
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
              { rotate: line3Rotation },
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
