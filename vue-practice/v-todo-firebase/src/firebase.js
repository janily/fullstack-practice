import * as firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth";
// import { initializeApp } from 'firebase/app';



const app = firebase.initializeApp({
  apiKey: "AIzaSyDLmiSxcIcCdLhkUkbAl5veSF0YYPcKzUs",
  authDomain: "vue-todo-firebase-96138.firebaseapp.com",
  databaseURL: "https://vue-todo-firebase-96138.firebaseio.com",
  projectId: "vue-todo-firebase-96138",
  storageBucket: "vue-todo-firebase-96138.appspot.com",
  messagingSenderId: "870016827825",
  appId: "1:870016827825:web:e8aef7deaa83f05349bd90"
})

export const db = app.firestore();
export const todosCollection = db.collection('todos');
