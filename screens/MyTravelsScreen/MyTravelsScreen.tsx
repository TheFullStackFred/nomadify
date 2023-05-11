import { useLayoutEffect, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native'
import { DocumentData, collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'
import { defaultStyles } from '../../styles'
import LogoutBtn from '../../components/LogoutBtn'
import TravelsList from './TravelsList'

const MyTravelsScreen = () => {
  const [travels, setTravels] = useState<Array<DocumentData>>([])

  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutBtn />,
    })
  })

  useEffect(() => {
    const travelsCol = collection(db, 'travels')
    const unsubScribe = onSnapshot(travelsCol, (snapshot) => {
      const travelsWithIDs = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: {
          ...doc.data(),
          image: doc.data().image,
        },
      }))
      setTravels(travelsWithIDs)
    })

    return () => unsubScribe()
  }, [])

  const renderTravels = ({ item }: any) => {
    const { id, country, destination, image, description } = item.data
    return (
      <TravelsList
        id={id}
        country={country}
        destination={destination}
        description={description}
        image={image}
      />
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

export default MyTravelsScreen
