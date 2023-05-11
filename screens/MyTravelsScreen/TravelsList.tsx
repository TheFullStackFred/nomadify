import { Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { travelsListStyles } from '../../styles'

interface TravelsListProps {
  country: string
  destination: string
  image: string
  id: string
}

const TravelsList = ({ country, destination, image, id }: TravelsListProps) => {
  const navigation = useNavigation()

  const navigateToTravelDetails = () => {
    navigation.navigate('TravelDetails', { id })
  }
  return (
    <TouchableOpacity onPress={navigateToTravelDetails}>
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
    </TouchableOpacity>
  )
}

export default TravelsList
