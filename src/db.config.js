// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9U0Kf90n08fSr1_D3Pwx2e9nksrz_n3Y",
  authDomain: "thailangsampleoneid.firebaseapp.com",
  projectId: "thailangsampleoneid",
  storageBucket: "thailangsampleoneid.appspot.com",
  messagingSenderId: "546400488011",
  appId: "1:546400488011:web:450c2dfcf66cbd76be9bce",
  measurementId: "G-ETYCBM2VWW"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;