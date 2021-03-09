import React, { FC } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Login from './screens/Login'
import Register from './screens/Register'
import { RootStackParamList } from './types'
import DrawerContent from './components/Drawer'

const Drawer = createDrawerNavigator<RootStackParamList>()

const App: FC<{}> = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {/* <Drawer.Navigator
          initialRouteName="Login"
          drawerPosition="right"
          drawerContent={(props) => {
            console.log(props)
            return <DrawerContent />
          }}
        >
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={Register} />
        </Drawer.Navigator> */}
        <Login />
      </NavigationContainer>
      <StatusBar style="auto" />
    </ApolloProvider>
  )
}

export default App
