import { View, TouchableOpacity, Text, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { styles } from '../styles'

interface ImageUploadProps {
  image: string
  pickImage: () => void
}

const ImageUpload = ({ pickImage, image }: ImageUploadProps) => {
  return (
    <View style={styles.imageContainer}>
      <Text style={styles.buttonOutlineText}>Pick an image</Text>
      <TouchableOpacity onPress={pickImage}>
        <Entypo name='upload' size={24} color='#fc67fa' />
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.uploadImage} />}
    </View>
  )
}

export default ImageUpload
