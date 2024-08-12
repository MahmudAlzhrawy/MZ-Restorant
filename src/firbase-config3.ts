// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCNFgqIaFUwe2i5NYdglRR-si9dSQQ2fMM",
    authDomain: "orders-resto.firebaseapp.com",
    projectId: "orders-resto",
    storageBucket: "orders-resto.appspot.com",
    messagingSenderId: "416542492556",
    appId: "1:416542492556:web:a4d23a2cc2bc3edbca78a9",
    measurementId: "G-RJ3WE1G8X0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig,"[Three]");
export const orderdb = getFirestore(app);
export const admauth=getAuth(app)
export const admprovider= new GoogleAuthProvider();