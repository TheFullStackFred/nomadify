import { TextInput, View } from 'react-native'
import { Travel } from '../../interfaces/interfaces'
import { formStyles } from '../../styles'

interface TravelInfoFormProps {
  travel: Travel
  onTravelInfoChange: (field: keyof Travel, value: string) => void
}

const TravelInfoForm = ({
  travel,
  onTravelInfoChange,
}: TravelInfoFormProps) => {
  return (
    <View style={formStyles.inputContainer}>
      <TextInput
        value={travel.country}
        onChangeText={(text) => onTravelInfoChange('country', text)}
        style={formStyles.input}
        placeholder='Country'
        autoCapitalize='none'
        placeholderTextColor='#888888'
      ></TextInput>
      <TextInput
        value={travel.destination}
        onChangeText={(text) => onTravelInfoChange('destination', text)}
        style={formStyles.input}
        placeholder='Destination'
        autoCapitalize='none'
        placeholderTextColor='#888888'
      ></TextInput>
      <TextInput
        value={travel.description}
        onChangeText={(text) => onTravelInfoChange('description', text)}
        style={formStyles.input}
        placeholder='Description'
        autoCapitalize='none'
        placeholderTextColor='#888888'
        multiline={true}
      ></TextInput>
    </View>
  )
}

export default TravelInfoForm
