import { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebase/firebase-config'
import { useNavigation } from '@react-navigation/native'
import { styles } from '../styles'

const Loginscreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Home')
      }
    })
    return unsubscribe
  }, [])

  const handleRegister = async (): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
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
        email,
        password
      )
      const user = userCredential.user
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='height'>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          placeholder='Email'
          autoCapitalize='none'
          placeholderTextColor='#888888'
        ></TextInput>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          placeholder='Password'
          autoCapitalize='none'
          placeholderTextColor='#888888'
          secureTextEntry
        ></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <LinearGradient
            colors={['#f4c4f3', '#fc67fa']}
            style={styles.buttonGradient}
            start={[0, 0]}
            end={[1, 0]}
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRegister}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Loginscreen
