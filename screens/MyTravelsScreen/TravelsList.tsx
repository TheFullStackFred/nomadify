import { Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { travelsListStyles } from '../../styles'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/index'
import { MaterialIcons } from '@expo/vector-icons'
interface TravelsListProps {
  id: string
  country: string
  destination: string
  description: string
  image: string
}

const TravelsList = ({
  id,
  country,
  destination,
  description,
  image,
}: TravelsListProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const navigateToTravelDetails = () => {
    navigation.navigate('TravelDetails', {
      country,
      destination,
      image,
      id,
      description,
    })
  }
  return (
    <TouchableOpacity onPress={navigateToTravelDetails}>
      <View style={travelsListStyles.container}>
        {image ? (
          <View style={travelsListStyles.imageContainer}>
            <Image source={{ uri: image }} style={travelsListStyles.image} />
          </View>
        ) : (
          <MaterialIcons name='image-not-supported' size={100} color='#fff' />
        )}
        <View style={travelsListStyles.textContainer}>
          <Text style={travelsListStyles.country}>{country}</Text>
          <Text style={travelsListStyles.destination}>{destination}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default TravelsList
