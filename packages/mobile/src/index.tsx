import React, { FC } from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo'
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
import MenuProvider from './context/MenuProvider'
import { RootStackParamList } from './types'
import Login from './screens/Login'
import Register from './screens/Register'
import Stories from './screens/Stories'
import Feedback from './screens/Feedback'
import Author from './screens/Author'
import theme from './theme'

const Stack = createStackNavigator<RootStackParamList>()

const App: FC<{}> = () => {
  const [fontsLoaded] = useFonts({
    Raleway_500Medium,
    Raleway_400Regular,
    Raleway_400Regular_Italic,
    Raleway_300Light,
  })

  if (!fontsLoaded) {
    return (
      <ActivityIndicator color={theme.colors.primary} size="large" />
    )
  }

  return (
    <ApolloProvider client={client}>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator
            headerMode="none"
            initialRouteName="Stories"
          >
            <Stack.Screen name="Stories" component={Stories} />
            <Stack.Screen name="Author" component={Author} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Feedback" component={Feedback} />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </ApolloProvider>
  )
}

export default App
