import React from 'react'
import { Text, View, Image } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../navigation'

import { travelsListStyles } from '../../styles'

const TravelDetailsScreen = () => {
  const route = useRoute()

  const { country, destination, image } = route.params

  return (
    <View style={travelsListStyles.container}>
      <View style={travelsListStyles.imageContainer}>
        {image && (
          <Image source={{ uri: image }} style={travelsListStyles.image} />
        )}
      </View>
      <View style={travelsListStyles.textContainer}>
        <Text style={travelsListStyles.country}>{country}</Text>
        <Text style={travelsListStyles.destination}>{destination}</Text>
      </View>
    </View>
  )
}

export default TravelDetailsScreen
