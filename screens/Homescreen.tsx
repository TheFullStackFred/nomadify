import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect, useState } from 'react'
import { collection, getDocs, addDoc } from 'firebase/firestore/lite'
import { db } from '../firebase/firebase-config'
import LogoutBtn from '../components/LogoutBtn'

const Homescreen = () => {
  const [country, setCountry] = useState('')
  const [destination, setDestination] = useState('')
  const [description, setDescription] = useState('')

  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutBtn />,
    })
  })

  const addTravel = async () => {
    await addDoc(collection(db, 'travels'), {
      country: country,
      destination: destination,
      description: description,
    })
  }

  const getTravels = async () => {
    const travelsCol = collection(db, 'travels')
    const travelSnapshot = await getDocs(travelsCol)
    const travelList = travelSnapshot.docs.map((doc) => doc.data())
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='height'>
      <View style={styles.inputContainer}>
        <TextInput
          value={country}
          onChangeText={(text) => setCountry(text)}
          style={styles.input}
          placeholder='Country'
          autoCapitalize='none'
          placeholderTextColor='#888888'
        ></TextInput>
        <TextInput
          value={destination}
          onChangeText={(text) => setDestination(text)}
          style={styles.input}
          placeholder='Destination'
          autoCapitalize='none'
          placeholderTextColor='#888888'
        ></TextInput>
        <TextInput
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={styles.input}
          placeholder='Description'
          autoCapitalize='none'
          placeholderTextColor='#888888'
        ></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={addTravel} style={styles.button}>
          <LinearGradient
            colors={['#f4c4f3', '#fc67fa']}
            style={styles.buttonGradient}
            start={[0, 0]}
            end={[1, 0]}
          >
            <Text style={styles.buttonText}>Add travel</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Homescreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
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
