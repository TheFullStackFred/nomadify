import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import Navigation from './navigation'

export const App = () => {
  const [appIsReady, setAppIsReady] = useState(false)

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
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar style='light' />
        <Navigation />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0619',
  },
})
