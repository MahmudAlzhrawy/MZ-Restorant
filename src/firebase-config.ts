// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth,GoogleAuthProvider} from"firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAjbSG9vR-UVvjYBS0QCuTTcAbQ4yuFDds",
    authDomain: "restobase-3df53.firebaseapp.com",
    projectId: "restobase-3df53",
    storageBucket: "restobase-3df53.appspot.com",
    messagingSenderId: "227539210384",
    appId: "1:227539210384:web:565dddb7e163e9b5134815",
    measurementId: "G-P3N79NFE41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider= new GoogleAuthProvider();
export const db=getFirestore(app);
export const storage=getStorage(app);
