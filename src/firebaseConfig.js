import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database"; // Убедитесь, что ref импортирован

const firebaseConfig = {
  apiKey: "AIzaSyDZfj3T2vSej8mV8Y-xdG21pAAg24DDVe4",
  authDomain: "sunvillage-6aec8.firebaseapp.com",
  projectId: "sunvillage-6aec8",
  storageBucket: "sunvillage-6aec8.firebasestorage.app",
  messagingSenderId: "117813033135",
  appId: "1:117813033135:web:5a84e59d4d73fdae037c5a",
  measurementId: "G-9D6CD5C887",
  databaseURL: "https://sunvillage-6aec8-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, get, child }; // Экспортируем функции, если они нужны в других файлах
