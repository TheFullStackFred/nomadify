import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from '../styles'
import { User } from '../interfaces/interfaces'

interface LoginFormProps {
  user: User
  setUser: React.Dispatch<
    React.SetStateAction<{
      email: string
      password: string
    }>
  >
  handleLogin: () => Promise<void>
  handleRegister: () => Promise<void>
}

const LoginForm = ({
  user,
  setUser,
  handleLogin,
  handleRegister,
}: LoginFormProps) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior='height'>
      <View style={styles.inputContainer}>
        <TextInput
          value={user.email}
          onChangeText={(text) => setUser({ ...user, email: text })}
          style={styles.input}
          placeholder='Email'
          autoCapitalize='none'
          placeholderTextColor='#888888'
        ></TextInput>
        <TextInput
          value={user.password}
          onChangeText={(text) => setUser({ ...user, password: text })}
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

export default LoginForm
