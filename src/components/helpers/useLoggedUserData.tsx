import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../configuration/firebase';

interface useLoggedUserDataReturnProps<T> {
  data: T | null;
  hasError: boolean;
  isLoading: boolean;
}

export default function useLoggedUserData<T>(): useLoggedUserDataReturnProps<T> {
  const [data, setData] = useState<T[] | []>([]);
  const [hasError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'users'),
      where('uid', '==', auth.currentUser?.uid || localStorage.getItem('uid'))
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const docs: T[] = [];
        querySnapshot.forEach((doc) => {
          docs.push(doc.data() as unknown as T);
        });
        setData(docs);
        setLoading(false);
      },
      () => setError(true)
    );

    return () => unsubscribe();
  }, []);

  return { data: data[0], hasError, isLoading };
}
