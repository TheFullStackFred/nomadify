import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Loginscreen from './screens/Loginscreen'
import Homescreen from './screens/Homescreen'

const Stack = createNativeStackNavigator()
SplashScreen.preventAutoHideAsync()

export const App = () => {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
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

  if (!appIsReady) {
    return null
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name='Login'
            component={Loginscreen}
          />
          <Stack.Screen name='Home' component={Homescreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
