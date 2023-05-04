import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase/firebase-config'
import { useNavigation } from '@react-navigation/native'

const Homescreen = () => {
  const navigation = useNavigation()

  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login')
      })
      .catch((error) => alert(error.message))
  }
  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleLogOut} style={styles.button}>
        <LinearGradient
          colors={['#f4c4f3', '#fc67fa']}
          style={styles.buttonGradient}
          start={[0, 0]}
          end={[1, 0]}
        >
          <Text style={styles.buttonText}>Log out</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

export default Homescreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '60%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonGradient: {
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    padding: 15,
  },
})
