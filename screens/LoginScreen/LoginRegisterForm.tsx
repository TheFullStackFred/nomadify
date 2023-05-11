import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import DissmissKeyboard from '../../components/DissmissKeyboard'
import { LinearGradient } from 'expo-linear-gradient'
import { Credentials } from '../../interfaces/interfaces'
import { formStyles } from '../../styles'

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
    <DissmissKeyboard>
      <KeyboardAvoidingView style={formStyles.loginContainer} behavior='height'>
        <View style={formStyles.inputContainer}>
          <Image
            source={require('../../assets/splash.png')}
            style={formStyles.loginImage}
          />
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
    </DissmissKeyboard>
  )
}

export default LoginRegisterForm
