// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAOfHMvH70J5GOtpuLGlPUUEEaVWCOgAc0",
    authDomain: "shop-orders-71dfd.firebaseapp.com",
    projectId: "shop-orders-71dfd",
    storageBucket: "shop-orders-71dfd.appspot.com",
    messagingSenderId: "572503833498",
    appId: "1:572503833498:web:b74fb1349fe6edaa541823",
    measurementId: "G-WRYBHRC71J"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig,"[Three]");
export const orderdb = getFirestore(app);
export const admauth=getAuth(app)
export const admprovider= new GoogleAuthProvider();