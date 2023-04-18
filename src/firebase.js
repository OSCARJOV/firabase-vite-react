import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnjFTst-USjw4lOYaKUEMV6P1uwiCUgIU",
  authDomain: "context-8ff8e.firebaseapp.com",
  projectId: "context-8ff8e",
  storageBucket: "context-8ff8e.appspot.com",
  messagingSenderId: "586965788575",
  appId: "1:586965788575:web:df536adb131a8957153faa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth };