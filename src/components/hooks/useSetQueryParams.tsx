import { useEffect, useState } from 'react';
import useRouter from './useRouter';

export default function useSetQueryParams(
  object?: Record<string, string>
): [Record<string, string>, (item: Record<string, string>) => void] {
  const [searchParams, setSearchParams] = useState(object || {});
  const { push, pathname } = useRouter();

  useEffect(() => {
    if (searchParams && Object.keys(searchParams).length) {
      push({
        pathname,
        search: `?${new URLSearchParams(searchParams).toString()}`,
      });
    }
  }, [pathname, push, searchParams]);

  return [searchParams, setSearchParams];
}
