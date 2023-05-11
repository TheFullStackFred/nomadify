import React from 'react'
import { Text, View, Image } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import type { RootStackParamList } from '../../navigation'
import { travelDetailsStyles } from '../../styles'

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
    <View style={travelDetailsStyles.container}>
      <View style={travelDetailsStyles.imageContainer}>
        {image && (
          <Image source={{ uri: image }} style={travelDetailsStyles.image} />
        )}
      </View>
      <View>
        <Text style={travelDetailsStyles.country}>{country}</Text>
        <Text style={travelDetailsStyles.destination}>{destination}</Text>
        <Text style={travelDetailsStyles.description}>{description}</Text>
      </View>
    </View>
  )
}

export default TravelDetailsScreen
