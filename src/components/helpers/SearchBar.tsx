import { useEffect, useState } from 'react';
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
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    setSearch(query.search ? query.search : '');
    setMinPrice(query.minMax ? query.minMax.split('-')[0] : '');
    setMaxPrice(query.minMax ? query.minMax.split('-')[1] : '');
  }, []);

  useEffect(() => {
    setSearchParams(
      price
        ? {
            ...searchParams,
            search,
            minMax: `${minPrice}-${maxPrice}`,
          }
        : {
            ...searchParams,
            search,
          }
    );
  }, [maxPrice, minPrice, search]);

  return (
    <form className="search">
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
              onChange={(e) => setMinPrice(e.target.value)}
              value={minPrice}
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
              onChange={(e) => setMaxPrice(e.target.value)}
              value={maxPrice}
              className="price-input"
            />
          </label>
        </div>
      )}
    </form>
  );
}

export default SearchBar;
