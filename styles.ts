import { StyleSheet } from 'react-native'

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0619',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonGradient: {
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: '#fff',
    marginTop: 5,
    borderColor: '#fc67fa',
    borderWidth: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    padding: 15,
  },
  buttonOutlineText: {
    color: '#fc67fa',
    fontWeight: '700',
    fontSize: 16,
    padding: 15,
  },
  imageContainer: {
    alignItems: 'center',
  },
  uploadImage: {
    marginTop: 5,
    height: 200,
    width: 200,
  },
})

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0619',
  },
})
