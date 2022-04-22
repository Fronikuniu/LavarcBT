import { ChangeEvent, useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import useRouter from './useRouter';

function SearchBar({ params }: { params: string[] }) {
  const [search, setSearch] = useState('');
  const { push, location, pathname } = useRouter();

  useEffect(() => {
    const regex = /&search=.*/gm;
    const path = `${pathname}${location.search}`.replace(regex, '');
    const preparedSearch = search.trim().replace(/\s+/g, ' ');
    push(`${path}&search=${preparedSearch}`);
  }, [location.search, pathname, push, search]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <BiSearchAlt className="search" />
      <label htmlFor="searchBar">
        <p className="label">Search data</p>
        <input
          type="text"
          name="searchBar"
          id="searchBar"
          placeholder={`Search by ${params.join(', ')}...`}
          onChange={handleChange}
          value={search}
          className="search-input"
        />
      </label>
      <IoMdClose className="reset" onClick={() => setSearch('')} />
    </div>
  );
}

export default SearchBar;
