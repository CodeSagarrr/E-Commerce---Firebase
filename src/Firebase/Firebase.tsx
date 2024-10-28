import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyDPlEvmw-SoF8-0jHAa8Qt2ecIcMcgnavU",
    authDomain: "e-commerce-6dc7d.firebaseapp.com",
    projectId: "e-commerce-6dc7d",
    storageBucket: "e-commerce-6dc7d.appspot.com",
    messagingSenderId: "371963997798",
    appId: "1:371963997798:web:b25fb8cd4356a1c12cc7a7",
    measurementId: "G-5LB7L8VH10",
    database:'https://e-commerce-6dc7d/database/e-commerce-6dc7d-default-rtdb/data/~2F'
  };
  
export const app = initializeApp(firebaseConfig)