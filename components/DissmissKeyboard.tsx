import { TouchableWithoutFeedback, Keyboard } from 'react-native'

interface DissmissKeyboardProps {
  children: React.ReactNode
}

const DissmissKeyboard = ({ children }: DissmissKeyboardProps) => {
  const dissmissKeyboard = (): void => {
    Keyboard.dismiss()
  }
  return (
    <TouchableWithoutFeedback onPress={dissmissKeyboard}>
      {children}
    </TouchableWithoutFeedback>
  )
}

export default DissmissKeyboard
