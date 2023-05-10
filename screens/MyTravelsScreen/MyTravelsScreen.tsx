import { useLayoutEffect, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FlatList, View, Text, Image, StyleSheet } from 'react-native'
import {
  DocumentData,
  collection,
  getDocs,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'
import { defaultStyles } from '../../styles'
import LogoutBtn from '../../components/LogoutBtn'

const MyTravelsScreen = () => {
  const [travels, setTravels] = useState<Array<DocumentData>>([])

  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutBtn />,
    })
  })

  useEffect(() => {
    const getTravels = async (): Promise<void> => {
      const travelsCol = collection(db, 'travels')
      const travelSnapshot = await getDocs(travelsCol)
      const travelsWithIDs = travelSnapshot.docs.map((doc) => ({
        id: doc.id,
        data: {
          ...doc.data(),
          image: doc.data().image,
        },
      }))
      setTravels(travelsWithIDs)
    }

    getTravels()
  }, [travels])

  const renderTravels = ({ item }: any) => {
    const { country, image } = item.data
    return (
      <View style={styles.container}>
        <Text>{country}</Text>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    )
  }

  return (
    <FlatList
      style={defaultStyles.container}
      data={travels}
      renderItem={renderTravels}
      keyExtractor={(item) => item.id}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default MyTravelsScreen
