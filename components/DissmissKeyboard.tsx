import { TouchableWithoutFeedback, Keyboard } from 'react-native'

const DissmissKeyboard = ({ children }: any) => {
  const dissmissKeyboard = () => {
    Keyboard.dismiss()
  }
  return (
    <TouchableWithoutFeedback onPress={dissmissKeyboard}>
      {children}
    </TouchableWithoutFeedback>
  )
}

export default DissmissKeyboard
