import { TextInput, View } from 'react-native'
import { styles } from '../styles'
import { Travel } from '../interfaces/interfaces'

interface TravelInfoFormProps {
  travel: Travel
  onTravelInfoChange: (field: keyof Travel, value: string) => void
}

const TravelInfoForm = ({
  travel,
  onTravelInfoChange,
}: TravelInfoFormProps) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={travel.country}
        onChangeText={(text) => onTravelInfoChange('country', text)}
        style={styles.input}
        placeholder='Country'
        autoCapitalize='none'
        placeholderTextColor='#888888'
      ></TextInput>
      <TextInput
        value={travel.destination}
        onChangeText={(text) => onTravelInfoChange('destination', text)}
        style={styles.input}
        placeholder='Destination'
        autoCapitalize='none'
        placeholderTextColor='#888888'
      ></TextInput>
      <TextInput
        value={travel.description}
        onChangeText={(text) => onTravelInfoChange('description', text)}
        style={styles.input}
        placeholder='Description'
        autoCapitalize='none'
        placeholderTextColor='#888888'
        multiline={true}
      ></TextInput>
    </View>
  )
}

export default TravelInfoForm
