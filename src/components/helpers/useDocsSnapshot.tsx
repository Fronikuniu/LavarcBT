import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { manageQueryOpinions, OptionsProps } from './manageQueryOptions';

interface useManyDocsSnapshotReturnProps<T> {
  data: T[] | [];
  hasError: boolean;
  isLoading: boolean;
}

export default function useDocsSnapshot<T>(
  coll: string,
  collOptions: string[],
  queryOptions: OptionsProps
): useManyDocsSnapshotReturnProps<T> {
  const [data, setData] = useState<T[] | []>([]);
  const [hasError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const q = manageQueryOpinions(coll, queryOptions, collOptions);

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
