import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyC7M6I5LP-qGsDPxc8Y4vnUVRwRkmYf1XE",
    authDomain: "clone-rn.firebaseapp.com",
    projectId: "clone-rn",
    storageBucket: "clone-rn.appspot.com",
    messagingSenderId: "496870566048",
    appId: "1:496870566048:web:40c23ba132d31a699101c5"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage }