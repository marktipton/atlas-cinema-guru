import React, { useState, useCallback } from 'react';
import { useTitles } from '@/contexts/TitlesProvider';
import Genres from './Genres';


const SearchBar = () => {
  const { setQuery, setMinYear, setMaxYear, setGenres } = useTitles();
  const [search, setSearch] = useState('');
  const [minYearInput, setMinYearInput] = useState('');
  const [maxYearInput, setMaxYearInput] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setQuery(e.target.value);
  };

  const handleMinYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = e.target.value;
    setMinYearInput(year);
    setMinYear(Number(year));
  };

  const handleMaxYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = e.target.value;
    setMaxYearInput(year);
    setMaxYear(Number(year));
  };

  const handleGenreChange = useCallback((selectedGenres: string[]) => {
    setGenres(selectedGenres);
  }, [setGenres]);

  return (
    <div className='flex justify-between items-start w-full pb-4'>
      <div className='flex flex-col items-start justify-between w-1/4'>
        <div className='w-full'>
          <div className='flex-grow'>
            Search
          </div>
          <input
            value={search}
            onChange={handleSearchChange}
            placeholder='Search Movies...'
            className='bg-searchBlue outline outline-2 p-2 outline-teal rounded-full w-full'
          />
        </div>
        <div className='flex gap-4 mt-2 w-full'>
          <div className='flex-grow'>
            <div>
              Min Year
            </div>
            <input
                type="number"
                value={minYearInput}
                onChange={handleMinYearChange}
                placeholder=''
                className='bg-searchBlue outline outline-2 p-2 outline-teal rounded-full w-full'
            />
          </div>
          <div className='flex-grow'>
            <div>
              Max Year
            </div>
            <input
              type="number"
              value={maxYearInput}
              onChange={handleMaxYearChange}
              placeholder=''
              className='bg-searchBlue outline outline-2 p-2 outline-teal rounded-full w-full'
            />
          </div>
        </div>
      </div>
      <div className='w-3/12'>
        <Genres onChange={handleGenreChange}/>
      </div>
    </div>
  )
}

export default SearchBar