import { useEffect, useState } from 'react';
import useRouter from './useRouter';

function useSearch<T>(arr: T[], searchFields: (keyof T)[]) {
  const [dataToReturn, setDataToReturn] = useState<T[]>([]);
  const { query } = useRouter();
  const { search = '' } = query as { search: string };

  useEffect(() => {
    setDataToReturn(arr);
  }, [arr]);

  useEffect(() => {
    const newData = arr.filter((item) => {
      const dataToSearch = searchFields
        .map((field) => item[field])
        .join(' ')
        .toLowerCase();

      const searchToString = search.toLowerCase();
      return dataToSearch.includes(searchToString);
    });
    setDataToReturn(newData);
  }, [arr, search]);

  return dataToReturn;
}

export default useSearch;
