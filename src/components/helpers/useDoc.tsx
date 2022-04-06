import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../configuration/firebase';

interface useDocReturnProps<T> {
  data: T | null;
  hasError: boolean;
  isLoading: boolean;
}

export default function useDoc<T>(coll: string, options: string[]): useDocReturnProps<T> {
  const [data, setData] = useState<T | null>(null);
  const [hasError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(doc(db, coll, ...options))
      .then((docSnap) => {
        if (docSnap.exists()) {
          setData(docSnap.data() as unknown as T);
          setLoading(false);
        }
      })
      .catch(() => setError(true));
  }, []);

  return { data, hasError, isLoading };
}
