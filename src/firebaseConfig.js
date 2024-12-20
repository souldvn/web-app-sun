import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database"; // Убедитесь, что ref импортирован

const firebaseConfig = {
  apiKey: "AIzaSyDiDo_BNbMyjhYVtmG7EqKAt7FNpyARRXM",
  authDomain: "sunvill-8fcf7.firebaseapp.com",
  projectId: "sunvill-8fcf7",
  storageBucket: "sunvill-8fcf7.appspot.com",
  messagingSenderId: "340641685680",
  appId: "1:340641685680:web:635d4005b9eeb762881b75",
  measurementId: "G-FFBNL9B6FR",
  databaseURL: "https://sunvill-8fcf7-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, get, child }; // Экспортируем функции, если они нужны в других файлах
