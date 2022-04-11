import { getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { manageQueryOpinions, OptionsProps } from './manageQueryOptions';

interface useDocsReturnProps<T> {
  data: T[] | [];
  hasError: boolean;
  isLoading: boolean;
}

export default function useDocs<T>(
  coll: string,
  queryArguments: OptionsProps
): useDocsReturnProps<T> {
  const [data, setData] = useState<T[] | []>([]);
  const [hasError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const q = manageQueryOpinions(coll, queryArguments);

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
