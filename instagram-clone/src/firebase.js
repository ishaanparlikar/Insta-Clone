import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAplHk1nsWuVGSgup0WscO5O4JvKN-ZXsU",
  authDomain: "insta-clone-ac24c.firebaseapp.com",
  databaseURL: "https://insta-clone-ac24c.firebaseio.com",
  projectId: "insta-clone-ac24c",
  storageBucket: "insta-clone-ac24c.appspot.com",
  messagingSenderId: "477832964153",
  appId: "1:477832964153:web:1d54134d9b422c6dd785e8",
  measurementId: "G-CV1XERNND8",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
