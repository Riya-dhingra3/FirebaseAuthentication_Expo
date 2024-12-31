// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkdQNiosHe3vSMYpQcUV1IGS0YLUcgOYY",
  authDomain: "practisee-e3d14.firebaseapp.com",
  projectId: "practisee-e3d14",
  storageBucket: "practisee-e3d14.appspot.com",
  messagingSenderId: "1069060703227",
  appId: "1:1069060703227:web:e09e5d244b7a3ce8bdc15e",
  measurementId: "G-R5YSCWPXVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app)


// 971580877402-8pt7hmdq00fffs302ptas2drth46qcco.apps.googleusercontent.com ios id

// 1069060703227-hhm4pbcfo3g5unaj7iq9g5bcqvt7es51.apps.googleusercontent.com web