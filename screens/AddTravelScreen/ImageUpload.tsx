import { View, TouchableOpacity, Text, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { formStyles } from '../../styles'

interface ImageUploadProps {
  image: string
  pickImage: () => void
}

const ImageUpload = ({ pickImage, image }: ImageUploadProps) => {
  return (
    <View style={formStyles.imageContainer}>
      <Text style={formStyles.buttonOutlineText}>Pick an image</Text>
      <TouchableOpacity onPress={pickImage}>
        <Entypo name='upload' size={24} color='#fc67fa' />
      </TouchableOpacity>
      {image && (
        <Image source={{ uri: image }} style={formStyles.uploadImage} />
      )}
    </View>
  )
}

export default ImageUpload
