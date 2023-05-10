import { useLayoutEffect, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FlatList, View } from 'react-native'
import { DocumentData, collection, getDocs } from 'firebase/firestore/lite'
import { db } from '../../firebase/firebase-config'
import LogoutBtn from '../../components/LogoutBtn'
import { defaultStyles } from '../../styles'

const MyTravelsScreen = () => {
  const [travels, setTravels] = useState<Array<DocumentData>>([])
  const [travelID, setTravelID] = useState('')
  console.log(travels)

  useEffect(() => {
    const getTravels = async (): Promise<void> => {
      const travelsCol = collection(db, 'travels')
      const travelSnapshot = await getDocs(travelsCol)
      const travelList = travelSnapshot.docs.map((doc) => doc.data())
      const travelIDs = travelSnapshot.docs.map((doc) => doc.id)
      const travelsWithIDs = travelList.map((data, index) => ({
        id: travelIDs[index],
        data,
      }))
      setTravels(travelsWithIDs)
    }
    getTravels()
  }, [])
  const navigation = useNavigation()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutBtn />,
    })
  })
  return <View style={defaultStyles.container}></View>
}

export default MyTravelsScreen
