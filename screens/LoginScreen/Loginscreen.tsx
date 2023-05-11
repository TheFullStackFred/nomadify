import { useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { Image, View, StyleSheet } from 'react-native'
import { auth } from '../../firebase/firebase-config'
import { Credentials } from '../../interfaces/interfaces'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/index'
import LoginRegisterForm from './LoginRegisterForm'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

const LoginScreen = ({ navigation }: Props) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Root')
      }
    })
    return () => unsubscribe()
  }, [])

  const onUserInfoChange = (field: keyof Credentials, value: string) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [field]: value,
    }))
  }

  const handleRegister = async (): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
      const user = userCredential.user
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }

  const handleLogin = async (): Promise<void> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
      const user = userCredential.user
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }

  return (
    <LoginRegisterForm
      credentials={credentials}
      onUserInfoChange={onUserInfoChange}
      handleLogin={handleLogin}
      handleRegister={handleRegister}
    />
  )
}

export default LoginScreen
