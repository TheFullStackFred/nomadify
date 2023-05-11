import React from 'react'
import { Text, View, Image } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import type { RootStackParamList } from '../../navigation'
import { travelsListStyles } from '../../styles'

interface TravelDetailsParams {
  id: string
  country: string
  destination: string
  description: string
  image: string
}

interface TravelDetailsProps {
  route: RouteProp<RootStackParamList, 'TravelDetails'>
}

const TravelDetailsScreen = ({ route }: TravelDetailsProps) => {
  const { country, destination, image, id, description } =
    route.params as TravelDetailsParams

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
