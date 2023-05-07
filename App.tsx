import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Loginscreen from './screens/LoginScreen/Loginscreen'
import AddTravelScreen from './screens/AddTravelScreen/AddTravelScreen'
import { StatusBar } from 'expo-status-bar'
import AuthContext from './context/AuthContext'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import MyTravelsScreen from './screens/MyTravelsScreen/MyTravelsScreen'

const BottomTab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

export const App = () => {
  const [appIsReady, setAppIsReady] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        SplashScreen.preventAutoHideAsync()
        await new Promise((resolve) => setTimeout(resolve, 3000))
      } catch (error) {
        console.warn(error)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  if (!appIsReady) {
    return null
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <StatusBar style='light' />

          {isLoggedIn ? (
            <NavigationContainer>
              <BottomTab.Navigator
                screenOptions={{
                  headerStyle: { backgroundColor: '#0a0619' },
                  headerTintColor: '#fff',
                  tabBarActiveTintColor: '#fc67fa',
                }}
              >
                <BottomTab.Screen
                  name='AddTravel'
                  component={AddTravelScreen}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name='person' color={color} size={size} />
                    ),
                  }}
                />
                <BottomTab.Screen
                  name='MyTravels'
                  component={MyTravelsScreen}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name='ios-home' color={color} size={size} />
                    ),
                  }}
                />
              </BottomTab.Navigator>
            </NavigationContainer>
          ) : (
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName='Login'
                screenOptions={{
                  headerStyle: { backgroundColor: '#0a0619' },
                  headerTintColor: '#fff',
                  contentStyle: { backgroundColor: '#0a0619' },
                }}
              >
                <Stack.Screen name='Login' component={Loginscreen} />
                <Stack.Screen name='AddTravel' component={AddTravelScreen} />
                <Stack.Screen name='MyTravels' component={MyTravelsScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          )}
        </View>
      </TouchableWithoutFeedback>
    </AuthContext.Provider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
