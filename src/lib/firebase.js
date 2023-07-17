import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBPLDGLLSI455mCjgWwfM1orpGo2pu4frk",
  authDomain: "bluedit-bba62.firebaseapp.com",
  projectId: "bluedit-bba62",
  storageBucket: "bluedit-bba62.appspot.com",
  messagingSenderId: "21156107200",
  appId: "1:21156107200:web:16fce55912471d64152e25",
};

// Initialize Firebase SDK (Software Development Kit):
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Firebase Authentication:
const auth = getAuth(app)

// export default {db, auth};
export { db, auth };
