import React, { useEffect, useRef } from 'react'
import { Animated, Text } from 'react-native'
import { confettiStyles } from '../styles'
import ConfettiCannon from 'react-native-confetti-cannon'

const Confetti = () => {
  const slideAnim = useRef(new Animated.Value(-100)).current

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [slideAnim])

  return (
    <>
      <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fallSpeed={4000} />
      <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
        <Text style={confettiStyles.text}>Travel Added</Text>
      </Animated.View>
    </>
  )
}

export default Confetti
