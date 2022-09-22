// Import the functions you need from the SDKs you need
//import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDocmSm_700Vj4dpJKTdyJiBptVvWva8xk",
  authDomain: "re-record.firebaseapp.com",
  projectId: "re-record",
  storageBucket: "re-record.appspot.com",
  messagingSenderId: "799974284909",
  appId: "1:799974284909:web:522938d7adb653e9d9e964",
  measurementId: "G-FCV3CDMJPV"
}

// Initialize Firebase
/*let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app=firebase.app()
}

const auth = firebase.auth();

export {auth};
*/
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {auth,db};
