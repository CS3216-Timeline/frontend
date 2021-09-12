import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { postMediaUrl } from "./media";

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

const ROOT = "user-media/"

const uploadFile = (file, fileName, memory_id, progressHandler, errorHandler, successHandler) => {
  const uploadTask = storage.ref(ROOT + memory_id + fileName).put(file)
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      )
      progressHandler(progress);
    }, 
    error => {
      errorHandler();
    },
    () => {
      storage
        .ref(ROOT)
        .child(memory_id + fileName)
        .getDownloadURL()
        .then(url => {
          postMediaUrl(url, memory_id); // send to backend
          successHandler(url); // send success url to component
        });
    }
  )
}

export { uploadFile, firebase as default }