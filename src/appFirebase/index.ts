// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyBdoOvfVLA35pioZkaLRCqP-xqX93OKm4I',
  authDomain: 'fb-clone-1a8c4.firebaseapp.com',
  projectId: 'fb-clone-1a8c4',
  storageBucket: 'fb-clone-1a8c4.appspot.com',
  messagingSenderId: '776239762534',
  appId: '1:776239762534:web:ea4dd462649928550171a7',
  measurementId: 'G-2TVSTPBNEH',
  databaseURL: 'https://fb-clone-1a8c4-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);
const database = getDatabase(app);
const firestore = getFirestore(app);

export { storage, database, firestore };
