import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import Signup from "./Components/Signup";
import { useAuth } from "./context/AuthContext";

export var firebaseApp = {
  apiKey: "AIzaSyDevjA-Q6D2_vqX08bGzSh8jjzWssZdMfg",
  authDomain: "instagram-clone-38c40.firebaseapp.com",
  projectId: "instagram-clone-38c40",
  databaseURL: "https://instagram-clone-38c40-default-rtdb.firebaseio.com/",

  storageBucket: "instagram-clone-38c40.appspot.com",
  messagingSenderId: "61359919512",
  appId: "1:61359919512:web:14dee53be5e61861d15bed",
  measurementId: "G-GRKVN6NFSL",
};

firebase.initializeApp(firebaseApp);

const db = firebase.firestore();

const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
