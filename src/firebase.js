// import firebase from "firebase/app"
// import "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDVdTraz4QB2kMaaliq2lhzuM1P8iL8PXQ",
    authDomain: "chat-application-23ceb.firebaseapp.com",
    projectId: "chat-application-23ceb",
    storageBucket: "chat-application-23ceb.appspot.com",
    messagingSenderId: "517304031770",
    appId: "1:517304031770:web:0c423cadecc7bf10080fa3"
  };

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);