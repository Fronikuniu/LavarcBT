import { useEffect, useState } from 'react';
import useRouter from './useRouter';

function useSearch<T>(arr: T[], textFields: (keyof T)[], priceFields: (keyof T)[]) {
  const [dataToReturn, setDataToReturn] = useState<T[]>([]);
  const { query } = useRouter();
  const { search = '', minMax = '' } = query;

  useEffect(() => {
    setDataToReturn(arr);
  }, []);

  useEffect(() => {
    const searchName = arr.filter((item) => {
      const dataToSearch = textFields
        .map((field) => item[field])
        .join(' ')
        .toLowerCase();

      const searchToString = search.toLowerCase();
      return dataToSearch.includes(searchToString);
    });

    const searchPrice = searchName.filter((item) => {
      const [min, max] = minMax.split('-');
      if (!min && !max) return item;
      const price = Number(item[priceFields[0]] ? item[priceFields[0]] : item[priceFields[1]]);

      if (min && !max) return price >= Number(min);
      if (!min && max) return price <= Number(max);
      return price >= Number(min) && price <= Number(max);
    });

    setDataToReturn(searchPrice);
  }, [arr, minMax, search]);

  return dataToReturn;
}

export default useSearch;
