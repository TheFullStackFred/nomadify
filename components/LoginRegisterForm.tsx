import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from '../styles'
import { Credentials } from '../interfaces/interfaces'

interface LoginRegisterFormProps {
  credentials: Credentials
  onUserInfoChange: (field: keyof Credentials, value: string) => void
  handleLogin: () => Promise<void>
  handleRegister: () => Promise<void>
}

const LoginRegisterForm = ({
  credentials,
  onUserInfoChange,
  handleLogin,
  handleRegister,
}: LoginRegisterFormProps) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior='height'>
      <View style={styles.inputContainer}>
        <TextInput
          value={credentials.email}
          onChangeText={(text) => onUserInfoChange('email', text)}
          style={styles.input}
          placeholder='Email'
          autoCapitalize='none'
          placeholderTextColor='#888888'
        ></TextInput>
        <TextInput
          value={credentials.password}
          onChangeText={(text) => onUserInfoChange('password', text)}
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

export default LoginRegisterForm
