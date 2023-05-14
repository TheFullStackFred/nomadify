import React from 'react'
import { View, Image, Text } from 'react-native'
import { gifStyles } from '../styles'

const GifScreen = () => {
  return (
    <View style={gifStyles.container}>
      <Image
        style={gifStyles.gif}
        source={{
          uri: 'https://media.giphy.com/media/zV3BR9exoyuHrB40ZC/giphy.gif',
        }}
      />
      <Text style={gifStyles.text}>Go travel now😎🏝️</Text>
    </View>
  )
}

export default GifScreen
