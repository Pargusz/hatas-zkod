
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNPqo3791L1FosEVYa4Wo4Qzn5nvx_1wo",
  authDomain: "adsrecord-154e1.firebaseapp.com",
  databaseURL: "https://adsrecord-154e1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "adsrecord-154e1",
  storageBucket: "adsrecord-154e1.firebasestorage.app",
  messagingSenderId: "409140824328",
  appId: "1:409140824328:web:c2acdcada0549b302104bd",
  measurementId: "G-6F82VF98F2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
