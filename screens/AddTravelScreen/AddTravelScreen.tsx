import {
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect, useState } from 'react'
import { collection, getDocs, addDoc } from 'firebase/firestore/lite'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../firebase/firebase-config'
import * as ImagePicker from 'expo-image-picker'
import ConfettiCannon from 'react-native-confetti-cannon'
import { Travel } from '../../interfaces/interfaces'
import LogoutBtn from '../../components/LogoutBtn'
import ImageUpload from './ImageUpload'
import TravelInfoForm from './TravelInfoForm'
import { formStyles } from '../../styles'

const AddTravelScreen = () => {
  const [image, setImage] = useState('')
  const [success, setSuccess] = useState(false)
  const [travel, setTravel] = useState<Travel>({
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

  const onTravelInfoChange = (field: keyof Travel, value: string) => {
    setTravel((prevTravel) => ({
      ...prevTravel,
      [field]: value,
    }))
  }

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
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, 5000)
  }

  const getTravels = async (): Promise<void> => {
    const travelsCol = collection(db, 'travels')
    const travelSnapshot = await getDocs(travelsCol)
    const travelList = travelSnapshot.docs.map((doc) => doc.data())
  }

  return (
    <KeyboardAvoidingView style={formStyles.container} behavior='height'>
      {success && (
        <ConfettiCannon count={300} origin={{ x: -10, y: 0 }} fadeOut />
      )}
      <TravelInfoForm travel={travel} onTravelInfoChange={onTravelInfoChange} />
      <ImageUpload pickImage={pickImage} image={image} />
      <View style={formStyles.buttonContainer}>
        <TouchableOpacity
          onPress={addTravel}
          style={[formStyles.button, formStyles.buttonOutline]}
        >
          <Text style={formStyles.buttonOutlineText}>Add travel</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default AddTravelScreen
