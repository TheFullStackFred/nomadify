import React from 'react'
import { Text, View, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
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
  const { country, destination, image, description } =
    route.params as TravelDetailsParams

  return (
    <View style={travelDetailsStyles.container}>
      {image ? (
        <View style={travelDetailsStyles.imageContainer}>
          <Image source={{ uri: image }} style={travelDetailsStyles.image} />
        </View>
      ) : (
        <MaterialIcons name='image-not-supported' color='#fff' size={350} />
      )}
      <View>
        <Text style={travelDetailsStyles.country}>{country}</Text>
        <Text style={travelDetailsStyles.destination}>{destination}</Text>
        <Text style={travelDetailsStyles.description}>{description}</Text>
      </View>
    </View>
  )
}

export default TravelDetailsScreen
