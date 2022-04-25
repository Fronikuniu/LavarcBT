import { ChangeEvent, useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import useRouter from '../hooks/useRouter';

interface SearchBarProps {
  searchParams: Record<string, string>;
  setSearchParams: (item: Record<string, string>) => void;
  params?: string[];
  price?: boolean;
}

function SearchBar({ searchParams, setSearchParams, params, price = false }: SearchBarProps) {
  const { query } = useRouter();
  const [search, setSearch] = useState(query.search ? query.search : '');
  const [min, setMin] = useState(query.minMax ? query.minMax.split('-')[0] : '');
  const [max, setMax] = useState(query.minMax ? query.minMax.split('-')[1] : '');

  useEffect(() => {
    setSearchParams(
      price
        ? {
            ...searchParams,
            search,
            minMax: `${min}-${max}`,
          }
        : {
            ...searchParams,
            search,
          }
    );
  }, [max, min, search]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="search">
      <div className="search-bar">
        <BiSearchAlt className="search-icon" />
        <label htmlFor="searchBar">
          <p className="label">Search data</p>
          <input
            type="text"
            name="searchBar"
            id="searchBar"
            placeholder={params ? `Search by ${params.join(', ')}...` : 'Search...'}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="search-input"
          />
        </label>
        <IoMdClose className="reset-icon" onClick={() => setSearch('')} />
      </div>

      {price && (
        <div className="price">
          <label htmlFor="searchPriceFrom">
            <p className="label">From</p>
            <input
              type="number"
              name="searchPriceFrom"
              id="searchPriceFrom"
              placeholder="From"
              onChange={(e) => {
                setMin(e.target.value);
              }}
              value={min}
              className="price-input"
            />
          </label>
          -
          <label htmlFor="searchPriceTo">
            <p className="label">To</p>
            <input
              type="number"
              name="searchPriceTo"
              id="searchPriceTo"
              placeholder="To"
              onChange={(e) => {
                setMax(e.target.value);
              }}
              value={max}
              className="price-input"
            />
          </label>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
