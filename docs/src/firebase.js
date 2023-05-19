// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, updatePassword } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoIyXQkDT3_eJGdp3_1TM3tMy8_drjP8I",
  authDomain: "car-parking-auth.firebaseapp.com",
  databaseURL: "https://car-parking-auth-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "car-parking-auth",
  storageBucket: "car-parking-auth.appspot.com",
  messagingSenderId: "160221815148",
  appId: "1:160221815148:web:7579ef0f0395c2750a9349",
  measurementId: "G-KDC6B2NYPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()
createUserWithEmailAndPassword(auth).then(userCredential => {
  const user = userCredential.user
}).catch(error => {
  const code = error.code
  const message = error.message
})
updatePassword(auth.currentUser, '@@Abcd')
// export const database = getDatabase(app);
const database = getFirestore(app)
export default database

