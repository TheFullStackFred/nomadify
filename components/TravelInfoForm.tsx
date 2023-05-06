import { TextInput, View } from 'react-native'
import { styles } from '../styles'

type TravelInfoFormProps = {
  travel: {
    country: string
    destination: string
    description: string
  }
  setTravel: React.Dispatch<
    React.SetStateAction<{
      country: string
      destination: string
      description: string
    }>
  >
}

const TravelInfoForm = ({ travel, setTravel }: TravelInfoFormProps) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={travel.country}
        onChangeText={(text) => setTravel({ ...travel, country: text })}
        style={styles.input}
        placeholder='Country'
        autoCapitalize='none'
        placeholderTextColor='#888888'
      ></TextInput>
      <TextInput
        value={travel.destination}
        onChangeText={(text) => setTravel({ ...travel, destination: text })}
        style={styles.input}
        placeholder='Destination'
        autoCapitalize='none'
        placeholderTextColor='#888888'
      ></TextInput>
      <TextInput
        value={travel.description}
        onChangeText={(text) =>
          setTravel({
            ...travel,
            description: text,
          })
        }
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
