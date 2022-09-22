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
  apiKey: "AIzaSyAnNJs3MOcG71ydGNupUShrcEnz2GxYDlA",
  authDomain: "recordingapp-6dbb9.firebaseapp.com",
  projectId: "recordingapp-6dbb9",
  storageBucket: "recordingapp-6dbb9.appspot.com",
  messagingSenderId: "864704004849",
  appId: "1:864704004849:web:0e302137e886d2224adf50",
  measurementId: "G-XTYW6LRJ2M"
};

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
