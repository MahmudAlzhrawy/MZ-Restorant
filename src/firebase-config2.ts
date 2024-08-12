// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAQpxLlh3JNoOJfJbG83wkWupV-tGhVZ_U",
    authDomain: "cart-resto.firebaseapp.com",
    projectId: "cart-resto",
    storageBucket: "cart-resto.appspot.com",
    messagingSenderId: "256469025076",
    appId: "1:256469025076:web:d57da5ef0cb7b9e4faa561",
    measurementId: "G-Y8XEJSDW8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig,"[SECOND]");
export const cartdb = getFirestore(app);