import firebase from 'firebase/app'
import 'firebase/firestore'
// import { initializeApp } from 'firebase/app';



const app = firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
})

export const db = app.firestore();
export const todosCollection = db.collection('todos');
