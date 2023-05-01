import { initializeApp } from '@firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBW7HH2cPY5fyKMB3utiPEoAO34WHEjVRw',
  authDomain: 'post-eat-97df5.firebaseapp.com',
  projectId: 'post-eat-97df5',
  storageBucket: 'post-eat-97df5.appspot.com',
  messagingSenderId: '732994148442',
  appId: '1:732994148442:web:d17a230d7d44c24479a063',
  measurementId: 'G-J06EJLTJLY'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }
