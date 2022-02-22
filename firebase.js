// Imports
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTzgeg_bl-or1dmGdmvYOHdtw66OSLbiU",
  authDomain: "timetable-application-e02f3.firebaseapp.com",
  projectId: "timetable-application-e02f3",
  storageBucket: "timetable-application-e02f3.appspot.com",
  messagingSenderId: "711187696881",
  appId: "1:711187696881:web:fd7275c2855514481eed50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Database
const db = getFirestore(app);
// Authentication
const auth = getAuth();

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

// const auth = getAuth();

// // Listen for authentication state to change.
// onAuthStateChanged(auth, (user) => {
//   if (user != null) {
//     console.log("We are authenticated now!");
//   }

//   // Do other things
// });
