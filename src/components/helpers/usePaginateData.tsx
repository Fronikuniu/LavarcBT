import { useEffect, useState } from 'react';
import useRouter from './useRouter';

function usePaginateData<T>(data: T[]) {
  const [dataToReturn, setDataToreturn] = useState<T[]>([]);
  const { query } = useRouter();
  const { page, itemsPerPage } = query as { page: string; itemsPerPage: string };
  const start = (Number(page) - 1) * Number(itemsPerPage);
  const end = Number(start) + Number(itemsPerPage);

  useEffect(() => {
    setDataToreturn(data.slice(start, end));
  }, [page, itemsPerPage, data, start, end]);

  return dataToReturn;
}

export default usePaginateData;
