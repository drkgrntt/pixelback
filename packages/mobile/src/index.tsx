import React, { FC } from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from './types'
import Login from './screens/Login'
import Register from './screens/Register'

const Stack = createStackNavigator<RootStackParamList>()

const App: FC<{}> = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  )
}

export default App
