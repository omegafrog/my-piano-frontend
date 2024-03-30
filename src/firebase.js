import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mypiano-b2528.firebaseapp.com",
  projectId: "mypiano-b2528",
  storageBucket: "mypiano-b2528.appspot.com",
  messagingSenderId: "277345047709",
  appId: "1:277345047709:web:22db586da39dd0a9707074",
};

const app = initializeApp(firebaseConfig);

initializeApp(firebaseConfig);

export const messaging = getMessaging(app);
