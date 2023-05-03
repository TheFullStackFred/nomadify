import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyDU0iNXGtRx2xX_dkioUwmKeyTJ9qGlmOM',
  authDomain: 'nomadify-4a75e.firebaseapp.com',
  projectId: 'nomadify-4a75e',
  storageBucket: 'nomadify-4a75e.appspot.com',
  messagingSenderId: '478009987504',
  appId: '1:478009987504:web:73d56c49330218280b8675',
})

const auth = getAuth(firebaseApp)

export { auth }
