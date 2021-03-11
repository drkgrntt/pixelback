import React, { FC } from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  useFonts,
  Raleway_400Regular,
  Raleway_300Light,
} from '@expo-google-fonts/raleway'
import { Text } from 'react-native'
import { RootStackParamList } from './types'
import Login from './screens/Login'
import Register from './screens/Register'
import Stories from './screens/Stories'
import Feedback from './screens/Feedback'

const Stack = createStackNavigator<RootStackParamList>()

const App: FC<{}> = () => {
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_300Light,
  })

  if (!fontsLoaded) return <Text>Loading...</Text>

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName="Stories">
          <Stack.Screen name="Stories" component={Stories} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Feedback" component={Feedback} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  )
}

export default App
