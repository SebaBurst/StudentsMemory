import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import {getStorage} from "firebase/storage"
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAXPX3ug8lXwrvxNrlSNAUXQ7_3-h7RWi4",
  authDomain: "tec-web-2022.firebaseapp.com",
  projectId: "tec-web-2022",
  storageBucket: "tec-web-2022.appspot.com",
  messagingSenderId: "386181128554",
  appId: "1:386181128554:web:0e7a42c59c3ae9af61c513"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const firestore = getFirestore(app);
export const auth = getAuth(app);
