import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFFdpd2Xn7xduFCcMYsPXyLVekFKmmIIA",
  authDomain: "mumgency.firebaseapp.com",
  projectId: "mumgency",
  storageBucket: "mumgency.firebasestorage.app",
  messagingSenderId: "686675813300",
  appId: "1:686675813300:web:2fc8b2f00a62110b3348e1",
  measurementId: "G-F2ZVH0KVN9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
