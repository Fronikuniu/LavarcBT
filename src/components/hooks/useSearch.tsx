import { useEffect, useState } from 'react';
import useRouter from './useRouter';

function useSearch<T>(arr: T[], searchFields: (keyof T)[]) {
  const [dataToReturn, setDataToReturn] = useState<T[]>([]);
  const { query } = useRouter();
  const { search = '', minMax = '' } = query as { search: string; minMax: string };

  useEffect(() => {
    setDataToReturn(arr);
  }, [arr]);

  useEffect(() => {
    const searchName = arr.filter((item) => {
      const dataToSearch = searchFields
        .map((field) => item[field])
        .join(' ')
        .toLowerCase();

      const searchToString = search.toLowerCase();
      return dataToSearch.includes(searchToString);
    });

    const searchPrice = searchName.filter((item) => {
      const [min, max] = minMax.split('-');
      if (!min && !max) return item;
      // @ts-ignore
      const price = Number(item.price ? item.sale : item.price);
      return price >= Number(min) && price <= Number(max);
    });

    setDataToReturn(searchPrice);
  }, [arr, minMax, search]);

  return dataToReturn;
}

export default useSearch;
