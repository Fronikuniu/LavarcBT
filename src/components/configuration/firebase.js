/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD-HLDxRfNYWCCU0QMNxX9SjUvNLvQXHCQ',
  authDomain: 'lavarcbt.firebaseapp.com',
  projectId: 'lavarcbt',
  storageBucket: 'lavarcbt.appspot.com',
  messagingSenderId: '489546894898',
  appId: '1:489546894898:web:76b72c3023f1ddf55fb62b',
  measurementId: 'G-3X5DVFCQ7F',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { auth, db, storage };
