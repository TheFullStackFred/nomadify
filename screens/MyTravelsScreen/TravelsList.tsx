import { Text, View, Image } from 'react-native'
import { travelsListStyles } from '../../styles'

interface TravelsListProps {
  country: string
  destination: string
  image: string
}

const TravelsList = ({ country, destination, image }: TravelsListProps) => {
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

export default TravelsList
