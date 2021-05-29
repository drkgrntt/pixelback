import React, { FC, useEffect, useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import { getClient } from './apollo'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  useFonts,
  Raleway_500Medium,
  Raleway_400Regular,
  Raleway_400Regular_Italic,
  Raleway_300Light,
} from '@expo-google-fonts/raleway'
import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { API_URL, STAGE_API_URL } from './env'
import MenuProvider from './context/MenuProvider'
import { RootStackParamList } from './types'
import Login from './screens/Login'
import Register from './screens/Register'
import Stories from './screens/Stories'
import Feedback from './screens/Feedback'
import Author from './screens/Author'
import Story from './screens/Story'
import Profile from './screens/Profile'
import theme from './theme'

const Stack = createStackNavigator<RootStackParamList>()

const App: FC<{}> = () => {
  const [fontsLoaded] = useFonts({
    Raleway_500Medium,
    Raleway_400Regular,
    Raleway_400Regular_Italic,
    Raleway_300Light,
  })
  const [apiUrl, setApiUrl] = useState('')
  const getApiUrl = async () => {
    const env = await AsyncStorage.getItem('@pixelback.environment')
    switch (env) {
      case 'prod':
        setApiUrl(API_URL)
        break
      case 'stage':
        setApiUrl(STAGE_API_URL)
        break
      default:
        await AsyncStorage.setItem('@pixelback.environment', 'prod')
        setApiUrl(API_URL)
        break
    }
  }
  useEffect(() => {
    getApiUrl()
  }, [])

  if (!fontsLoaded || !apiUrl) {
    return (
      <ActivityIndicator color={theme.colors.primary} size="large" />
    )
  }

  return (
    <ApolloProvider client={getClient(apiUrl)}>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator
            headerMode="none"
            initialRouteName="Stories"
          >
            <Stack.Screen name="Stories" component={Stories} />
            <Stack.Screen name="Story" component={Story} />
            <Stack.Screen name="Author" component={Author} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Feedback" component={Feedback} />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </ApolloProvider>
  )
}

export default App
