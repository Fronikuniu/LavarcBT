import {
  collection,
  FieldPath,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  where,
  WhereFilterOp,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../configuration/firebase';

export interface OptionsProps {
  whereArg?: [string, WhereFilterOp, string | number | boolean | string[]];
  orderByArg?: [string | FieldPath, 'asc' | 'desc'];
  limitArg?: number;
}

interface useDocsReturnProps<T> {
  data: T[] | [];
  hasError: boolean;
  isLoading: boolean;
}

export default function useDocs<T>(
  coll: string,
  { whereArg, orderByArg, limitArg }: OptionsProps
): useDocsReturnProps<T> {
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

    const q = query(collection(db, coll), ...queryArgs);

    getDocs(q)
      .then((querySnapshot) => {
        const docs: T[] = [];
        querySnapshot.forEach((doc) => {
          docs.push(doc.data() as unknown as T);
        });
        setData(docs);
        setLoading(false);
      })
      .catch(() => setError(true));
  }, []);

  return { data, hasError, isLoading };
}
