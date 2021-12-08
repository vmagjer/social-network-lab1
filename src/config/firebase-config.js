// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCxccb7BdYjg9hemZL-4iJPCoDChRRSoUs',
  authDomain: 'social-networks-lab-1-20f1c.firebaseapp.com',
  projectId: 'social-networks-lab-1-20f1c',
  storageBucket: 'social-networks-lab-1-20f1c.appspot.com',
  messagingSenderId: '140021892265',
  appId: '1:140021892265:web:74b6ce19b63ed7723395b8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore()

export default app
