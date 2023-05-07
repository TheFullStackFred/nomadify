import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { formStyles } from '../../styles'
import { Credentials } from '../../interfaces/interfaces'

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
    <KeyboardAvoidingView style={formStyles.container} behavior='height'>
      <View style={formStyles.inputContainer}>
        <TextInput
          value={credentials.email}
          onChangeText={(text) => onUserInfoChange('email', text)}
          style={formStyles.input}
          placeholder='Email'
          autoCapitalize='none'
          placeholderTextColor='#888888'
        ></TextInput>
        <TextInput
          value={credentials.password}
          onChangeText={(text) => onUserInfoChange('password', text)}
          style={formStyles.input}
          placeholder='Password'
          autoCapitalize='none'
          placeholderTextColor='#888888'
          secureTextEntry
        ></TextInput>
      </View>
      <View style={formStyles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={formStyles.button}>
          <LinearGradient
            colors={['#f4c4f3', '#fc67fa']}
            style={formStyles.buttonGradient}
            start={[0, 0]}
            end={[1, 0]}
          >
            <Text style={formStyles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRegister}
          style={[formStyles.button, formStyles.buttonOutline]}
        >
          <Text style={formStyles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginRegisterForm
