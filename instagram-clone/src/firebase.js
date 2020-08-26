import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDoioY_j6Db66d6tsbCWuEWX3mm71_RdK8",
  authDomain: "insta-clone-6b7af.firebaseapp.com",
  databaseURL: "https://insta-clone-6b7af.firebaseio.com",
  projectId: "insta-clone-6b7af",
  storageBucket: "insta-clone-6b7af.appspot.com",
  messagingSenderId: "202215242144",
  appId: "1:202215242144:web:d8b0c17c8140c588db4cc5",
  measurementId: "G-PHFNZF9JD0"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();


export { db, auth, storage };
