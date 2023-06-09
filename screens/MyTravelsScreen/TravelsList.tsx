import { Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { travelsListStyles } from '../../styles'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/index'
import { db, storage } from '../../firebase/firebase-config'
import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { deleteDoc, doc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'

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

  const deleteTravel = async (id: string, imageUrl: string): Promise<void> => {
    try {
      const travelRef = doc(db, 'travels', id)
      await deleteDoc(travelRef)

      if (imageUrl) {
        const imageRef = ref(storage, imageUrl)
        await deleteObject(imageRef)
        console.log(`Travel document with ID ${id} deleted`)
        console.log(`Image at URL ${imageUrl} deleted`)
      } else {
        console.log(`Travel document with ID ${id} deleted`)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
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
        <View>
          <TouchableOpacity onPress={() => deleteTravel(id, image)}>
            <FontAwesome name='trash-o' size={24} color='#fff' />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default TravelsList
