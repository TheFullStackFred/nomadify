import React, { useEffect, useRef } from 'react'
import { Animated, Text } from 'react-native'
import { confettiStyles } from '../styles'
import ConfettiCannon from 'react-native-confetti-cannon'

const Confetti = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  return (
    <>
      <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fallSpeed={4000} />
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={confettiStyles.text}>Travel Added</Text>
      </Animated.View>
    </>
  )
}

export default Confetti
