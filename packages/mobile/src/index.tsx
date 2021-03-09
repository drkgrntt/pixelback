import React, { FC } from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { RootStackParamList } from './types'
import Login from './screens/Login'
import Register from './screens/Register'
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
    </ApolloProvider>
  )
}

export default App
