import {
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect, useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../firebase/firebase-config'
import * as ImagePicker from 'expo-image-picker'
import { Travel } from '../../interfaces/interfaces'
import LogoutBtn from '../../components/LogoutBtn'
import ImageUpload from './ImageUpload'
import TravelInfoForm from './TravelInfoForm'
import DissmissKeyboard from '../../components/DissmissKeyboard'
import Confetti from '../../components/Confetti'
import LoadingSpinner from '../../components/LoadingSpinner'
import { formStyles } from '../../styles'

const AddTravelScreen = () => {
  const [image, setImage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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

  const addTravel = async (): Promise<void> => {
    setIsLoading(true)
    try {
      let downloadURL = ''
      if (image) {
        const blobImage = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          xhr.onload = function () {
            resolve(xhr.response)
          }
          xhr.onerror = () => {
            reject(new TypeError('Network request failed'))
          }
          xhr.responseType = 'blob'
          xhr.open('GET', image, true)
          xhr.send(null)
        })

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
          async () => {
            downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            await addDoc(collection(db, 'travels'), {
              country: travel.country,
              destination: travel.destination,
              description: travel.description,
              image: downloadURL,
            })

            setImage('')
            setTravel({
              ...travel,
              country: '',
              destination: '',
              description: '',
            })

            setIsLoading(false)
            setSuccess(true)
            setTimeout(() => {
              setSuccess(false)
            }, 5000)
          }
        )
      } else {
        await addDoc(collection(db, 'travels'), {
          country: travel.country,
          destination: travel.destination,
          description: travel.description,
          image: '',
        })

        setImage('')
        setTravel({
          ...travel,
          country: '',
          destination: '',
          description: '',
        })

        setIsLoading(false)
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 5000)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }

  return (
    <DissmissKeyboard>
      <KeyboardAvoidingView
        style={formStyles.addTravelContainer}
        behavior='height'
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : success ? (
          <Confetti />
        ) : (
          <>
            <TravelInfoForm
              travel={travel}
              onTravelInfoChange={onTravelInfoChange}
            />
            <ImageUpload pickImage={pickImage} image={image} />
            <View style={formStyles.buttonContainer}>
              {travel.country && travel.destination && travel.description && (
                <TouchableOpacity
                  style={[formStyles.button, formStyles.buttonOutline]}
                  onPress={addTravel}
                >
                  <Text style={formStyles.buttonOutlineText}>Add travel</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </DissmissKeyboard>
  )
}

export default AddTravelScreen
