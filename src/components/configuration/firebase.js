// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD-HLDxRfNYWCCU0QMNxX9SjUvNLvQXHCQ',
  authDomain: 'lavarcbt.firebaseapp.com',
  projectId: 'lavarcbt',
  storageBucket: 'lavarcbt.appspot.com',
  messagingSenderId: '489546894898',
  appId: '1:489546894898:web:76b72c3023f1ddf55fb62b',
  measurementId: 'G-3X5DVFCQ7F',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);
