import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect, useState, useEffect } from 'react'
import { collection, getDocs, addDoc } from 'firebase/firestore/lite'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase/firebase-config'
import * as ImagePicker from 'expo-image-picker'
import { styles } from '../styles'
import LogoutBtn from '../components/LogoutBtn'

const Homescreen = () => {
  const [image, setImage] = useState(null)
  const [country, setCountry] = useState('')
  const [destination, setDestination] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    const uploadImage = async () => {
      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
          resolve(xhr.response)
        }
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'))
        }
        xhr.responseType = 'blob'
        xhr.open('GET', image, true)
        xhr.send(null)
      })

      /** @type {any} */
      const metadata = {
        contentType: 'image/jpeg',
      }

      const storageRef = ref(storage, 'images/' + Date.now())
      const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              break
            case 'storage/canceled':
              break

            case 'storage/unknown':
              break
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL)
          })
        }
      )
    }
    if (image !== null) {
      uploadImage()
      setImage(null)
    }
  }, [image])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutBtn />,
    })
  })

  const addTravel = async (): Promise<void> => {
    await addDoc(collection(db, 'travels'), {
      country: country,
      destination: destination,
      description: description,
    })

    setCountry('')
    setDestination('')
    setDescription('')
  }

  const getTravels = async (): Promise<void> => {
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
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <LinearGradient
            colors={['#f4c4f3', '#fc67fa']}
            style={styles.buttonGradient}
            start={[0, 0]}
            end={[1, 0]}
          >
            <Text style={styles.buttonText}>Pick an image</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={addTravel}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Add travel</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Homescreen
