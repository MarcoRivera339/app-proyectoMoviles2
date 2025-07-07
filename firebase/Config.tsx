// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMrbAyj9D0l5-D_NgliGZCIGFpEdRbPRU",
  authDomain: "miproyecto-189f0.firebaseapp.com",
  databaseURL: "https://miproyecto-189f0-default-rtdb.firebaseio.com",
  projectId: "miproyecto-189f0",
  storageBucket: "miproyecto-189f0.firebasestorage.app",
  messagingSenderId: "221115556886",
  appId: "1:221115556886:web:1ab0f0e24930b6c7f80137"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)