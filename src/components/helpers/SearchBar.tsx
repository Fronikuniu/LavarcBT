import { ChangeEvent, useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import useRouter from './useRouter';

interface SearchBarProps {
  params?: string[];
  price?: boolean;
}

function SearchBar({ params, price = false }: SearchBarProps) {
  const [search, setSearch] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const { push, location, pathname } = useRouter();

  useEffect(() => {
    const regex = /&minMax=.*/gm;
    const path = `${pathname}${location.search}`.replace(regex, '');
    const preparedSearch = search.trim().replace(/\s+/g, ' ');
    push(`${path}&minMax=${min}-${max}&search=${preparedSearch}`);
  }, [max, min, pathname, push, search]);

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
            onChange={handleChange}
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
