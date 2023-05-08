import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase/firebase-config'
import { Entypo } from '@expo/vector-icons'
import { logoutBtnStyles } from '../styles'

const LogoutBtn = () => {
  const navigation = useNavigation()

  const handleLogOut = (): void => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login')
      })
      .catch((error) => alert(error.message))
  }
  return (
    <TouchableOpacity style={logoutBtnStyles.logoutBtn} onPress={handleLogOut}>
      <Entypo name='log-out' size={24} color='#fc67fa' />
    </TouchableOpacity>
  )
}

export default LogoutBtn
