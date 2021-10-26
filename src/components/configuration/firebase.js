import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics';

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
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
