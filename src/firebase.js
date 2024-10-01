// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGKCQwXIho2UDOPL67jJdTOh57XA4DhC8",
  authDomain: "serii-ati.firebaseapp.com",
  projectId: "serii-ati",
  storageBucket: "serii-ati.appspot.com",
  messagingSenderId: "108016276636",
  appId: "1:108016276636:web:dde28f0e0bbf55d9fbc959",
  measurementId: "G-6R6EWPNPW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
export { db };