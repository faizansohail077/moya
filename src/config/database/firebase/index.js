import fb from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCplyUQFxC14wir4ikDEUa6rt2-eOQdfm4",
  authDomain: "moya-9f28a.firebaseapp.com",
  projectId: "moya-9f28a",
  storageBucket: "moya-9f28a.appspot.com",
  messagingSenderId: "994848701360",
  appId: "1:994848701360:web:4ba0652496f25c3a5e3475",
  measurementId: "G-TM2SR1NND6",
};

const firebaseApp = fb.initializeApp(firebaseConfig);
export default firebaseApp;
