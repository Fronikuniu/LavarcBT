import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryConstraint,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { OptionsProps } from './useDocs';
import { db } from '../configuration/firebase';

interface useManyDocsSnapshotReturnProps<T> {
  data: T[] | [];
  hasError: boolean;
  isLoading: boolean;
}

export default function useDocsSnapshot<T>(
  coll: string,
  collOptions: string[],
  { whereArg, orderByArg, limitArg }: OptionsProps
): useManyDocsSnapshotReturnProps<T> {
  const [data, setData] = useState<T[] | []>([]);
  const [hasError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const queryArgs: QueryConstraint[] = [];

    if (whereArg) {
      const whereParams = where(whereArg[0], whereArg[1], whereArg[2]);
      queryArgs.push(whereParams);
    }
    if (orderByArg) {
      const orderByParams = orderBy(orderByArg[0], orderByArg[1]);
      queryArgs.push(orderByParams);
    }
    if (limitArg) {
      const limitParams = limit(limitArg);
      queryArgs.push(limitParams);
    }
    const q = query(collection(db, coll, ...collOptions), ...queryArgs);

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

  return { data, hasError, isLoading };
}
