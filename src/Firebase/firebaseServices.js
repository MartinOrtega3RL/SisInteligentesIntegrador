import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCD692DMyK0CCwBAd_rBcecfcsKxVX-u-0",
  authDomain: "sisinteligentes-bf2a1.firebaseapp.com",
  projectId: "sisinteligentes-bf2a1",
  storageBucket: "sisinteligentes-bf2a1.firebasestorage.app",
  messagingSenderId: "506621048099",
  appId: "1:506621048099:web:82e79008bcfec255014896"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };