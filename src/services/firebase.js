import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkwWQMS-vvk8rLj2mC9GU4DdCYnfnNedg",
  authDomain: "cs3216-timeline.firebaseapp.com",
  projectId: "cs3216-timeline",
  storageBucket: "cs3216-timeline.appspot.com",
  messagingSenderId: "560364790834",
  appId: "1:560364790834:web:7c51808725abef6283c82b",
  measurementId: "G-588D4MF4MR"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default }