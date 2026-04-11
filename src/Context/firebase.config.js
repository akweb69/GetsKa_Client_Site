// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA4ZVtYlgYaJe-QZSYVOwWIlKg5FJqtpM",
  authDomain: "my-meal-ca4d9.firebaseapp.com",
  projectId: "my-meal-ca4d9",
  storageBucket: "my-meal-ca4d9.appspot.com",
  messagingSenderId: "1080440226094",
  appId: "1:1080440226094:web:f791ed9fe545139b58fabf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
