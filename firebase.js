// Imports
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTzgeg_bl-or1dmGdmvYOHdtw66OSLbiU",
  authDomain: "timetable-application-e02f3.firebaseapp.com",
  databaseURL:
    "https://timetable-application-e02f3-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "timetable-application-e02f3",
  storageBucket: "timetable-application-e02f3.appspot.com",
  messagingSenderId: "711187696881",
  appId: "1:711187696881:web:fd7275c2855514481eed50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth();

// Database
const database = getDatabase(app);

// Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

export { auth, database, ref, set };
