import { StyleSheet } from 'react-native'

export const formStyles = StyleSheet.create({
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0619',
  },
  addTravelContainer: {
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
    borderRadius: 5,
  },
  loginImage: {
    height: 300,
    width: '100%',
  },
})

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0619',
  },
})

export const logoutBtnStyles = StyleSheet.create({
  logoutBtn: {
    paddingRight: 10,
  },
})

export const confettiStyles = StyleSheet.create({
  text: {
    color: '#fc67fa',
    fontSize: 40,
    fontWeight: 'bold',
  },
})

export const travelsListStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  textContainer: {
    marginLeft: 20,
    flex: 1,
  },
  country: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  destination: {
    fontSize: 16,
    color: '#fff',
  },
})

export const travelDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#0a0619',
  },
  imageContainer: {
    height: 300,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    borderRadius: 5,
  },
  country: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  destination: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  description: {
    fontSize: 18,
    color: '#fff',
  },
})
