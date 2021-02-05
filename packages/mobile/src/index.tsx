import React, { FC } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Login from './screens/Login'
import Register from './screens/Register'
import { RootStackParamList } from './types'

const Drawer = createDrawerNavigator<RootStackParamList>()

const App: FC<{}> = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Login"
          drawerPosition="right"
        >
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={Register} />
        </Drawer.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </ApolloProvider>
  )
}

export default App
