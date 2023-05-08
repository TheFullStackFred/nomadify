import { Text, View } from 'react-native'
import { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import LogoutBtn from '../../components/LogoutBtn'
import { defaultStyles } from '../../styles'

const MyTravelsScreen = () => {
  const navigation = useNavigation()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutBtn />,
    })
  })
  return (
    <View style={defaultStyles.container}>
      <Text>MyTravelsScreen</Text>
    </View>
  )
}

export default MyTravelsScreen
