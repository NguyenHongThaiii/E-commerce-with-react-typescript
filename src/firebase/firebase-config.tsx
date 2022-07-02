import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: 'authentication-ecommerce-bec4b',
  storageBucket: 'authentication-ecommerce-bec4b.appshot.com',
  // ...
}
const app = firebase.initializeApp(config)
export const db = getFirestore(app)
