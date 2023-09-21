import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8oUo0sfqF-4fzw5PGLUqDM2d9pVLuhlM",
  authDomain: "login-9a639.firebaseapp.com",
  projectId: "login-9a639",
  storageBucket: "login-9a639.appspot.com",
  messagingSenderId: "376840081713",
  appId: "1:376840081713:web:7d88e0dc95fdb11587e010"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }