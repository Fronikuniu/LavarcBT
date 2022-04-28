# About the project

Portfolio website for Minecraft Build Team - Lavarc. Uses firebase auth, storage. Have our own chat application, email contact form. You can see too Gallery, semi Shop.

## Demo: 

https://lavarc.netlify.app/

## Used technologies:

- react
- react-router
- custom hooks
- react-form-hook
- react-toastify
- react-moment
- react-icons
- firebase
- emailJs
- typescript
- SCSS
- eslint, prettier.

## How to run project:

- ```npm run start``` - Starts project
- ```npm run sass-watch``` - Listens for changes in sass files
- ```npm run lint``` - Checks to see if there are any errors with eslint
- ```npm run lint-fix``` - Checks to see if there are any errors and fix them if autofixable

#### To run project without errors You need to create ```configuration``` folder in ```components``` folder and create 2 files in it: ```emailjs.ts``` and ```firebase.ts```

#### Content of emailjs.ts file

You can easily create Your account on https://www.emailjs.com/ then create two email templates like ```contact template``` and ```order template``` then pass all necessary data into object.

```js
const EmailJsConf = {
  serviceId: '',
  userId: '',
  contactTemplate: '',
  orderTemplate: '',
};

export default EmailJsConf;
```

#### Content of firebase.ts file

You can easily create Your account on https://firebase.google.com/ then create your own project and pass all necessary data into object.

```js
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

```
