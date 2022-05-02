import { useEffect, useState } from 'react';
import useRouter from './useRouter';

function usePaginateData<T>(data: T[]) {
  const [dataToReturn, setDataToReturn] = useState<T[]>([]);
  const { query } = useRouter();
  const { page = 1, itemsPerPage = 12 } = query;
  const start = (Number(page) - 1) * Number(itemsPerPage);
  const end = Number(start) + Number(itemsPerPage);

  useEffect(() => {
    setDataToReturn(data.slice(start, end));
  }, [page, itemsPerPage, data, start, end]);

  return dataToReturn;
}

export default usePaginateData;
