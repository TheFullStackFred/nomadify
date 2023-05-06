import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect, useState } from 'react'
import { collection, getDocs, addDoc } from 'firebase/firestore/lite'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase/firebase-config'
import * as ImagePicker from 'expo-image-picker'
import { Entypo } from '@expo/vector-icons'
import { styles } from '../styles'
import LogoutBtn from '../components/LogoutBtn'

const Homescreen = () => {
  const [image, setImage] = useState('')
  const [travel, setTravel] = useState({
    country: '',
    destination: '',
    description: '',
  })

  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutBtn />,
    })
  })

  const pickImage = async (): Promise<void> => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const uploadImage = async (): Promise<void> => {
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
    const uploadTask = uploadBytesResumable(
      storageRef,
      blobImage as Blob,
      metadata
    )

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        console.log('File available at', downloadURL)
      }
    )

    setImage('')
  }

  const addTravel = async (): Promise<void> => {
    await addDoc(collection(db, 'travels'), {
      country: travel.country,
      destination: travel.destination,
      description: travel.description,
    })

    uploadImage()
    setTravel({
      ...travel,
      country: '',
      destination: '',
      description: '',
    })
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
          value={travel.country}
          onChangeText={(text) => setTravel({ ...travel, country: text })}
          style={styles.input}
          placeholder='Country'
          autoCapitalize='none'
          placeholderTextColor='#888888'
        ></TextInput>
        <TextInput
          value={travel.destination}
          onChangeText={(text) => setTravel({ ...travel, destination: text })}
          style={styles.input}
          placeholder='Destination'
          autoCapitalize='none'
          placeholderTextColor='#888888'
        ></TextInput>
        <TextInput
          value={travel.description}
          onChangeText={(text) =>
            setTravel({
              ...travel,
              description: text,
            })
          }
          style={styles.input}
          placeholder='Description'
          autoCapitalize='none'
          placeholderTextColor='#888888'
          multiline={true}
        ></TextInput>
        <View style={styles.imageContainer}>
          <Text style={styles.buttonOutlineText}>Pick an image</Text>
          <TouchableOpacity onPress={pickImage}>
            <Entypo name='upload' size={24} color='#fc67fa' />
          </TouchableOpacity>
          {image && (
            <Image source={{ uri: image }} style={styles.uploadImage} />
          )}
        </View>
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
