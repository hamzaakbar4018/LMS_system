import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 
const firebaseConfig = {
  apiKey: "AIzaSyD7zSTtxe9-neGIAKJUIiTPZpGcog6vZvs",
  authDomain: "course-62517.firebaseapp.com",
  projectId: "course-62517",
  storageBucket: "course-62517.appspot.com",
  messagingSenderId: "419711688791",
  appId: "1:419711688791:web:23d3c0c64a363ab02f8312"
};

const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
export const auth = getAuth(app); 
export {db};