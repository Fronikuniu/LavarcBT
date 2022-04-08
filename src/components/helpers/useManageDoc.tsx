import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../configuration/firebase';

type DataTypes = {
  [key: string]: string | number | boolean | Timestamp | undefined | null;
};

export async function UseDoc(coll: string, options: string[]) {
  let error: boolean;
  const data = await getDoc(doc(db, coll, ...options));
  if (data.exists()) {
    error = false;
  } else {
    error = true;
  }
  return { data, error };
}

export async function UseAddDoc(coll: string, options: string[], data: DataTypes) {
  await addDoc(collection(db, coll, ...options), data);
}

export async function UseSetDoc(coll: string, options: string[], data: DataTypes) {
  await setDoc(doc(db, coll, ...options), data);
}

export async function UseUpdateDoc(coll: string, options: string[], data: DataTypes) {
  await updateDoc(doc(db, coll, ...options), data);
}

export async function UseDeleteDoc(coll: string, options: string[]) {
  await deleteDoc(doc(db, coll, ...options));
}
