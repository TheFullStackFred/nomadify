import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebase/firebase-config'
import { Credentials } from '../interfaces/interfaces'
import LoginRegisterForm from '../components/LoginRegisterForm'

const Loginscreen = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Home')
      }
    })
    return unsubscribe
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

export default Loginscreen
